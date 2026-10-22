import kids from "@/assets/kids.webp";
import students from "@/assets/students.webp";
import seniors from "@/assets/seniors.webp";
export const LOGO = "/mamba-silver-logo.png";
export const INSTAGRAM = "https://www.instagram.com/mamba_combat/";
export const ADDRESS =
  "98, 4th Cross, Bannerghatta Rd, Shanbhog Nagappa Layout, Bilekahalli, Bengaluru, Karnataka 560076";
export const PHONE = "+91 98765 43210";
export const EMAIL = "info@mambacombat.com";
export const MAP_QUERY = encodeURIComponent(ADDRESS);

export const NAV = [
  { label: "About Us", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Schedule", href: "#schedule" },
  { label: "Contact", href: "#contact" },
];

export const MISSION = [
  "Empowerment through functional strength",
  "Real-world capability and resilience",
  "Welcoming community for all ages",
  "Continuous personal growth",
];

export const PROGRAMS = [
  {
    title: "Kids Program",
    desc: "Building discipline, focus, and fundamental movement skills in a fun, positive, and encouraging environment.",
    tags: ["Discipline", "Fun", "Confidence"],
    img: kids,
  },
  {
    title: "College Students",
    desc: "The perfect outlet for stress relief, building fitness, and learning practical self-defense while juggling academics.",
    tags: ["Stress Relief", "Fitness", "Self-Defense"],
    img: students,
  },
  {
    title: "Adults & Seniors",
    desc: "Focusing on longevity, joint health, and functional strength. Make everyday chores easy and live pain-free.",
    tags: ["Longevity", "Joint Health", "Mobility"],
    img: seniors,
  },
];

export const SCHEDULE = [
  { day: "Monday", short: "Mon", cls: "Boxing" },
  { day: "Tuesday", short: "Tue", cls: "Kickboxing" },
  { day: "Wednesday", short: "Wed", cls: "BJJ & Wrestling" },
  { day: "Thursday", short: "Thu", cls: "Strength & Conditioning" },
  { day: "Friday", short: "Fri", cls: "Sparring Day" },
  { day: "Weekend", short: "Sat–Sun", cls: "Rest & Recovery (Closed)", closed: true },
];

export const TIMES = ["8:00 AM – 9:00 AM", "7:00 PM – 8:00 PM"];
export const AGE_GROUPS = ["Kids", "College Students", "Adults", "Seniors"];
