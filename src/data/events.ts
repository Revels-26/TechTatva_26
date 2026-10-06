// The four realities used as event filters.
export type UniverseKey = "aether" | "ember" | "obsidian" | "zenith";
export type ArtKind = "dots" | "stripes" | "cross" | "rings" | "zig";

export const UNIVERSES: { key: UniverseKey; name: string; art: ArtKind; shadow: string }[] = [
  { key: "aether", name: "Aether", art: "dots", shadow: "#84d0fc" },
  { key: "ember", name: "Ember", art: "stripes", shadow: "#f24f05" },
  { key: "obsidian", name: "Obsidian", art: "rings", shadow: "#d6b181" },
  { key: "zenith", name: "Zenith", art: "cross", shadow: "#c4b3f5" },
];
