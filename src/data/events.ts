export type EventStatus = "Ongoing" | "Closing Soon" | "Closed";

export interface ScheduleEvent {
  id: string;
  title: string;
  category: string;
  round?: string;
  description: string;
  venue: string;
  time: string;
  date: string;
  cashPrize: string;
  status: EventStatus;
}

// Placeholder lineup — replace with the real Tech Tatva 26 schedule once finalized.
export const EVENTS: ScheduleEvent[] = [
  {
    id: "hackathon",
    title: "Code Fury",
    category: "Hackathon",
    round: "24 Hours",
    description:
      "Build a working prototype from scratch in 24 hours, judged by industry mentors.",
    venue: "Innovation Lab",
    time: "9:00 AM",
    date: "Day 1",
    cashPrize: "₹50,000",
    status: "Ongoing",
  },
  {
    id: "ai-ml",
    title: "Neural Nexus",
    category: "AI/ML",
    round: "Single Round",
    description: "Solve a real-world dataset challenge using machine learning.",
    venue: "CS Block, Lab 3",
    time: "10:00 AM",
    date: "Day 1",
    cashPrize: "₹30,000",
    status: "Ongoing",
  },
  {
    id: "case-study",
    title: "Boardroom Blitz",
    category: "Case Study",
    round: "2 Rounds",
    description: "Crack a live business case study against the clock.",
    venue: "Seminar Hall",
    time: "11:00 AM",
    date: "Day 1",
    cashPrize: "₹25,000",
    status: "Closing Soon",
  },
  {
    id: "robowars",
    title: "Robo Rumble",
    category: "Robotics",
    round: "Knockout",
    description: "Design and battle combat robots in the arena.",
    venue: "Open Air Theatre",
    time: "2:00 PM",
    date: "Day 2",
    cashPrize: "₹40,000",
    status: "Ongoing",
  },
  {
    id: "startup-pitch",
    title: "Pitch Perfect",
    category: "Entrepreneurship",
    round: "Single Round",
    description: "Pitch your startup idea to a panel of investors.",
    venue: "Auditorium",
    time: "3:00 PM",
    date: "Day 2",
    cashPrize: "₹35,000",
    status: "Ongoing",
  },
  {
    id: "gaming",
    title: "LAN Legends",
    category: "Gaming",
    round: "Bracket",
    description: "Competitive esports tournament across popular titles.",
    venue: "Gaming Arena",
    time: "4:00 PM",
    date: "Day 2",
    cashPrize: "₹20,000",
    status: "Closing Soon",
  },
  {
    id: "workshop-cloud",
    title: "Cloud Native Workshop",
    category: "Workshop",
    description: "Hands-on session on containers and cloud deployment.",
    venue: "Workshop Hall",
    time: "9:30 AM",
    date: "Day 1",
    cashPrize: "Certificates",
    status: "Ongoing",
  },
  {
    id: "quiz",
    title: "Byte Me",
    category: "Quiz",
    round: "Prelims + Finals",
    description: "A technical quiz testing CS fundamentals and current tech trends.",
    venue: "Lecture Hall 2",
    time: "1:00 PM",
    date: "Day 2",
    cashPrize: "₹15,000",
    status: "Ongoing",
  },
];

export const EVENT_CATEGORIES = Array.from(new Set(EVENTS.map((e) => e.category)));
