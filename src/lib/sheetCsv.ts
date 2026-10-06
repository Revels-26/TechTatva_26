import type { SheetRow } from "../data/timetable";

// Fetches one tab of a Google Sheet as CSV and returns its rows as objects keyed by the header.
// The header is the first row that contains an "Event" cell, so title rows above it are skipped.
export const fetchSheetRows = async (sheetId: string, gid: string): Promise<SheetRow[]> => {
  const res = await fetch(`https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`);
  if (!res.ok) throw new Error(`Sheet ${sheetId} (gid ${gid}) returned ${res.status}`);
  const table = parseCsv(await res.text());

  const headerIndex = table.findIndex((row) => row.some((cell) => cell.trim().toLowerCase() === "event"));
  if (headerIndex === -1) return [];

  const keys = table[headerIndex].map(toKey);
  return table
    .slice(headerIndex + 1)
    .filter((row) => row.some((cell) => cell.trim() !== ""))
    .map((row) => {
      const item: SheetRow = {};
      keys.forEach((key, i) => {
        if (key) item[key] = (row[i] ?? "").trim();
      });
      return item;
    });
};

// "Start Time" -> "start_time", "Duration(hrs)" -> "duration_hrs"
const toKey = (header: string) =>
  header
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

// The sheet stores times as 24-hour text ("13:00", "9:00"). Convert them to the "1:00 PM" form the site shows.
// Midnight ("0:00") becomes 12 AM; 1 to 6 o'clock are afternoon, 7 to 11 are morning.
export const to12Hour = (value: string): string => {
  const match = /^(\d{1,2}):(\d{2})$/.exec(value.trim());
  if (!match) return value;
  const hour = Number(match[1]);
  const minutes = match[2];
  if (hour === 0) return `12:${minutes} AM`;
  if (hour === 12) return `12:${minutes} PM`;
  if (hour > 12) return `${hour - 12}:${minutes} PM`;
  if (hour >= 7) return `${hour}:${minutes} AM`;
  return `${hour}:${minutes} PM`;
};

// Minimal CSV parser: handles quoted fields, commas and line breaks inside quotes.
const parseCsv = (text: string): string[][] => {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (quoted) {
      if (char === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (char === '"') {
        quoted = false;
      } else {
        field += char;
      }
    } else if (char === '"') {
      quoted = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n" || char === "\r") {
      if (char === "\r" && text[i + 1] === "\n") i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }
  if (field !== "" || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
};
