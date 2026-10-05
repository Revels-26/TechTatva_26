// Event catalogue shared by the Events and Timetable pages.
// Dates follow the hero copy: TechTatva 26 runs 14 to 17 October 2026.

export type UniverseKey = "code" | "machines" | "design" | "business" | "culture";
export type ArtKind = "dots" | "stripes" | "cross" | "rings" | "zig";

// Shadow colour per universe card, as in the Figma "D4 Events & Schedule" frame (121:800).
export const UNIVERSES: { key: UniverseKey; name: string; art: ArtKind; shadow: string }[] = [
  { key: "code", name: "Code", art: "dots", shadow: "#59a7ff" },
  { key: "machines", name: "Machines", art: "stripes", shadow: "#2db84d" },
  { key: "design", name: "Design", art: "rings", shadow: "#ffc93c" },
  { key: "business", name: "Business", art: "cross", shadow: "#59a7ff" },
  { key: "culture", name: "Culture", art: "zig", shadow: "#ff8c42" },
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
  { title: "Hack the Tech Tatva", universe: "code", description: "A 24 hour hackathon. Build anything that connects two worlds.", chips: ["Day 1 // 14 Oct", "9:00 AM", "CS Lab Block", "Team of 3"] },
  { title: "Capture the Flag", universe: "code", description: "Web, crypto and forensics puzzles, beginner friendly.", chips: ["Day 2 // 15 Oct", "2:00 PM", "Seminar Hall 2", "Team of 2"] },
  { title: "Debug Duel", universe: "code", description: "Two players, one broken program, first to fix it wins.", chips: ["Day 3 // 16 Oct", "11:00 AM", "CS Lab 2", "Solo"] },
  { title: "Line Follower Showdown", universe: "machines", description: "Bring your bot or build one on site. Fastest clean lap wins.", chips: ["Day 1 // 14 Oct", "10:00 AM", "Mechanical Workshop", "Team of 3"] },
  { title: "Drone Dash", universe: "machines", description: "Fly a quadcopter through a gate course against the clock.", chips: ["Day 2 // 15 Oct", "10:30 AM", "Open Ground", "Team of 2"] },
  { title: "Circuit Escape Room", universe: "machines", description: "Solve electronics puzzles to unlock the door.", chips: ["Day 3 // 16 Oct", "12:00 PM", "Electronics Lab", "Team of 3"], openTo: "Engineering and Science streams" },
  { title: "Poster Slam", universe: "design", description: "Design a festival poster live in two hours from a surprise brief.", chips: ["Day 1 // 14 Oct", "3:00 PM", "Design Studio", "Solo"] },
  { title: "Pixel Heist", universe: "design", description: "A UI redesign sprint: fix a confusing app screen in 90 minutes.", chips: ["Day 2 // 15 Oct", "11:00 AM", "Design Studio", "Team of 2"] },
  { title: "Startup Pitch Arena", universe: "business", description: "Pitch an idea in three minutes to a panel of mentors.", chips: ["Day 2 // 15 Oct", "4:00 PM", "Seminar Hall 1", "Team of 4"] },
  { title: "Case Crunch", universe: "business", description: "Solve a real-style business case and defend your answer.", chips: ["Day 3 // 16 Oct", "10:00 AM", "Seminar Hall 1", "Team of 3"], openTo: "Management and all other streams" },
  { title: "Open Mic Night", universe: "culture", description: "Sing, play, rap or recite. Five minutes each.", chips: ["Day 1 // 14 Oct", "6:30 PM", "Canteen Lawn", "Solo"] },
  { title: "Dance-off", universe: "culture", description: "Solo and crew rounds, judged on energy and originality.", chips: ["Day 1 // 14 Oct", "7:30 PM", "Auditorium", "Solo or crew"] },
  { title: "Street Play Showdown", universe: "culture", description: "Twenty minutes, one message, no stage, no mics.", chips: ["Day 2 // 15 Oct", "5:00 PM", "Open Air Theatre", "Team of 8"] },
  { title: "Battle of Bands", universe: "culture", description: "Six bands, one stage, the loudest night of the fest.", chips: ["Day 3 // 16 Oct", "7:30 PM", "Quadrangle", "Band of 3 to 5"] },
];
