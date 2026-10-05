// Card shadow palette: the four realities' colours.
export const SHADOW_COLORS = ["#84d0fc", "#f24f05", "#d6b181", "#c4b3f5"];

// Picks a shadow colour for a card from its key (title, label or id). The pick looks random across
// cards but is stable for the same key, so a card keeps its colour across re-renders.
export const shadowFor = (key: string) => {
  let hash = 0;
  for (const char of key) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return SHADOW_COLORS[hash % SHADOW_COLORS.length];
};
