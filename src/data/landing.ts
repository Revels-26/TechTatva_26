// Copy and media for the landing page sections. Placeholder copy is marked as such;
// swap in the real text, sponsor logos and post links before launch.

export const GALLERY: { src: string; caption: string }[] = [
  { src: "/assets/gallery/robowars.png", caption: "Robowars" },
  { src: "/assets/gallery/kernel.png", caption: "Kernel" },
  { src: "/assets/gallery/kraftwagen.png", caption: "Kraftwagen" },
  { src: "/assets/gallery/quark.png", caption: "Quark" },
  { src: "/assets/gallery/cosmic-con.png", caption: "Cosmic Con" },
];

export const LEGACY_STATS: { value: string; label: string }[] = [
  { value: "4", label: "Days of fest" },
  { value: "14", label: "Events" },
  { value: "5", label: "Universes" },
];

// Placeholder sponsor names. Replace with real logos under public/assets/sponsors/.
export const SPONSOR_TIERS: { tier: string; names: string[] }[] = [
  { tier: "Title sponsor", names: ["Sponsor name"] },
  { tier: "Associate sponsors", names: ["Sponsor name", "Sponsor name", "Sponsor name"] },
  { tier: "Partners", names: ["Partner name", "Partner name", "Partner name", "Partner name"] },
];

export const SOCIAL_POSTS: { src: string; alt: string }[] = [
  { src: "/assets/socials/post-1.png", alt: "TechTatva 26 social post 1" },
  { src: "/assets/socials/post-2.png", alt: "TechTatva 26 social post 2" },
  { src: "/assets/socials/post-3.png", alt: "TechTatva 26 social post 3" },
  { src: "/assets/socials/post-4.png", alt: "TechTatva 26 social post 4" },
];

export const FAQS: { q: string; a: string }[] = [
  {
    q: "What is TechTatva 26?",
    a: "TechTatva is MIT Manipal's national-level techno-management fest. This edition runs over four days with competitions, workshops and talks across five universes.",
  },
  {
    q: "How do I get a pass?",
    a: "Passes, combos and merch are bought on the registration site. The Buy and Purchase buttons on this page take you there.",
  },
  {
    q: "What is the difference between the General and Flagship pass?",
    a: "The General pass gives entry to the events open to all streams. The Flagship pass includes everything in General plus the flagship events. Placeholder copy, to be confirmed.",
  },
  {
    q: "What does the Conclave pass cover?",
    a: "The Conclave pass gives access to the talks and headline acts on each of the three evenings.",
  },
  {
    q: "What is in the combos?",
    a: "Flagship + Merch bundles a Flagship pass with the TechTatva 26 merch pack. Conclave + Merch bundles a Conclave pass with the same merch.",
  },
  {
    q: "Can I get my money back?",
    a: "Refund terms will be published with the pass details. Placeholder answer until the policy is confirmed.",
  },
  {
    q: "Who do I contact for outstation help?",
    a: "Use the contacts in the footer. The Outstation Management team can help with travel and stay questions.",
  },
];
