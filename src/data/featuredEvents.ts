export interface FeaturedEvent {
  id: string;
  realityId: "aether" | "obsidian" | "ember" | "zenith";
  category: string;
  title: string;
  description: string;
  team: string;
  rounds: string;
  when: string;
  prizePool: string;
  media: string;
}

export const FEATURED_EVENTS: FeaturedEvent[] = [
  {
    id: "celestial-labyrinth",
    realityId: "aether",
    category: "Cosmic Con",
    title: "Celestial Labyrinth",
    description:
      "Begin with a Cosmic Quiz before entering a multi-floor Building Escape. Solve astronomy and physics puzzles and race to escape first.",
    team: "Team 2–3",
    rounds: "2 rounds",
    when: "[Needed: date & time]",
    prizePool: "₹16,000",
    media: "/assets/events/celestial-labyrinth.png",
  },
  {
    id: "weight-category",
    realityId: "obsidian",
    category: "Robowars",
    title: "15 KG Weight Category",
    description:
      "Engineer a combat robot and take it into a double-elimination arena. Three-minute bouts test damage, aggression and control.",
    team: "Team 3–5",
    rounds: "4 rounds",
    when: "[Needed: date & time]",
    prizePool: "₹1,80,000",
    media: "/assets/events/weight-category.png",
  },
  {
    id: "capture-the-flag",
    realityId: "zenith",
    category: "Kernel",
    title: "Capture the Flag",
    description:
      "Hunt hidden flags across cryptography, reverse engineering, web security, forensics and more.",
    team: "Team 1–3",
    rounds: "1 round",
    when: "[Needed: date & time]",
    prizePool: "₹15,000",
    media: "/assets/events/capture-the-flag.png",
  },
];
