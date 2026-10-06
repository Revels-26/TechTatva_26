import type { UniverseKey } from "./events";

// Timetable rows from the TT'26 master list. One entry per event round.
export type TimetableRow = {
  category: string;
  event: string;
  round: string;
  venue: string;
  start: string | null;
  end: string | null;
  duration: string | null;
  date: string;
};

export const TIMETABLE: TimetableRow[] = [
  { category: "Acumen", event: "Hopeless Opus", round: "1 of 3", venue: "Online", start: "12:00 PM", end: "12:00 AM", duration: null, date: "14 Oct" },
  { category: "Acumen", event: "Hopeless Opus", round: "2 of 3", venue: "Online", start: "12:00 PM", end: "12:00 AM", duration: null, date: "15 Oct" },
  { category: "Acumen", event: "Tesseract", round: "1 of 3", venue: "Library GSH+LA", start: "1:00 PM", end: "2:00 PM", duration: null, date: "15 Oct" },
  { category: "Acumen", event: "Tesseract", round: "2 of 3", venue: "Library GSH+LA", start: "2:30 PM", end: "5:00 PM", duration: null, date: "15 Oct" },
  { category: "Acumen", event: "Tesseract", round: "3 of 3", venue: "Library GSH+LA", start: "1:00 PM", end: "5:00 PM", duration: null, date: "16 Oct" },
  { category: "Acumen", event: "Hopeless Opus", round: "3  of 3", venue: "Online", start: "12:00 PM", end: "6:00 PM", duration: null, date: "16 Oct" },
  { category: "Bizcomm", event: "Quantquest", round: "1 of 3", venue: "AB3 103", start: "2:00 PM", end: "4:30 PM", duration: null, date: "14 Oct" },
  { category: "Bizcomm", event: "Quantquest", round: "2 of 3", venue: "AB3 103", start: "4:30 PM", end: "5:30 PM", duration: null, date: "14 Oct" },
  { category: "Bizcomm", event: "Quandry", round: "1 of 3", venue: "AB5 206", start: "3:00 PM", end: "3:30 PM", duration: null, date: "14 Oct" },
  { category: "Bizcomm", event: "Quantquest", round: "3 of 3", venue: "AB3 103", start: "3:00 PM", end: "5:00 PM", duration: null, date: "15 Oct" },
  { category: "Bizcomm", event: "Monopoly", round: "1 of 3", venue: "Online", start: "1:00 PM", end: "2:00 PM", duration: null, date: "15 Oct" },
  { category: "Bizcomm", event: "Monopoly", round: "2 of 3", venue: "AB3 102", start: "2:00 PM", end: "4:30 PM", duration: null, date: "15 Oct" },
  { category: "Bizcomm", event: "Monopoly", round: "3 of 3", venue: "AB3 102", start: "4:30 PM", end: "6:30 PM", duration: null, date: "15 Oct" },
  { category: "Bizcomm", event: "Quandry", round: "2 of 3", venue: "AB5 206", start: "2:00 PM", end: "5:00 PM", duration: null, date: "15 Oct" },
  { category: "Bizcomm", event: "Quandry", round: "3 of 3", venue: "AB5 206", start: "1:00 PM", end: "4:30 PM", duration: null, date: "17 Oct" },
  { category: "Cached", event: "MIT Open", round: "1 of 2", venue: "Online", start: "3:30 PM", end: "4:30 PM", duration: null, date: "14 Oct" },
  { category: "Cached", event: "Cryptic Finds", round: "1 of 1", venue: "Online", start: null, end: null, duration: "Full Day", date: "16 Oct" },
  { category: "Cached", event: "MIT Open", round: "2 of 3", venue: "PSUC Lab IC", start: "1:00 PM", end: "3:00 PM", duration: null, date: "16 Oct" },
  { category: "Cached", event: "MIT Open", round: "3 of 3", venue: "PSUC Lab IC", start: "3:00 PM", end: "5:00 PM", duration: null, date: "16 Oct" },
  { category: "Chroma", event: "Triad Tactics", round: "1 of 3", venue: "Online", start: null, end: null, duration: "Full day", date: "14 Oct" },
  { category: "Chroma", event: "The Social Network", round: "1 of 1", venue: "Student Plaza", start: "1:00 PM", end: "5:00 PM", duration: null, date: "17 Oct" },
  { category: "Cognitia", event: "Data Tycoon", round: "1 of 3", venue: "AB3 104,105,204,205", start: "2:00 PM", end: "3:00 PM", duration: null, date: "14 Oct" },
  { category: "Cognitia", event: "Data Tycoon", round: "2 of 3", venue: "AB3 104,105,204,205", start: "3:30 PM", end: "4:30 PM", duration: null, date: "14 Oct" },
  { category: "Cognitia", event: "Data Tycoon", round: "3 of 3", venue: "AB3 104,105,204,205", start: "5:00 PM", end: "6:00 PM", duration: null, date: "14 Oct" },
  { category: "Cognitia", event: "The Last Dataset", round: "1 of 1", venue: "Online", start: null, end: null, duration: "Full Day", date: "15 Oct" },
  { category: "Cosmic Con", event: "Starlock Holmes", round: "1 of 3", venue: "AB5 301,302,306,308,401,404,406", start: "1:00 PM", end: "2:00 PM", duration: null, date: "15 Oct" },
  { category: "Cosmic Con", event: "Starlock Holmes", round: "2 of 3", venue: "AB5 301,302,306,308,401,404,406", start: "3:00 PM", end: "4:30 PM", duration: null, date: "15 Oct" },
  { category: "Cosmic Con", event: "Starlock Holmes", round: "3 of 3", venue: "AB5 301,302,306,308,401,404,406", start: "5:00 PM", end: "6:00 PM", duration: null, date: "15 Oct" },
  { category: "Cosmic Con", event: "Space Survival", round: "1 of 6", venue: "AB5 410,411", start: "4:00 PM", end: "6:30 PM", duration: null, date: "15 Oct" },
  { category: "Cosmic Con", event: "Space Survival", round: "2 of 6", venue: "AB5 410,411", start: "4:00 PM", end: "6:30 PM", duration: null, date: "15 Oct" },
  { category: "Cosmic Con", event: "Space Survival", round: "3 of 6", venue: "AB5 410,411", start: "4:00 PM", end: "6:30 PM", duration: null, date: "15 Oct" },
  { category: "Cosmic Con", event: "Space Survival", round: "4 of 6", venue: "AB5 410,411", start: "4:00 PM", end: "6:30 PM", duration: null, date: "15 Oct" },
  { category: "Cosmic Con", event: "Space Survival", round: "5 of 6", venue: "AB5 410,411", start: "4:00 PM", end: "6:30 PM", duration: null, date: "15 Oct" },
  { category: "Cosmic Con", event: "Space Survival", round: "6 of 6", venue: "AB5 410,411", start: "4:00 PM", end: "6:30 PM", duration: null, date: "15 Oct" },
  { category: "Cosmic Con", event: "Celestial Labyrinth", round: "1 of 2", venue: "AB5 202,203,204,305,307,309,403,405,407 ,503,504", start: "1:00 PM", end: "3:00 PM", duration: null, date: "15 Oct" },
  { category: "Cosmic Con", event: "Celestial Labyrinth", round: "2 of 2", venue: "AB5 402,404,406,408", start: "3:00 PM", end: "7:00 PM", duration: null, date: "16 Oct" },
  { category: "Cosmic Con", event: "Starlock Holmes", round: "5 of 5", venue: "MV Seminar Hall", start: "5:00 PM", end: "6:30 PM", duration: null, date: "16 Oct" },
  { category: "Cosmic Con", event: "Starlock Holmes", round: "4 of 5", venue: "MV Seminar Hall", start: "3:00 PM", end: "4:30 PM", duration: null, date: "16 Oct" },
  { category: "Cryptoss", event: "Order Of Chaos", round: "1 of 1", venue: "AB4 CCF LAB", start: "2:00 PM", end: "5:00 PM", duration: null, date: "15 Oct" },
  { category: "Cryptoss", event: "Euler's Sphere", round: "1 of 3", venue: "AB3 203", start: "1:00 PM", end: "2:00 PM", duration: null, date: "16 Oct" },
  { category: "Cryptoss", event: "Euler's Sphere", round: "2 of 3", venue: "AB3 203", start: "2:15 PM", end: "3:00 PM", duration: null, date: "16 Oct" },
  { category: "Cryptoss", event: "Euler's Sphere", round: "3 of 3", venue: "AB3 203", start: "3:15 PM", end: "4:00 PM", duration: null, date: "16 Oct" },
  { category: "Kernel", event: "Capture the Flag", round: "1 of 1", venue: "Online", start: null, end: null, duration: "Full day", date: "14 Oct" },
  { category: "Kernel", event: "Prompt Arena", round: "1 of 1", venue: "AB3 203", start: "2:00 PM", end: "5:00 PM", duration: null, date: "15 Oct" },
  { category: "Kernel", event: "Tech Mafia", round: "1 of 2", venue: "AB5 210,211,212", start: "2:00 PM", end: "6:00 PM", duration: null, date: "15 Oct" },
  { category: "Kernel", event: "Tech Mafia", round: "2 of 2", venue: "AB5 211", start: "3:00 PM", end: "6:00 PM", duration: null, date: "16 Oct" },
  { category: "Kraftwagen", event: "Offroad Mayhem", round: "1 of 1", venue: "AB5 Foyer", start: "2:00 PM", end: "5:00 PM", duration: null, date: "14 Oct" },
  { category: "Kraftwagen", event: "Offroad Mayhem", round: "2 of 3", venue: "AB5 Foyer Near gate 7", start: "2:00 PM", end: "6:00 PM", duration: null, date: "15 Oct" },
  { category: "Kraftwagen", event: "Pitstop", round: "1 of 1", venue: "TMR Workshop (bay3)", start: "1:00 PM", end: "5:00 PM", duration: null, date: "15 Oct" },
  { category: "Kraftwagen", event: "Offroad Mayhem", round: "3 of 3", venue: "AB5 Foyer Near gate 7", start: "2:00 PM", end: "6:00 PM", duration: null, date: "16 Oct" },
  { category: "Mechatron", event: "Battleship", round: "1 of 2", venue: "Student Plaza", start: "2:00 PM", end: "6:00 PM", duration: null, date: "14 Oct" },
  { category: "Mechatron", event: "Battleship", round: "2 of 3", venue: "Student Plaza", start: "2:00 PM", end: "7:00 PM", duration: null, date: "15 Oct" },
  { category: "Mechatron", event: "Battleship", round: "3 of 3", venue: "Student Plaza", start: "2:00 PM", end: "7:00 PM", duration: null, date: "16 Oct" },
  { category: "Motion Matrix", event: "Line Follower", round: "1 of 2", venue: "FC1 Second Floor", start: "2:00 PM", end: "5:00 PM", duration: null, date: "14 Oct" },
  { category: "Motion Matrix", event: "Maze Solver", round: "1 of 2", venue: "AB5 Foyer Cafeteria", start: "1:00 PM", end: "4:00 PM", duration: null, date: "14 Oct" },
  { category: "Motion Matrix", event: "Line Follower", round: "2 of 2", venue: "FC1 Second Floor", start: "2:00 PM", end: "5:00 PM", duration: null, date: "15 Oct" },
  { category: "Motion Matrix", event: "Maze Solver", round: "2 of 2", venue: "AB5 Foyer Cafeteria", start: "1:00 PM", end: "4:00 PM", duration: null, date: "15 Oct" },
  { category: "Nexus", event: "City Scraping", round: "1 of 3", venue: "AB5 303,304,305,306", start: "1:00 PM", end: "2:00 PM", duration: null, date: "14 Oct" },
  { category: "Nexus", event: "City Scraping", round: "2 of 3", venue: "AB5 303,304,305,306", start: "2:30 PM", end: "4:30 PM", duration: null, date: "14 Oct" },
  { category: "Nexus", event: "City Scraping", round: "3 of 3", venue: "AB5 303,304,305,306", start: "5:00 PM", end: "7:00 PM", duration: null, date: "14 Oct" },
  { category: "Nexus", event: "Innoframe", round: "1 of 3", venue: "AB5 501,502", start: "2:00 PM", end: "2:30 PM", duration: null, date: "15 Oct" },
  { category: "Nexus", event: "Innoframe", round: "2 of 3", venue: "AB5 501,502", start: "3:00 PM", end: "4:00 PM", duration: null, date: "15 Oct" },
  { category: "Nexus", event: "Innoframe", round: "3 of 3", venue: "AB5 501,502", start: "4:30 PM", end: "5:00 PM", duration: null, date: "15 Oct" },
  { category: "Nexus", event: "City Scraping", round: "3 of 3", venue: "AB5 310B", start: "3:00 PM", end: "4:00 PM", duration: null, date: "16 Oct" },
  { category: "Quark", event: "Chronohunt", round: "1 of 3", venue: "AB5 311,312,313,314,315,316,317", start: "1:00 PM", end: "3:00 PM", duration: null, date: "14 Oct" },
  { category: "Quark", event: "Chronohunt", round: "2 of 3", venue: "AB5 311,312,313,314,315,316,317", start: "3:00 PM", end: "6:00 PM", duration: null, date: "14 Oct" },
  { category: "Quark", event: "Bitflip", round: "1  of 2", venue: "AB5 205,207", start: "1:00 PM", end: "1:45 PM", duration: null, date: "14 Oct" },
  { category: "Quark", event: "Bitflip", round: "2 of 2", venue: "AB5 205,207", start: "2:30 PM", end: "4:30 PM", duration: null, date: "14 Oct" },
  { category: "Quark", event: "Chronohunt", round: "3 of 3", venue: "AB5 311,312,313,314", start: "2:00 PM", end: "5:00 PM", duration: null, date: "15 Oct" },
  { category: "Robowars", event: "15kg", round: "1 of 4", venue: "ROBOWARS Cage near SAC", start: "1:00 PM", end: "4:00 PM", duration: null, date: "15 Oct" },
  { category: "Robowars", event: "8Kg", round: "1 of 4", venue: "ROBOWARS Cage near SAC", start: "1:00 PM", end: "4:00 PM", duration: null, date: "15 Oct" },
  { category: "Robowars", event: "15kg", round: "2 of 4", venue: "ROBOWARS Cage near SAC", start: "4:00 PM", end: "7:00 PM", duration: null, date: "15 Oct" },
  { category: "Robowars", event: "8Kg", round: "2 of 4", venue: "ROBOWARS Cage near SAC", start: "4:00 PM", end: "7:00 PM", duration: null, date: "15 Oct" },
  { category: "Robowars", event: "15Kg", round: "3 of 4", venue: "ROBOWARS Cage near SAC", start: "1:00 PM", end: "3:00 PM", duration: null, date: "16 Oct" },
  { category: "Robowars", event: "8Kg", round: "3 of 4", venue: "ROBOWARS Cage near SAC", start: "1:00 PM", end: "3:00 PM", duration: null, date: "16 Oct" },
  { category: "Robowars", event: "15Kg", round: "4 of 4", venue: "ROBOWARS Cage near SAC", start: "4:00 PM", end: "6:00 PM", duration: null, date: "16 Oct" },
  { category: "Robowars", event: "8Kg", round: "4 of 4", venue: "ROBOWARS Cage near SAC", start: "4:00 PM", end: "6:00 PM", duration: null, date: "16 Oct" },
  { category: "Synergetics", event: "Biowars", round: "1 of  2", venue: "AB3 303,304", start: "1:00 PM", end: "5:00 PM", duration: null, date: "14 Oct" },
  { category: "Synergetics", event: "Biowars", round: "2 of 2", venue: "AB3 303,304", start: "1:00 PM", end: "5:00 PM", duration: null, date: "15 Oct" },
  { category: "Synergetics", event: "Contagion", round: "1 of 2", venue: "AB3 402,403,404,405", start: "2:00 PM", end: "6:30 PM", duration: null, date: "15 Oct" },
  { category: "Synergetics", event: "Contagion", round: "2 of 2", venue: "AB3 402,403,404,405", start: "2:00 PM", end: "6:00 PM", duration: null, date: "16 Oct" },
  { category: "Synergetics", event: "Contagion", round: "2 of 2", venue: "AB5 312,313,314", start: "1:00 PM", end: "4:00 PM", duration: null, date: "17 Oct" },
  { category: "Vortex", event: "Icarus", round: "1 of 2", venue: "FC1 First Floor", start: "2:00 PM", end: "4:00 PM", duration: null, date: "14 Oct" },
  { category: "Vortex", event: "Icarus", round: "2 of 2", venue: "FC1 First Floor", start: "4:00 PM", end: "6:00 PM", duration: null, date: "14 Oct" },
  { category: "Vortex", event: "Escape Velocity", round: "1 of 1", venue: "Football Ground", start: "1:00 PM", end: "5:00 PM", duration: null, date: "15 Oct" },
];

