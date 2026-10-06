// Sponsors shown on the landing page. The title is the sponsor type shown below the logo.
// Logos live in public/sponsors/. To change a sponsor, edit this list.
export const SPONSORS: { name: string; logo: string; title: string; href?: string }[] = [
  { name: "Finlatics", logo: "/sponsors/finlatics.jpeg", title: "TechTatva Partner", href: "https://www.finlatics.com/" },
  { name: "Sigma Minerals", logo: "/sponsors/sigma-minerals.jpeg", title: "TechTatva Co-Title Sponsor", href: "https://www.sigmaminerals.com/" },
  { name: "Tempsens", logo: "/sponsors/tempsens.png", title: "TechTatva Honorary Partner", href: "https://tempsens.com/" },
  { name: "Global Extent", logo: "/sponsors/global-extent.png", title: "TechTatva Honorary Partner" },
  { name: "Ambrosia", logo: "/sponsors/ambrosia.png", title: "TechTatva Title Sponsor" },
  { name: "FellaRide", logo: "/sponsors/fellaride.png", title: "TechTatva Mobility Partner + M# Travel Partner", href: "https://fellaride.com/" },
  { name: "Cognecto", logo: "/sponsors/cognecto.jpeg", title: "M# Title Sponsor", href: "https://www.cognecto.com/" },
  { name: "TooYumm", logo: "/sponsors/tooyumm.png", title: "M# Refreshments Partner", href: "https://tooyumm.com/" },
  { name: "Avvatar", logo: "/sponsors/avvatar.jpeg", title: "TechTatva Protein Partner", href: "https://www.avvatarindia.com/" },
];

// Academic sponsor, shown on its own above the industry sponsors. Its logo is light, so it sits on a dark panel.
export const ACADEMIC_SPONSOR = { name: "Deakin", logo: "/sponsors/deakin.png", title: "Academic Sponsor" };
