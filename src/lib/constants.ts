// ============================================================
// SITE CONSTANTS — R D Abacus Nadiad (UCMAS 2.0)
// ============================================================

import { MEDIA } from "./media";

export const SITE = {
  name: "R D Abacus Nadiad",
  tagline: "UCMAS 2.0, Vedic Maths & holistic programs — Nadiad",
  city: "Nadiad",
  phone: "9375030850",
  phoneDisplay: "+91 93750 30850",
  whatsapp: "919375030850",
  whatsappMessage:
    "Hi! I'm interested in classes at R D Abacus Nadiad (UCMAS / Vedic Maths / other programs).",
  email: "rdabacusnadiad2910@gmail.com",
  address: "R D Abacus — UCMAS Center, Nadiad, Gujarat, India",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2016.7746633938968!2d72.86870470447373!3d22.68709071699184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e5b1eb99c4597%3A0xd57069ef73ff12d3!2sUCMAS!5e0!3m2!1sen!2sin!4v1775918678524!5m2!1sen!2sin",
  operatingHours: [
    { day: "Monday", time: "Closed" },
    { day: "Tuesday – Saturday", time: "4:00 PM – 7:30 PM" },
    { day: "Sunday", time: "9:00 AM – 1:00 PM" },
  ],
  social: {
    instagram:
      "https://www.instagram.com/ucmas2.0._.nadiad?igsh=d2ltM2FkYW9nNHhj&utm_source=qr",
    facebook: "https://www.facebook.com/share/1HyyEDLq4h/?mibextid=wwXIfr",
  },
  /** Year the Nadiad center was established (founders: Kinjal & Sharad Patel). */
  founded: 2004,
  founders: "Kinjal Patel & Sharad Patel",
};

export const STATS = [
  { value: 80, suffix: "+", label: "Countries Globally" },
  { value: 6000000, suffix: "+", label: "Students Worldwide", compact: true },
  { value: 200, suffix: "+", label: "Students in Nadiad" },
  { value: new Date().getFullYear() - SITE.founded, suffix: "+", label: "Years of Excellence" },
  { value: 100, suffix: "+", label: "Competition Winners" },
];

export const BENEFITS = [
  {
    icon: "Focus",
    title: "Concentration",
    description:
      "Sustained attention during fast mental work builds focus that carries into schoolwork and everyday tasks.",
  },
  {
    icon: "Lightbulb",
    title: "Creativity",
    description:
      "Whole-brain training links logic and imagination so children approach problems with fresh ideas.",
  },
  {
    icon: "BookOpen",
    title: "Memory Power",
    description:
      "Visualizing the abacus strengthens working memory — holding and manipulating longer number chains with ease.",
  },
  {
    icon: "Wand2",
    title: "Imagination",
    description:
      "Mental arithmetic depends on vivid inner imagery, nurturing a strong, flexible mind’s eye.",
  },
  {
    icon: "Eye",
    title: "Observation",
    description:
      "Quick, accurate perception of patterns and detail supports faster recall and fewer careless mistakes.",
  },
  {
    icon: "LayoutGrid",
    title: "Application",
    description:
      "Skills transfer beyond drills — children learn to apply structured thinking to new situations.",
  },
  {
    icon: "BrainCircuit",
    title: "Reasoning",
    description:
      "Step-by-step mental calculation strengthens logical reasoning and sound decision-making.",
  },
  {
    icon: "BadgeCheck",
    title: "Self Confidence",
    description:
      "Visible progress and achievements help children trust their ability to tackle hard challenges.",
  },
];

export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Learn the Abacus",
    description:
      "Children start by learning to use a physical abacus — understanding place values and bead movements through hands-on practice.",
  },
  {
    step: "02",
    title: "Build Speed",
    description:
      "Through structured exercises, they develop finger dexterity and calculation speed on the physical abacus.",
  },
  {
    step: "03",
    title: "Visualize Mentally",
    description:
      "The breakthrough: children learn to picture the abacus in their mind, performing calculations without any physical tool.",
  },
  {
    step: "04",
    title: "Excel & Compete",
    description:
      "Students achieve extraordinary mental math speed, compete in national and international competitions, and develop lifelong cognitive skills.",
  },
];

