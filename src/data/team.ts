export interface TeamMember {
  name: string;
  role: string;
  instagram?: string;
  linkedin?: string;
}

// Placeholder roster — replace with the real organizing committee.
export const CONVENERS: TeamMember[] = [
  { name: "Convener One", role: "Convener", instagram: "#", linkedin: "#" },
  { name: "Convener Two", role: "Convener", instagram: "#", linkedin: "#" },
  { name: "Convener Three", role: "Co-Convener", instagram: "#", linkedin: "#" },
  { name: "Convener Four", role: "Co-Convener", instagram: "#", linkedin: "#" },
];

export const DEVELOPERS: TeamMember[] = [
  { name: "Developer One", role: "Lead Developer", instagram: "#", linkedin: "#" },
  { name: "Developer Two", role: "Developer", instagram: "#", linkedin: "#" },
  { name: "Developer Three", role: "Developer", instagram: "#", linkedin: "#" },
  { name: "Developer Four", role: "Designer", instagram: "#", linkedin: "#" },
  { name: "Developer Five", role: "Developer", instagram: "#", linkedin: "#" },
];
