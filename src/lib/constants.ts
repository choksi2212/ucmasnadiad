// ============================================================
// SITE CONSTANTS — R D Abacuz Nadiad UCMAS Center
// ============================================================

export const SITE = {
  name: "R D Abacuz Nadiad",
  tagline: "UCMAS Mental Arithmetic Center",
  city: "Nadiad",
  phone: "9375030850",
  phoneDisplay: "+91 93750 30850",
  whatsapp: "919375030850",
  whatsappMessage: "Hi! I'm interested in UCMAS classes for my child at R D Abacuz Nadiad.",
  email: "rdabacuznadiad@gmail.com",
  address: "R D Abacuz — UCMAS Center, Nadiad, Gujarat, India",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14714.82!2d72.8617!3d22.6916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e4e0000000001%3A0x1!2sNadiad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000",
  operatingHours: [
    { day: "Monday – Friday", time: "3:00 PM – 7:00 PM" },
    { day: "Saturday", time: "9:00 AM – 1:00 PM" },
    { day: "Sunday", time: "Closed" },
  ],
  social: {
    instagram: "https://instagram.com/rdabacuznadiad",
    facebook: "https://facebook.com/rdabacuznadiad",
  },
  founded: 2015,
};

export const STATS = [
  { value: 80, suffix: "+", label: "Countries Globally" },
  { value: 6000000, suffix: "+", label: "Students Worldwide", compact: true },
  { value: 200, suffix: "+", label: "Students in Nadiad" },
  { value: new Date().getFullYear() - SITE.founded, suffix: "+", label: "Years of Excellence" },
  { value: 45, suffix: "+", label: "Competition Winners" },
];

export const BENEFITS = [
  {
    icon: "Brain",
    title: "Concentration",
    description:
      "Sustained focus during complex mental calculations trains deep concentration that transfers to academics and daily life.",
    large: true,
  },
  {
    icon: "Zap",
    title: "Speed & Accuracy",
    description:
      "Students routinely solve 10-digit additions in seconds — faster than most adults with a calculator.",
    large: false,
  },
  {
    icon: "BookOpen",
    title: "Memory",
    description:
      "Visualizing and manipulating a mental abacus with 5+ digits builds extraordinary working memory.",
    large: false,
  },
  {
    icon: "Star",
    title: "Confidence",
    description:
      "Mastering a difficult skill and competing on national stages builds unshakeable self-confidence.",
    large: false,
  },
  {
    icon: "Lightbulb",
    title: "Creativity",
    description:
      "Mental arithmetic engages both brain hemispheres, fostering creative thinking alongside logical reasoning.",
    large: false,
  },
  {
    icon: "TrendingUp",
    title: "Academic Performance",
    description:
      "UCMAS students consistently outperform peers in math and science due to enhanced cognitive abilities.",
    large: true,
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

export const PROGRAMS = [
  {
    id: "tiny-tots",
    label: "Tiny Tots",
    ageRange: "Ages 4–6",
    duration: "1–2 Years",
    frequency: "2 hrs / week",
    color: "#FFB800",
    highlights: [
      "Introduction to abacus & numbers",
      "Number recognition and basic counting",
      "Fun, play-based learning approach",
      "Basic addition and subtraction",
      "Building attention span and focus",
    ],
    description:
      "Our foundation program designed for young learners. Through play and interactive exercises, children develop a strong number sense and are introduced to the abacus in an engaging, stress-free environment.",
  },
  {
    id: "regular",
    label: "Regular Program",
    ageRange: "Ages 6–13",
    duration: "2–3 Years",
    frequency: "2 hrs / week",
    color: "#E31837",
    highlights: [
      "Full UCMAS curriculum (8 levels)",
      "Mental arithmetic development",
      "Speed and accuracy training",
      "Competition preparation",
      "Cognitive skill enhancement",
    ],
    description:
      "The core UCMAS curriculum with progressive levels from basic to advanced. Students systematically develop mental arithmetic ability and compete in district, state, and national competitions.",
  },
  {
    id: "competition",
    label: "Competition Track",
    ageRange: "Selected Students",
    duration: "Ongoing",
    frequency: "3+ hrs / week",
    color: "#1B3A6B",
    highlights: [
      "Intensive advanced training",
      "National competition preparation",
      "International competition pathway",
      "Speed drills and timed exercises",
      "Personalized coaching",
    ],
    description:
      "For students who demonstrate exceptional ability. Intensive training for district, state, national, and international UCMAS competitions. Our center has produced multiple national-level winners.",
  },
];

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
      "Sia used to be scared of numbers. Now she loves math and proudly shows off her mental calculations to everyone. The staff at R D Abacuz are warm, patient, and professional.",
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
    q: "What is UCMAS and how does it work?",
    a: "UCMAS (Universal Concept of Mental Arithmetic System) is a brain development program using abacus-based mental arithmetic. Children first learn to calculate using a physical abacus, then gradually develop the ability to visualize the abacus in their mind and perform complex calculations mentally — without any tool.",
  },
  {
    q: "What age group is UCMAS suitable for?",
    a: "UCMAS is most effective for children aged 4 to 13 years. This is the prime window for brain development and learning. We have a specially designed Tiny Tots program for children aged 4–6, and the regular program for ages 6–13.",
  },
  {
    q: "How long is the program?",
    a: "The program consists of 8 levels. Completing all levels typically takes 2–3 years depending on the child's pace and dedication. Children can advance faster if they practice regularly at home.",
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
    a: "We are located in Nadiad, Gujarat. Our classes run Monday to Friday from 3:00 PM to 7:00 PM and Saturday from 9:00 AM to 1:00 PM. Call us at +91 93750 30850 or WhatsApp us to schedule a free demo class.",
  },
];

export const TEACHERS = [
  {
    name: "Sharad Patel",
    role: "Center Director & Head Instructor",
    experience: "10+ Years",
    photo: "/photos/teacher-1.jpg",
    bio: "Sharad Patel is a certified UCMAS instructor with over a decade of experience training children in mental arithmetic. His passion for child development and mathematics has helped hundreds of students unlock their potential.",
  },
  {
    name: "Priya Desai",
    role: "Senior Instructor",
    experience: "6+ Years",
    photo: "/photos/teacher-2.jpg",
    bio: "Priya specializes in working with younger students in the Tiny Tots program. Her patient, nurturing approach makes mathematics fun and accessible for even the youngest learners.",
  },
  {
    name: "Ravi Mehta",
    role: "Competition Coach",
    experience: "5+ Years",
    photo: "/photos/teacher-3.jpg",
    bio: "Ravi leads the advanced competition track, having personally coached students to national-level UCMAS competitions. His structured training methodology produces consistent results.",
  },
];

export const ACHIEVEMENTS = [
  { value: 45, suffix: "+", label: "National Competition Winners" },
  { value: 12, suffix: "+", label: "State Champions" },
  { value: 3, suffix: "", label: "International Participants" },
  { value: 200, suffix: "+", label: "Students Trained" },
];

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Results", href: "#results" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export const WEB3FORMS_KEY = "e9c05c2b-930d-447a-ad28-c6eb44239505";
