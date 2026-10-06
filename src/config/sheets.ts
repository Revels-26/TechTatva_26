// Google Sheets the site reads directly (CSV export, the same way the Revels site does it).
// Both sheets must be set to "Anyone with the link can view".

// Timetable sheet: one tab per fest day. The tab ID (gid) is the number after gid= in the tab's link.
export const TIMETABLE_SHEET = {
  id: "1diLJR884e5M9F7u4Q3VIZ6oPJMFq8MzIaWoE55SFeXU",
  days: [
    { date: "14 Oct", gid: "2143708482" },
    { date: "15 Oct", gid: "376225588" },
    { date: "16 Oct", gid: "1081956900" },
    { date: "17 Oct", gid: "1416713467" },
  ],
};

// Events sheet: one tab with Event | Category | Reality | People.
export const EVENTS_SHEET = {
  id: "1QqBVjxfMuoGd_X3epG1j_Wd7fzHvdZ5-cih9hfQWAcM",
  gid: "0",
};
