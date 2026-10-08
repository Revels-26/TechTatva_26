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
  { src: "/assets/socials/post-1.png", alt: "TechTatva '26 social post 1" },
  { src: "/assets/socials/post-2.png", alt: "TechTatva '26 social post 2" },
  { src: "/assets/socials/post-3.png", alt: "TechTatva '26 social post 3" },
  { src: "/assets/socials/post-4.png", alt: "TechTatva '26 social post 4" },
];

export const FAQS: { q: string; a: string }[] = [
  {
    q: "Can students from non-MAHE colleges participate in TechTatva '26?",
    a: "Students from non MAHE institutions are eligible only if they are from BTech or Engineering colleges. All MAHE colleges are allowed to participate without this restriction.",
  },
  {
    q: "What’s the difference between the flagship and the general pass ?",
    a: "The flagship pass gives you access to register for both flagship and general events, while the general pass only allows you to register for general events.",
  },
  {
    q: "I tried to log in as MAHE, but my enrollment number is not found.",
    a: "Please recheck your enrollment number. If your branch was changed, please try using the old registration number.",
  },
  {
    q: "I logged in as MAHE, and my enrollment number is recognised, but I cannot recognize the number I am getting OTP to.",
    a: "Please recheck your enrollment number. If that is correct, and the system is sending OTP to some number, please check if the number displayed is of your parent or guardian. If that isn't the case, please log in to your SLcM 1.0 (Go to SLcM 2.0 -> Profile -> Navigate to SLcM 1.0), go to Admissions Profile, go to address, and change your present details phone number to the desired phone number. Wait 24 hours before trying to sign up.",
  },
  {
    q: "My address details are incorrect, how do I update them?",
    a: "Please log in to your SLcM 1.0 (Go to SLcM 2.0 -> Profile -> Navigate to SLcM 1.0), go to Profile, go to address, and update your details there. Then wait until 12 AM (midnight) before trying again.",
  },
  {
    q: "What should I do if I make the payment, and it's not reflected on the website?",
    a: "If payment is debited, the website will update in 48 hours, else you will get a refund automatically.",
  },
  {
    q: "What is the cancellation and refund policy for all purchases?",
    a: "No refunds are provided once a purchase is confirmed.",
  },
  {
    q: "Offline ticket sales",
    a: "There will be no offline sales for any of the passes.",
  },
  {
    q: "Will accommodation be provided for Outstation participants?",
    a: "Yes, accommodation will be provided on a nominal cost. However, it is allocated on a first-come, first-served basis and is subject to availability.",
  },
  {
    q: "Are mentors permitted to accompany their teams, and will they be provided with accommodation?",
    a: "Mentors are welcome to accompany their teams. Accommodation for mentors will also be provided on a first-come, first-served basis, based upon availability.",
  },
  {
    q: "What documents are required upon arrival?",
    a: "All participants must present the following documents for verification: a bonafide certificate from your college authorizing your team's participation; a physical valid government-issued photo ID (e.g., Aadhar Card, Driver's License, etc.), along with a copy as well; and your current college ID card.",
  },
  {
    q: "Is individual registration and pass purchase required for each team member?",
    a: "Yes, it is mandatory for every team member to individually purchase a pass and complete the registration process on the official website.",
  },
];
