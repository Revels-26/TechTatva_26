import { useEffect, useMemo, useState } from "react";
import type { UniverseKey } from "../data/events";
import {
  CATEGORY_LOGOS,
  CATEGORY_REALITY,
  normalizeTimetableRow,
  type EventSummary,
  type SheetRow,
  type TimetableRow,
} from "../data/timetable";
import { EVENTS_SHEET, TIMETABLE_SHEET } from "../config/sheets";
import { fetchSheetRows, to12Hour } from "./sheetCsv";

const REALITY_KEYS: UniverseKey[] = ["aether", "ember", "obsidian", "zenith"];
const CACHE_PREFIX = "sheet-cache:";

// Reads the last loaded rows from the browser, so a repeat visit shows the schedule straight away.
const readCache = (key: string): SheetRow[] | null => {
  try {
    const raw = window.localStorage.getItem(CACHE_PREFIX + key);
    return raw ? (JSON.parse(raw) as SheetRow[]) : null;
  } catch {
    return null;
  }
};

const writeCache = (key: string, rows: SheetRow[]) => {
  try {
    window.localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(rows));
  } catch {
    // Storage can be blocked. The page still works without the cache.
  }
};

// Shows cached rows at once, then replaces them with the live sheet. error is only set when there is nothing
// cached to show and the sheet could not be read.
const useSheetRows = (key: string, loader: () => Promise<SheetRow[]>) => {
  const [state, setState] = useState<{ rows: SheetRow[] | null; error: boolean }>(() => ({
    rows: readCache(key),
    error: false,
  }));

  useEffect(() => {
    let cancelled = false;
    loader()
      .then((rows) => {
        if (cancelled) return;
        writeCache(key, rows);
        setState({ rows, error: false });
      })
      .catch(() => {
        if (!cancelled) setState((prev) => ({ rows: prev.rows, error: prev.rows === null }));
      });
    return () => {
      cancelled = true;
    };
  }, [key, loader]);

  return state;
};

// Timetable: every day tab, fetched in parallel. Times are converted to 12-hour text and the date comes from the tab.
// Category names are matched to the logo list regardless of case ("Cosmic con" is "Cosmic Con").
const canonicalCategory = (name: string) =>
  Object.keys(CATEGORY_LOGOS).find((key) => key.toLowerCase() === name.trim().toLowerCase()) ?? name.trim();

const loadTimetable = async (): Promise<SheetRow[]> => {
  const days = await Promise.all(
    TIMETABLE_SHEET.days.map(async (day) => {
      const rows = await fetchSheetRows(TIMETABLE_SHEET.id, day.gid);
      // A blank category means the same category as the row above, as in the sheet.
      let category = "";
      return rows.map((row) => {
        category = row.category?.trim() ? canonicalCategory(row.category) : category;
        return {
          ...row,
          category,
          date: day.date,
          start_time: to12Hour(row.start_time ?? ""),
          end_time: to12Hour(row.end_time ?? ""),
        };
      });
    }),
  );
  return days.flat();
};

const loadEvents = () => fetchSheetRows(EVENTS_SHEET.id, EVENTS_SHEET.gid);

export const useTimetableRows = (): { data: TimetableRow[] | null; error: boolean } => {
  const { rows, error } = useSheetRows("csv-timetable", loadTimetable);
  const data = useMemo(
    () => (rows ? rows.map(normalizeTimetableRow).filter((row): row is TimetableRow => row !== null) : null),
    [rows],
  );
  return { data, error };
};

// Events come from the events sheet, which carries its own venue, date and start time
// columns (filled from the rulebook-derived master list) - no lookup into the timetable sheet needed.
export const useEventSummaries = (): { data: EventSummary[] | null; error: boolean } => {
  const { rows, error } = useSheetRows("csv-events", loadEvents);
  const data = useMemo(() => {
    if (!rows) return null;
    return rows
      .filter((row) => row.event?.trim())
      .map((row) => {
        const title = row.event.trim();
        const category = canonicalCategory(row.category?.trim() || "");
        const reality = row.reality?.trim().toLowerCase() as UniverseKey;
        return {
          title,
          category,
          reality: REALITY_KEYS.includes(reality) ? reality : (CATEGORY_REALITY[category] ?? "aether"),
          venues: row.venue ? row.venue.split("/").map((v) => v.trim()).filter(Boolean) : [],
          dates: row.date ? row.date.split(",").map((d) => d.trim()).filter(Boolean) : [],
          start: row.start_time?.trim() || null,
          // "People" is the older header name; "Team Size" is what the rulebook-derived sheet uses.
          people: row.team_size?.trim() || row.people?.trim() || null,
        };
      });
  }, [rows]);
  return { data, error };
};
