export interface Reality {
  id: string;
  numeral: string;
  name: string;
  domain: string;
  description: string;
  categories: string[];
  accent: string;
  glow: string;
  gradient: string;
  baseImage: string;
  accentImage: string;
  tagBorder: string;
  tagBg: string;
  soft: string;
  onSoft: string;
}

export const REALITIES: Reality[] = [
  {
    id: "aether",
    numeral: "Reality I",
    name: "Aether",
    domain: "Air · Sky · Cosmos",
    description: "Flight, exploration and the boundless future.",
    categories: ["Acumen", "Chroma", "Cosmic Con", "Vortex"],
    accent: "#6ff4fa",
    glow: "#6ff4fa",
    gradient:
      "radial-gradient(circle, rgba(12,135,192,1) 0%, rgba(15,84,142,1) 50%, rgba(16,58,116,1) 75%, rgba(17,32,91,1) 100%)",
    baseImage: "/assets/realities/aether-base.png",
    accentImage: "/assets/realities/aether-accent.png",
    tagBorder: "#6ff4fa",
    tagBg: "#11205b",
    soft: "#e2e2fa",
    onSoft: "#11205b",
  },
  {
    id: "obsidian",
    numeral: "Reality II",
    name: "Obsidian",
    domain: "Earth · Stone · Deep",
    description: "Grounded strength, machinery and things built to withstand force.",
    categories: ["Kraftwagen", "Motion Matrix", "Nexus", "Robowars"],
    accent: "#e349e5",
    glow: "#e349e5",
    gradient:
      "radial-gradient(circle, rgba(162,14,186,1) 0%, rgba(130,15,154,1) 25%, rgba(97,16,122,1) 50%, rgba(65,16,90,1) 75%, rgba(32,17,58,1) 100%)",
    baseImage: "/assets/realities/obsidian-base.png",
    accentImage: "/assets/realities/obsidian-accent.png",
    tagBorder: "#5e17eb",
    tagBg: "#20113a",
    soft: "#f8e1fb",
    onSoft: "#380c76",
  },
  {
    id: "ember",
    numeral: "Reality III",
    name: "Ember",
    domain: "Fire · Energy · Force",
    description: "Competition, circuitry, momentum and technology in motion.",
    categories: ["Bizzcomm", "Mechatron", "Quark", "Synergetics"],
    accent: "#ffaa06",
    glow: "#ff965b",
    gradient:
      "radial-gradient(circle, rgba(238,102,16,1) 0%, rgba(199,81,17,1) 25%, rgba(160,60,18,1) 50%, rgba(121,39,18,1) 75%, rgba(82,18,19,1) 100%)",
    baseImage: "/assets/realities/ember-base.png",
    accentImage: "/assets/realities/ember-accent.png",
    tagBorder: "#ffaa06",
    tagBg: "#3a2410",
    soft: "#ffe8d1",
    onSoft: "#5a2e08",
  },
  {
    id: "zenith",
    numeral: "Reality IV",
    name: "Zenith",
    domain: "Space · Shadow · Void",
    description: "Mystery, information, investigation and the unknown.",
    categories: ["Cached", "Cognitia", "Cryptoss", "Kernel"],
    accent: "#00bf63",
    glow: "#3cc67b",
    gradient:
      "radial-gradient(circle, rgba(60,198,123,1) 0%, rgba(49,165,107,1) 25%, rgba(38,132,90,1) 50%, rgba(27,99,74,1) 75%, rgba(16,66,57,1) 100%)",
    baseImage: "/assets/realities/zenith-base.png",
    accentImage: "/assets/realities/zenith-accent.png",
    tagBorder: "#00bf63",
    tagBg: "#104239",
    soft: "#dffae7",
    onSoft: "#104239",
  },
];
