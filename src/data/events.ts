// Event catalogue shared by the Events and Timetable pages.
// Dates follow the hero copy: TechTatva 26 runs 14 to 17 October 2026.

export type UniverseKey = "aether" | "ember" | "obsidian" | "zenith";
export type ArtKind = "dots" | "stripes" | "cross" | "rings" | "zig";

// The four realities used as event filters. Shadow colours are the realities' brand colours.
export const UNIVERSES: { key: UniverseKey; name: string; art: ArtKind; shadow: string }[] = [
  { key: "aether", name: "Aether", art: "dots", shadow: "#84d0fc" },
  { key: "ember", name: "Ember", art: "stripes", shadow: "#f24f05" },
  { key: "obsidian", name: "Obsidian", art: "rings", shadow: "#d6b181" },
  { key: "zenith", name: "Zenith", art: "cross", shadow: "#c4b3f5" },
];

export type EventEntry = {
  title: string;
  universe: UniverseKey;
  description: string;
  // Day, time, venue, team size, shown as small mono chips.
  chips: [string, string, string, string];
  // Who the event is open to. Defaults to all streams.
  openTo?: string;
};

export const ALL_STREAMS = "All streams";

export const EVENTS: EventEntry[] = [
  { title: "Hack the Tech Tatva", universe: "aether", description: "A 24 hour hackathon. Build anything that connects two worlds.", chips: ["Day 1 // 14 Oct", "9:00 AM", "CS Lab Block", "Team of 3"] },
  { title: "Capture the Flag", universe: "aether", description: "Web, crypto and forensics puzzles, beginner friendly.", chips: ["Day 2 // 15 Oct", "2:00 PM", "Seminar Hall 2", "Team of 2"] },
  { title: "Debug Duel", universe: "aether", description: "Two players, one broken program, first to fix it wins.", chips: ["Day 3 // 16 Oct", "11:00 AM", "CS Lab 2", "Solo"] },
  { title: "Line Follower Showdown", universe: "ember", description: "Bring your bot or build one on site. Fastest clean lap wins.", chips: ["Day 1 // 14 Oct", "10:00 AM", "Mechanical Workshop", "Team of 3"] },
  { title: "Drone Dash", universe: "ember", description: "Fly a quadcopter through a gate course against the clock.", chips: ["Day 2 // 15 Oct", "10:30 AM", "Open Ground", "Team of 2"] },
  { title: "Circuit Escape Room", universe: "ember", description: "Solve electronics puzzles to unlock the door.", chips: ["Day 3 // 16 Oct", "12:00 PM", "Electronics Lab", "Team of 3"], openTo: "Engineering and Science streams" },
  { title: "Poster Slam", universe: "obsidian", description: "Design a festival poster live in two hours from a surprise brief.", chips: ["Day 1 // 14 Oct", "3:00 PM", "Design Studio", "Solo"] },
  { title: "Pixel Heist", universe: "obsidian", description: "A UI redesign sprint: fix a confusing app screen in 90 minutes.", chips: ["Day 2 // 15 Oct", "11:00 AM", "Design Studio", "Team of 2"] },
  { title: "Startup Pitch Arena", universe: "zenith", description: "Pitch an idea in three minutes to a panel of mentors.", chips: ["Day 2 // 15 Oct", "4:00 PM", "Seminar Hall 1", "Team of 4"] },
  { title: "Case Crunch", universe: "zenith", description: "Solve a real-style business case and defend your answer.", chips: ["Day 3 // 16 Oct", "10:00 AM", "Seminar Hall 1", "Team of 3"], openTo: "Management and all other streams" },
  { title: "Open Mic Night", universe: "zenith", description: "Sing, play, rap or recite. Five minutes each.", chips: ["Day 1 // 14 Oct", "6:30 PM", "Canteen Lawn", "Solo"] },
  { title: "Dance-off", universe: "zenith", description: "Solo and crew rounds, judged on energy and originality.", chips: ["Day 1 // 14 Oct", "7:30 PM", "Auditorium", "Solo or crew"] },
  { title: "Street Play Showdown", universe: "zenith", description: "Twenty minutes, one message, no stage, no mics.", chips: ["Day 2 // 15 Oct", "5:00 PM", "Open Air Theatre", "Team of 8"] },
  { title: "Battle of Bands", universe: "zenith", description: "Six bands, one stage, the loudest night of the fest.", chips: ["Day 3 // 16 Oct", "7:30 PM", "Quadrangle", "Band of 3 to 5"] },
];