/** UCMAS 2.0 module pathway — FRAM (Foundation · Refine · Ascend · Masters). Replaces legacy FCAM (Foundation · Construction · Advanced · Masters). */
export const PROGRAMS = [
  {
    id: "foundation",
    label: "Foundation",
    levelsInModule: 2,
    frequency: "2 hrs / week",
    framework: "FRAM · UCMAS 2.0",
    color: "#1F6F54",
    highlights: ["Foundation / Basic", "Elementary A"],
    description:
      "The first stage of UCMAS 2.0: children build core abacus skills and number sense. Under the updated FRAM structure, Foundation combines the entry levels that begin every learner’s journey — replacing the old FCAM grouping where Elementary B sat in a different block.",
  },
  {
    id: "refine",
    label: "Refine",
    levelsInModule: 2,
    frequency: "2 hrs / week",
    framework: "FRAM · UCMAS 2.0",
    color: "#C8102E",
    highlights: ["Elementary B", "Intermediate A"],
    description:
      "Refine strengthens technique and speed as students bridge early and middle curriculum steps. This module maps to content that previously sat across FCAM Foundation and Construction — now organized for a clearer progression.",
  },
  {
    id: "ascend",
    label: "Ascend",
    levelsInModule: 3,
    frequency: "2 hrs / week",
    framework: "FRAM · UCMAS 2.0",
    color: "#1B3A6B",
    highlights: ["Intermediate B", "Higher A", "Higher B"],
    description:
      "Ascend pushes mental arithmetic into advanced operations and longer chains. It brings together levels that were spread across FCAM Construction and Advanced under the new FRAM ladder.",
  },
  {
    id: "masters",
    label: "Masters",
    levelsInModule: 3,
    frequency: "2 hrs / week",
    framework: "FRAM · UCMAS 2.0",
    color: "#B8860B",
    highlights: ["Advance", "Grand Level A", "Grand Level B"],
    description:
      "The Masters stage completes the FRAM pathway with the highest curriculum levels — including Advance and Grand levels — preparing dedicated students for competitions and peak mental-math performance.",
  },
];

/** Additional offerings alongside UCMAS — same center, separate tracks / batches. */
export const ENRICHMENT_PROGRAMS = [
  {
    id: "vedic-maths",
    label: "Vedic Maths",
    description:
      "Speed and clarity with Vedic sutras — complementary to school math and ideal for children who enjoy patterns and shortcuts.",
    color: "#1B3A6B",
  },
  {
    id: "phonetics",
    label: "Phonetics",
    description:
      "Sound–letter awareness, blending, and spelling foundations so reading and pronunciation feel natural, not forced.",
    color: "#1F6F54",
  },
  {
    id: "drawing",
    label: "Drawing",
    description:
      "Observation, line, and composition — building fine motor control and creative confidence in a structured, age-appropriate way.",
    color: "#C8102E",
  },
  {
    id: "mid-brain",
    label: "Mid Brain Training",
    description:
      "Sensory and focus-based activities aimed at whole-brain coordination, memory, and concentration habits.",
    color: "#7C3AED",
  },
  {
    id: "handwriting",
    label: "Handwriting",
    description:
      "Posture, grip, and letter formation for neat, readable script — skills that carry into every subject at school.",
    color: "#B8860B",
  },
] as const;

export const TESTIMONIALS = [
  {
    parentName: "Rekha Patel",
    childName: "Aryan",
    childAge: 9,
    quote:
      "Aryan's concentration has improved dramatically since joining UCMAS. His math scores went from average to top of his class within a year. The teachers here are incredibly dedicated.",
    location: "Nadiad",
  },
  {
    parentName: "Suresh Shah",
    childName: "Priya",
    childAge: 8,
    quote:
      "We were skeptical at first, but after 6 months we saw Priya doing 3-digit additions in her head faster than I can type them on a calculator. It's genuinely astonishing.",
    location: "Anand",
  },
  {
    parentName: "Meena Desai",
    childName: "Rohan",
    childAge: 11,
    quote:
      "Rohan competed at the national UCMAS competition last year and won a merit certificate. The confidence that has given him extends far beyond math — he's a different child.",
    location: "Nadiad",
  },
  {
    parentName: "Jignesh Mehta",
    childName: "Sia",
    childAge: 7,
    quote:
      "Sia used to be scared of numbers. Now she loves math and proudly shows off her mental calculations to everyone. The staff at R D Abacus are warm, patient, and professional.",
    location: "Kheda",
  },
  {
    parentName: "Kavitha Rao",
    childName: "Dev",
    childAge: 10,
    quote:
      "Worth every penny. Dev's school teacher called us to ask what we were doing differently because his focus and problem-solving ability had improved so noticeably.",
    location: "Nadiad",
  },
  {
    parentName: "Bhavna Trivedi",
    childName: "Ananya",
    childAge: 8,
    quote:
      "The environment here is wonderful. Ananya actually looks forward to her UCMAS sessions — which is more than I can say for most of her school subjects. Highly recommended.",
    location: "Anand",
  },
];

