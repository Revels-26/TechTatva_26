export const SITE = {
  name: "Tech Tatva",
  edition: "'26",
  fullName: "Tech Tatva 26",
  tagline: "MIT Manipal's National Level Techno-Management Fest",
  dates: "Dates to be announced",
  venue: "MIT Manipal, Karnataka",
  // Registration is handled by a separate system — point this at that app/site.
  registerUrl: "https://dev-register-techtatva.manipal.edu/dashboard",
  // Live data from the two Google Sheets web apps (see apps-script/Code.gs). Pages fall back to bundled data if these fail.
  dataApi: {
    timetable: "https://script.google.com/macros/s/AKfycbwUjxEUqDwMpa-swKOBzE6JG4RRTGGzTEYYaNmxe55Mn9-DWdcHXlMMgvv5HUplpL1Z/exec",
    events: "https://script.google.com/macros/s/AKfycbwhTFksUxsnw374oyio52DtYH0KWuPFWta8WWZBi3G9o_DeS9rZntei07TF9TZn3I2aGw/exec",
  },
  // PDFs live in public/docs/ with these names.
  downloads: {
    rulebook: "/docs/TechTatva'26%20rulebook.pdf",
    brochure: "/docs/TechTatva'26%20brochure.pdf",
  },
  socials: {
    instagram: "https://www.instagram.com/techtatvamit",
    twitter: "#",
    linkedin: "#",
    youtube: "#",
  },
  contactEmail: "techsec.scmit@manipal.edu",
  contactGroups: [
    {
      title: "Outstation Management",
      people: [
        { name: "Ananya Choudhury", phone: "+91 93544 40488" },
        { name: "Mayank Arora", phone: "+91 83840 71224" },
      ],
    },
    {
      title: "Student Council",
      people: [
        { name: "Shubham Panda", phone: "+91 77819 43246" },
        { name: "Vedaina Srivastava", phone: "+91 74829 94642" },
        { name: "Riya Aparanji", phone: "+91 97315 58990" },
      ],
    },
  ],
};

// Nav items that are anchors on the home page vs. actual routed pages.
export const NAV_LINKS: { label: string; page: string; anchor?: string }[] = [
  { label: "Home", page: "home" },
  { label: "Passes", page: "home", anchor: "#passes-section" },
  { label: "Events", page: "events" },
  { label: "Speakers", page: "speakers" },
  { label: "Contact", page: "home", anchor: "#contact" },
];

export const VALID_PAGES = ["home", "events", "timetable", "speakers", "meettheteam"];