// Logo file for each category, from public/category_logos/. File names differ slightly from the sheet names.
export const CATEGORY_LOGOS: Record<string, string> = {
  Acumen: "Acumen.png",
  Bizcomm: "Bizzcomm.png",
  Cached: "cached.png",
  Chroma: "CHROMA.png",
  Cognitia: "cognita.png",
  "Cosmic Con": "COSMIC CON.png",
  Cryptoss: "cryptoss.png",
  Kernel: "kernal.png",
  Kraftwagen: "kraftwagen.png",
  Mechatron: "mechatron.png",
  "Motion Matrix": "motion matrix 1.png",
  Nexus: "nexus.png",
  Quark: "quark.png",
  Robowars: "robowars.png",
  Synergetics: "synergytics.png",
  Vortex: "vortex.png",
};

export const categoryLogoSrc = (category: string) => encodeURI(`/category_logos/${CATEGORY_LOGOS[category]}`);

// Reality for each category, from the brochure's contents page. Used by the timetable filters.
export const CATEGORY_REALITY: Record<string, UniverseKey> = {
  Acumen: "aether",
  Chroma: "aether",
  "Cosmic Con": "aether",
  Vortex: "aether",
  Kraftwagen: "obsidian",
  "Motion Matrix": "obsidian",
  Nexus: "obsidian",
  Robowars: "obsidian",
  Bizcomm: "ember",
  Mechatron: "ember",
  Quark: "ember",
  Synergetics: "ember",
  Cached: "zenith",
  Cognitia: "zenith",
  Cryptoss: "zenith",
  Kernel: "zenith",
};