export const FAQS = [
  {
    q: "What is UCMAS 2.0 and how does FRAM work?",
    a: "UCMAS (Universal Concept of Mental Arithmetic System) is now offered as UCMAS 2.0 with an updated module map called FRAM: Foundation, Refine, Ascend, and Masters. It replaces the older FCAM structure (Foundation, Construction, Advanced, Masters) so levels flow in four clear stages — same proven abacus method, clearer progression. Children learn on the physical abacus first, then visualize it mentally for fast, tool-free calculation.",
  },
  {
    q: "What age group is UCMAS suitable for?",
    a: "UCMAS is most effective for children aged 4 to 13 years — the prime window for brain development. Younger learners usually begin in the Foundation stage of FRAM; progression continues through Refine, Ascend, and Masters as skills grow.",
  },
  {
    q: "How long is the program?",
    a: "The full journey follows the FRAM pathway through Foundation, Refine, Ascend, and Masters. Completing the curriculum typically takes about 2–3 years depending on pace and practice. Regular short practice at home speeds progress.",
  },
  {
    q: "How often are the classes?",
    a: "Classes are held twice a week, with each session lasting approximately one hour. We also encourage 10–15 minutes of daily practice at home for best results.",
  },
  {
    q: "What are the fees?",
    a: "Please contact us directly at +91 93750 30850 for the current fee structure. We offer competitive pricing and believe every child deserves access to quality cognitive development.",
  },
  {
    q: "Will UCMAS help with my child's school math?",
    a: "Absolutely. UCMAS students consistently outperform their peers in mathematics. More importantly, the concentration, memory, and problem-solving skills developed through UCMAS benefit all academic subjects — not just math.",
  },
  {
    q: "What if my child is already struggling with math?",
    a: "UCMAS is not remedial tutoring — it's a cognitive development program. Many children who struggled with school math have thrived in UCMAS because the abacus makes numbers visual and intuitive. The program builds confidence alongside skill.",
  },
  {
    q: "Does my child need any prior math knowledge to join?",
    a: "No prior knowledge is required. We start from absolute basics — number recognition and counting. The only requirement is the right age (4+) and a willingness to learn.",
  },
  {
    q: "Are there competitions? How does that work?",
    a: "Yes! UCMAS holds competitions at the district, state, national, and international levels. Students are assessed by level and age group. Our center has produced multiple competition winners. Participation in competitions is encouraged but not mandatory.",
  },
  {
    q: "Where is the center located and what are the timings?",
    a: "We are located in Nadiad, Gujarat. Class timings are Tuesday to Saturday, 4:00 PM – 7:30 PM, and Sunday, 9:00 AM – 1:00 PM. We are closed on Mondays. Call +91 93750 30850 or WhatsApp us to schedule a free demo or ask about batch availability.",
  },
  {
    q: "Besides UCMAS, what other programs do you offer?",
    a: "At R D Abacus Nadiad we also run Vedic Maths, Phonetics, Drawing, Mid Brain Training, and Handwriting. Timings and batches can vary by program — contact us for the latest schedule and age groups.",
  },
];

export const TEACHERS = [
  {
    name: "Sharad Patel",
    role: "Center Director & Head Instructor",
    experience: "20+ Years",
    photo: MEDIA.staff.sharad,
    bio: "Sharad Patel is a certified UCMAS instructor with decades of experience training children in mental arithmetic. His passion for child development and mathematics has helped hundreds of students unlock their potential.",
  },
  {
    name: "Pinal Patel",
    role: "Senior Instructor",
    experience: "6+ Years",
    photo: MEDIA.staff.pinal,
    bio: "Pinal focuses on Foundation and early FRAM levels of UCMAS 2.0, helping young learners build confidence on the abacus. Her calm, encouraging style makes every child feel supported in class.",
  },
  {
    name: "Falguni Patel",
    role: "Instructor & Competition Coach",
    experience: "5+ Years",
    photo: MEDIA.staff.falguni,
    bio: "Falguni supports students through advanced levels and competition preparation, with clear structure and attention to accuracy. She celebrates progress and keeps learners motivated toward their goals.",
  },
];

/** `galleryKey` maps each stat card to Cloudinary folder `rd-abacus-nadiad/results/<key>/`. */
export const ACHIEVEMENTS = [
  {
    value: 50,
    suffix: "+",
    label: "State Level Winners",
    galleryKey: "state" as const,
  },
  {
    value: 30,
    suffix: "+",
    label: "National Level Winners",
    galleryKey: "national" as const,
  },
  {
    value: 20,
    suffix: "+",
    label: "International Level Winners",
    galleryKey: "international" as const,
  },
  {
    value: 25,
    suffix: "+",
    label: "Other International Competitions",
    galleryKey: "others" as const,
  },
];

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Results", href: "#results" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

