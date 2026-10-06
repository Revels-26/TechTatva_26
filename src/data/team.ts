// Team shown on the Meet the team page. Photos live in public/team/.
export type TeamMember = {
  name: string;
  designation?: string;
  photo?: string;
  instagram?: string;
  linkedin?: string;
};

export const TEAM_SECTIONS: { title: string; members: TeamMember[] }[] = [
  {
    title: "Technical secretaries",
    members: [
      {
        name: "Shubham Panda",
        designation: "Technical Secretary",
        photo: "/team/shubham.jpeg",
        instagram: "https://www.instagram.com/suvm._",
        linkedin: "https://www.linkedin.com/in/shubhampanda",
      },
      {
        name: "Riya Aparanji",
        designation: "Joint Technical Secretary",
        photo: "/team/Riya.jpg",
        instagram: "https://www.instagram.com/riyaaparanji",
        linkedin: "https://www.linkedin.com/in/riya-aparanji-8a7a83307",
      },
      {
        name: "Vedaina Shrivastav",
        designation: "Technical Secretary",
        photo: "/team/vedaina.jpeg",
        instagram: "https://www.instagram.com/itz_vedu005",
        linkedin: "https://www.linkedin.com/in/vedaina-srivastava-7702b222b",
      },
    ],
  },
  {
    title: "Technical team",
    members: [
      {
        name: "Sarthak Sharma",
        photo: "/team/sarthak.jpg",
        instagram: "https://www.instagram.com/lovesick_cadmium/",
        linkedin: "https://www.linkedin.com/in/sarthak-sharma-07280b220",
      },
      {
        name: "Lakshya Singhi",
        photo: "/team/lakshya.jpg",
        instagram: "https://www.instagram.com/lakshya_0511/",
        linkedin: "https://www.linkedin.com/in/lakshya-singhi-a3108736a/",
      },
      {
        name: "Pragun Kakkar",
        photo: "/team/pragun.jpg",
        instagram: "https://www.instagram.com/pragun_kakkar",
        linkedin: "https://www.linkedin.com/in/pragun-kakkar-b3bab1330",
      },
      {
        name: "Manav Mehta",
        photo: "/team/manav.jpg",
        instagram: "https://www.instagram.com/_manavmehta_",
        linkedin: "https://www.linkedin.com/in/manav-mehta-79b264296",
      },
      {
        name: "Praket Reddy Ragannagari",
        photo: "/team/praket.jpg",
        instagram: "https://www.instagram.com/praketr_7/",
        linkedin: "https://www.linkedin.com/in/praket-reddy-ragannagari-05bb89367",
      },
    ],
  },
];
