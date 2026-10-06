// Phone directory for the Contact us section. Add a group per team, with each person's name and number.
export type ContactGroup = {
  team: string;
  people: { name: string; phone: string }[];
};

export const CONTACT_GROUPS: ContactGroup[] = [
  {
    team: "MIT Student Council",
    people: [
      { name: "Shubham Panda", phone: "+91 77819 43246" },
      { name: "Vedaina Srivastava", phone: "+91 74829 94642" },
      { name: "Riya Aparanji", phone: "+91 97315 58990" },
    ],
  },
  {
    team: "Outstation Management",
    people: [
      { name: "Ananya Choudhary", phone: "+91 93544 40488" },
      { name: "Mayank Arora", phone: "+91 83840 71224" },
    ],
  },
  {
    team: "Dev Team",
    people: [
      { name: "Lakshya Singhi", phone: "+91 93304 60428" },
      { name: "Manav Mehta", phone: "+91 83839 94009" },
      { name: "Pragun Kakkar", phone: "+91 99960 54678" },
    ],
  },
  {
    team: "Sponsorship",
    people: [
      { name: "Keshav Krishna Singh", phone: "+91 92014 13554" },
      { name: "Vivaan Bohra", phone: "+91 99867 79719" },
    ],
  },
];
