export interface Project {
  slug: string;
  number: string;
  status: string;
  statusType: 'working' | 'live' | 'completed';
  category: 'client' | 'ai' | 'fullstack' | 'hackathon';
  title: string;
  tagline: string;
  description: string;
  image: string;
  tech: string[];
  techBadges: string[];
  liveUrl: string | null;
  githubUrl: string | null;
  overview: string;
  problem: string;
  approach: string;
  features: string[];
  isClientProject?: boolean;
}

export const PROJECTS_DATA: Project[] = [
  {
    slug: 'radhika-portfolio',
    number: '01',
    status: 'CLIENT WORK • LIVE',
    statusType: 'live',
    category: 'client',
    isClientProject: true,
    title: 'Valand Radhika — Digital Architecture & Operations Portfolio',
    tagline: 'High-end portfolio for a BCA graduate & operations specialist with bespoke dark aesthetic, micro-interactions, and live deployment.',
    description: 'Bespoke client portfolio engineered for a BCA graduate & GeM operations specialist, featuring high-converting aesthetics, smooth animations, and zero-latency performance.',
    image: '/radhika-portfolio.png',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vite'],
    techBadges: ['REACT', 'TYPESCRIPT', 'TAILWIND CSS', 'FRAMER MOTION', 'CLIENT PRODUCTION'],
    liveUrl: 'https://radhika-portfolio-iota.vercel.app/',
    githubUrl: 'https://github.com/im-umang/radhika_portfolio',
    overview: 'An end-to-end bespoke digital portfolio engineered for Radhika Valand, showcasing her expertise in Full-Stack Python/Django engineering, Government e-Marketplace (GeM) Portal operations, and enterprise client coordination.',
    problem: 'Standard template sites fail to articulate dual technical and business-operational expertise, often lacking personalized branding, rapid page response, and distinctive modern appeal.',
    approach: 'Conceived and implemented a sleek luxury-dark design system utilizing Plus Jakarta Sans & Syne typography, subtle ambient glows, custom-designed section layouts, and instant Core Web Vitals optimization on Vercel.',
    features: [
      'Custom luxury obsidian & warm champagne color scheme',
      'Fluid interactive showcases for Full-Stack & GeM operations',
      'Optimized performance with 98+ Lighthouse scores and Vite bundle tuning',
      'Interactive project modal views & smooth page transitions',
      'Automated CI/CD pipeline on Vercel with zero downtime'
    ]
  },
  {
    slug: 'speakwise',
    number: '02',
    status: 'LIVE PRODUCTION',
    statusType: 'live',
    category: 'ai',
    title: 'SpeakWise — AI-Powered Language Pronunciation Platform',
    tagline: 'Full-stack language pronunciation practice platform built using React, Node.js, Express and MongoDB.',
    description: 'Full-stack language pronunciation practice platform built using React, Node.js, Express and MongoDB with real-time phonetic analysis.',
    image: '/speakwise.png',
    tech: ['MERN', 'TypeScript', 'Tailwind CSS', 'Radix UI', 'Recharts', 'Vitest', 'Jest'],
    techBadges: ['MERN', 'TYPESCRIPT', 'TAILWIND CSS', 'RADIX UI', 'RECHARTS', 'AI ACOUSTICS'],
    liveUrl: 'https://speakwiseai.vercel.app/',
    githubUrl: 'https://github.com/imjayjoshi/SpeakWise.git',
    overview: 'A comprehensive speech feedback system designed to elevate English pronunciation and fluency using real-time phonetic analysis and interactive training modules.',
    problem: 'Language learners often lack accessible, non-judgmental native-level pronunciation feedback. Private tutoring is expensive, while generic speech tools do not pinpoint specific phoneme mistakes.',
    approach: 'Developed a low-latency audio capture interface connected to speech recognition engines that evaluate phoneme accuracy, sentence cadence, and stress patterns, providing actionable scores and progress visual analytics.',
    features: [
      'Real-time phoneme acoustic scoring',
      'Instant visual waveform and pitch comparison',
      'Personalized curriculum and difficulty scaling',
      'Comprehensive user progress analytics with Recharts',
      'Audio recording playback with mistake pinpointing'
    ]
  },
  {
    slug: 'gearguard',
    number: '03',
    status: 'HACKATHON WINNER',
    statusType: 'completed',
    category: 'hackathon',
    title: 'GearGuard — The Ultimate Maintenance Tracker',
    tagline: 'Role-based asset lifecycle tracking system built solo in a 24-hour hackathon. Real-time equipment scheduling, maintenance alerts, and multi-department admin.',
    description: 'Role-based asset lifecycle tracking system built solo in a 24-hour hackathon. Real-time equipment scheduling, maintenance alerts, and multi-department admin.',
    image: '/gearguard.png',
    tech: ['React', 'Node.js', 'MySQL', 'Material UI'],
    techBadges: ['REACT', 'NODE.JS', 'MYSQL', 'MATERIAL UI', 'HACKATHON WINNER'],
    liveUrl: null,
    githubUrl: 'https://github.com/im-umang/odoo-hackathon-2025.git',
    overview: 'An enterprise asset management and preventive maintenance tracking system designed to eliminate machine downtime and automate repair workflows.',
    problem: 'Industrial facilities face heavy losses from unexpected equipment breakdowns and messy paper-based maintenance logs across multiple departments.',
    approach: 'Engineered a centralized dashboard with automated preventive maintenance schedules, role-based access for technicians and supervisors, and real-time alert dispatching for equipment anomalies.',
    features: [
      'Multi-tier role-based authentication and permissions',
      'Automated preventive maintenance scheduling engine',
      'Real-time breakdown ticketing and resolution tracker',
      'Equipment lifecycle and depreciation calculations',
      'Comprehensive audit logs and inventory spare-parts tracking'
    ]
  },
  {
    slug: 'pos-system',
    number: '04',
    status: 'COMPLETED SYSTEM',
    statusType: 'completed',
    category: 'hackathon',
    title: 'POS & Payment System — Complete Point-of-Sale Solution',
    tagline: 'Full-featured POS with real-time cart, tax computation, UPI & Cash split payments, and advanced sales dashboards.',
    description: 'Full-featured POS with real-time cart, tax computation, UPI & Cash split payments, and advanced sales dashboards built under intense hackathon constraints.',
    image: '/pos-system.png',
    tech: ['React', 'Node.js', 'MySQL', 'Tailwind CSS'],
    techBadges: ['REACT', 'NODE.JS', 'MYSQL', 'TAILWIND CSS', 'FINTECH'],
    liveUrl: null,
    githubUrl: 'https://github.com/imjayjoshi/Odoo-final-POS.git',
    overview: 'A fast, offline-resilient point-of-sale terminal built for modern retail counters, supporting instant checkout and dynamic inventory sync.',
    problem: 'Slow checkout queues and fragmented payment handling create customer friction and operational accounting errors during peak retail rush.',
    approach: 'Designed a keyboard-first, ultra-responsive POS interface with barcode scanner support, split cash/UPI payment handling, and real-time inventory deduction.',
    features: [
      'Sub-second barcode search and rapid cart manipulation',
      'Multi-mode split payments (Cash, Card, QR / UPI)',
      'Automatic GST and tax tier calculation on checkout',
      'Shift-wise cashier cash drawer reconciliation',
      'Daily sales report generation and export'
    ]
  },
  {
    slug: 'vcs-manager',
    number: '05',
    status: 'COMPLETED SYSTEM',
    statusType: 'completed',
    category: 'fullstack',
    title: 'VCS Class Manager — Private Coaching Platform',
    tagline: 'Comprehensive coaching institute system — attendance, grade management, analytics, fee tracking, and multi-role admin panel.',
    description: 'Comprehensive coaching institute administration platform featuring smart attendance, automated fee installment tracking, and exam analytics.',
    image: '/vcs.png',
    tech: ['React', 'Node.js', 'MySQL', 'Tailwind CSS'],
    techBadges: ['REACT', 'NODE.JS', 'MYSQL', 'TAILWIND CSS', 'EDTECH ERP'],
    liveUrl: null,
    githubUrl: 'https://github.com/im-umang/class-management-system.git',
    overview: 'An end-to-end administration platform built for educational academies to manage student admissions, attendance, fees, exams, and teacher workloads.',
    problem: 'Private coaching institutes struggle with dispersed spreadsheets for attendance, fee defaults, student progress tracking, and parent communication.',
    approach: 'Created a unified institute portal with automated fee installment tracking, visual attendance dashboards, and batch-wise performance benchmarking.',
    features: [
      'Smart attendance logging with automated parent alerts',
      'Automated installment fee scheduler and payment receipts',
      'Test series mark entry with percentile scorecards',
      'Batch and course timetable scheduling calendar',
      'Multi-role portals for Admin, Teacher, and Student'
    ]
  },
  {
    slug: 'travel-chatbot',
    number: '06',
    status: 'IN DEVELOPMENT',
    statusType: 'working',
    category: 'ai',
    title: 'AI-Based Real-Time Voice Enabled Travel Planning Chatbot',
    tagline: 'AI-powered voice chatbot designed for real-time travel planning and itinerary generation.',
    description: 'AI-powered voice chatbot designed for real-time travel planning, speech recognition, and dynamic personalized itinerary generation.',
    image: '/travel-chatbot.png',
    tech: ['React', 'Node.js', 'Python'],
    techBadges: ['REACT', 'NODE.JS', 'PYTHON', 'SPEECH AI', 'VOICE RECOGNITION'],
    liveUrl: null,
    githubUrl: 'https://github.com/im-umang',
    overview: 'An intelligent voice-enabled chatbot that helps users plan travel itineraries in real-time using AI-driven recommendations and natural language processing.',
    problem: 'Traditional travel planning requires manually browsing multiple platforms, comparing options, and creating itineraries — a time-consuming process that often misses personalized recommendations.',
    approach: 'Built a real-time speech-to-text pipeline integrated with deep intent analysis models. The backend aggregates destination insights, optimizes routes based on travel preferences, and generates personalized day-by-day schedules with voice feedback.',
    features: [
      'Speech-to-text processing',
      'AI intent understanding',
      'Dynamic travel recommendations',
      'Tourism use cases',
      'Scalable system design'
    ]
  }
];