// One entry per event, built from its rounds. Used by the events page cards.
export type EventSummary = {
  title: string;
  category: string;
  reality: UniverseKey;
  venues: string[];
  dates: string[];
  start: string | null;
  people: string | null;
};

export const EVENT_SUMMARIES: EventSummary[] = (() => {
  const groups = new Map<string, TimetableRow[]>();
  for (const row of TIMETABLE) {
    // "15Kg" and "15kg" are the same event in the sheet, so group case-insensitively.
    const key = `${row.category}|${row.event.toLowerCase()}`;
    groups.set(key, [...(groups.get(key) ?? []), row]);
  }
  return [...groups.values()].map((rows) => ({
    title: rows[0].event,
    category: rows[0].category,
    reality: CATEGORY_REALITY[rows[0].category],
    venues: [...new Set(rows.map((r) => r.venue))],
    dates: [...new Set(rows.map((r) => r.date))],
    start: rows.find((r) => r.start)?.start ?? null,
    people: null,
  }));
})();

// Row shape as the Google Sheets web app returns it: header names turned into snake_case keys.
export type SheetRow = Record<string, string>;

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// "14-10-2026" -> "14 Oct". Dates already in "14 Oct" form pass through.
const dayMonth = (value: string) => {
  const match = /^(\d{1,2})-(\d{1,2})-(\d{4})$/.exec(value);
  return match ? `${Number(match[1])} ${MONTHS[Number(match[2]) - 1]}` : value;
};

// "2:00 PM" passes through. Placeholders like "--" or "-" become null.
const clockText = (value: string) => (/\d{1,2}:\d{2}/.test(value) ? value.toUpperCase() : null);

export const normalizeTimetableRow = (raw: SheetRow): TimetableRow | null => {
  const event = raw.event?.trim();
  const date = raw.date ? dayMonth(raw.date.trim()) : "";
  if (!event || !date) return null;
  return {
    category: raw.category?.trim() ?? "",
    event,
    round: raw.round?.trim() ?? "",
    venue: raw.venue?.trim() ?? "",
    start: clockText(raw.start_time ?? ""),
    end: clockText(raw.end_time ?? ""),
    // The sheet header "Duration(hrs)" comes through as "durationhrs".
    duration: (raw.durationhrs ?? raw.duration_hrs)?.trim() || null,
    date,
  };
};
