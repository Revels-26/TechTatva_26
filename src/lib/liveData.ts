import { useEffect, useMemo, useState } from "react";
import { SITE } from "../config/site";
import type { UniverseKey } from "../data/events";
import {
  CATEGORY_REALITY,
  normalizeTimetableRow,
  type EventSummary,
  type SheetRow,
  type TimetableRow,
} from "../data/timetable";

const REALITY_KEYS: UniverseKey[] = ["aether", "ember", "obsidian", "zenith"];

// data is null while loading (or if loading failed). error is true only when the request failed.
export type LiveResult<T> = { data: T | null; error: boolean };

const CACHE_PREFIX = "sheet-cache:";

// Last loaded rows for a sheet, kept in the browser. Storage can be blocked, so every access is guarded.
const readCache = (url: string): SheetRow[] | null => {
  try {
    const raw = window.localStorage.getItem(CACHE_PREFIX + url);
    return raw ? (JSON.parse(raw) as SheetRow[]) : null;
  } catch {
    return null;
  }
};

const writeCache = (url: string, rows: SheetRow[]) => {
  try {
    window.localStorage.setItem(CACHE_PREFIX + url, JSON.stringify(rows));
  } catch {
    // Ignore: the page still works without the cache.
  }
};

// Shows cached rows at once, then replaces them with the live sheet. error is only set when there is
// nothing cached to show and the request failed.
const useSheetRows = (url: string): { rows: SheetRow[] | null; error: boolean } => {
  const [state, setState] = useState(() => ({ rows: readCache(url), error: false }));
  useEffect(() => {
    let cancelled = false;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        if (Array.isArray(data.rows)) {
          writeCache(url, data.rows);
          setState({ rows: data.rows, error: false });
        } else {
          setState((prev) => ({ rows: prev.rows, error: prev.rows === null }));
        }
      })
      .catch(() => {
        if (!cancelled) setState((prev) => ({ rows: prev.rows, error: prev.rows === null }));
      });
    return () => {
      cancelled = true;
    };
  }, [url]);
  return state;
};

export const useTimetableRows = (): LiveResult<TimetableRow[]> => {
  const { rows, error } = useSheetRows(SITE.dataApi.timetable);
  const data = useMemo(
    () => (rows ? rows.map(normalizeTimetableRow).filter((row): row is TimetableRow => row !== null) : null),
    [rows],
  );
  return { data, error };
};

// Events come from the events sheet. Venues, dates and start time come from the matching timetable rows,
// so this waits for the timetable before building the cards.
export const useEventSummaries = (timetable: TimetableRow[] | null): LiveResult<EventSummary[]> => {
  const { rows, error } = useSheetRows(SITE.dataApi.events);
  const data = useMemo(() => {
    if (!rows || !timetable) return null;
    return rows
      .filter((row) => row.event?.trim())
      .map((row) => {
        const title = row.event.trim();
        const rounds = timetable.filter((t) => t.event.toLowerCase() === title.toLowerCase());
        const category = (row.category?.trim() || rounds[0]?.category || "").trim();
        const reality = row.reality?.trim().toLowerCase() as UniverseKey;
        return {
          title,
          category,
          reality: REALITY_KEYS.includes(reality) ? reality : (CATEGORY_REALITY[category] ?? "aether"),
          // The events sheet's Location wins when it is filled in. Otherwise use the venues of the timetable rounds.
          venues: row.location?.trim() ? [row.location.trim()] : [...new Set(rounds.map((t) => t.venue))],
          dates: [...new Set(rounds.map((t) => t.date))],
          start: rounds.find((t) => t.start)?.start ?? null,
          people: row.people?.trim() || null,
        };
      });
  }, [rows, timetable]);
  return { data, error };
};
