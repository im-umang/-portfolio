export type ProjectCategory = 'client' | 'ai' | 'fullstack' | 'academic';

export interface Project {
  slug: string;
  number: string;
  status: string;
  statusType: 'working' | 'live' | 'completed';
  category: ProjectCategory;
  categories: ProjectCategory[];
  categoryLabel: string;
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
  solution: string;
  architecture?: string;
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
    categories: ['client', 'fullstack'],
    categoryLabel: 'Client Project',
    isClientProject: true,
    title: 'Valand Radhika — Digital Architecture & Operations Portfolio',
    tagline: 'High-end portfolio for a BCA graduate & operations specialist with bespoke dark aesthetic, micro-interactions, and live deployment.',
    description: 'Bespoke client portfolio engineered for a BCA graduate & GeM operations specialist, featuring high-converting aesthetics, smooth animations, and zero-latency performance.',
    image: '/radhika-portfolio.png',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vite'],
    techBadges: ['REACT', 'TYPESCRIPT', 'TAILWIND CSS', 'FRAMER MOTION', 'CLIENT PRODUCTION'],
    liveUrl: 'https://radhika-portfolio-iota.vercel.app/',
    githubUrl: 'https://github.com/im-umang/radhika_portfolio',
    overview: 'An end-to-end bespoke digital portfolio engineered for Radhika Valand, showcasing her dual expertise in Full-Stack Python/Django engineering, Government e-Marketplace (GeM) Portal operations, and enterprise client coordination.',
    problem: 'Standard resume templates failed to articulate dual technical and business-operational expertise, lacking distinctive branding, immediate page response, and the visual authority needed for enterprise contracting.',
    solution: 'Designed and deployed a sleek obsidian & warm champagne design system utilizing Plus Jakarta Sans & Syne typography, subtle ambient glows, custom-designed section layouts, and automated CI/CD with sub-second LCP on Vercel.',
    architecture: 'Component-driven Vite application structured around reactive viewports, lazy-loaded sections, and hardware-accelerated Framer Motion transitions with automated Vercel edge deployment.',
    features: [
      'Custom luxury obsidian & warm champagne design tokens',
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
    categories: ['ai', 'fullstack'],
    categoryLabel: 'AI & Web Apps',
    title: 'SpeakWise — AI-Powered Language Pronunciation Platform',
    tagline: 'Full-stack language pronunciation practice platform built using React, Node.js, Express and MongoDB.',
    description: 'Full-stack language pronunciation practice platform built using React, Node.js, Express and MongoDB with real-time phonetic analysis and interactive training modules.',
    image: '/speakwise.png',
    tech: ['MERN', 'TypeScript', 'Tailwind CSS', 'Radix UI', 'Recharts', 'Speech AI'],
    techBadges: ['MERN', 'TYPESCRIPT', 'TAILWIND CSS', 'RADIX UI', 'RECHARTS', 'AI ACOUSTICS'],
    liveUrl: 'https://speakwiseai.vercel.app/',
    githubUrl: 'https://github.com/imjayjoshi/SpeakWise.git',
    overview: 'A comprehensive speech feedback system designed to elevate English pronunciation and fluency using real-time phonetic analysis and interactive acoustic training modules.',
    problem: 'Language learners often lack accessible, non-judgmental native-level pronunciation feedback. Private tutoring is prohibitively expensive, while standard speech tools evaluate entire phrases without pinpointing phonemic mistakes.',
    solution: 'Engineered a low-latency audio capture interface connected to speech recognition engines that evaluate phoneme accuracy, sentence cadence, and stress patterns, providing actionable scores and progress visual analytics.',
    architecture: 'Web Audio API client pipeline capturing raw PCM streams, coupled with Node.js/Express audio processing microservices and MongoDB persistent user training telemetry visualized via Recharts.',
    features: [
      'Real-time phoneme acoustic scoring and waveform visualization',
      'Instant visual waveform and pitch comparison against native speakers',
      'Personalized curriculum and dynamic difficulty scaling',
      'Comprehensive user progress analytics dashboard with Recharts',
      'Audio recording playback with precise mistake pinpointing'
    ]
  },
  {
    slug: 'travel-chatbot',
    number: '03',
    status: 'IN DEVELOPMENT',
    statusType: 'working',
    category: 'ai',
    categories: ['ai', 'fullstack'],
    categoryLabel: 'AI & Web Apps',
    title: 'AI-Based Real-Time Voice Enabled Travel Planning Chatbot',
    tagline: 'AI-powered voice chatbot designed for real-time travel planning, speech recognition, and itinerary generation.',
    description: 'AI-powered voice chatbot designed for real-time travel planning, natural speech recognition, and dynamic personalized itinerary generation.',
    image: '/travel-chatbot.png',
    tech: ['React', 'Node.js', 'Python', 'Speech Recognition', 'NLP'],
    techBadges: ['REACT', 'NODE.JS', 'PYTHON', 'SPEECH AI', 'VOICE RECOGNITION'],
    liveUrl: null,
    githubUrl: 'https://github.com/im-umang',
    overview: 'An intelligent voice-enabled chatbot that helps travelers plan complex multi-destination itineraries in real time using AI-driven recommendations and natural language speech processing.',
    problem: 'Traditional travel planning requires manually browsing dozens of platforms, comparing hotels and flights, and creating spreadsheets — a fragmented process that fails to understand conversational nuances.',
    solution: 'Built a real-time speech-to-text pipeline integrated with deep intent analysis models. The backend aggregates destination insights, optimizes routes based on travel preferences, and generates personalized day-by-day schedules with voice feedback.',
    architecture: 'Python-driven NLP pipeline with SpeechRecognition & pyttsx3, bridged through REST endpoints to a React interactive itinerary canvas.',
    features: [
      'Bidirectional speech-to-text and text-to-speech processing',
      'Context-aware AI intent understanding for multi-city routes',
      'Dynamic budget-aware travel and stay recommendations',
      'Interactive voice feedback with conversational memory',
      'Scalable Python/Node.js microservices architecture'
    ]
  },
  {
    slug: 'vcs-manager',
    number: '04',
    status: 'COMPLETED SYSTEM',
    statusType: 'completed',
    category: 'fullstack',
    categories: ['fullstack'],
    categoryLabel: 'Full-Stack',
    title: 'VCS Class Manager — Private Coaching Platform',
    tagline: 'Comprehensive coaching institute system — attendance, grade management, analytics, fee tracking, and multi-role admin panel.',
    description: 'Comprehensive coaching institute administration platform featuring smart attendance, automated fee installment tracking, and exam analytics.',
    image: '/vcs.png',
    tech: ['React', 'Node.js', 'MySQL', 'Tailwind CSS', 'Express'],
    techBadges: ['REACT', 'NODE.JS', 'MYSQL', 'TAILWIND CSS', 'EDTECH ERP'],
    liveUrl: null,
    githubUrl: 'https://github.com/im-umang/class-management-system.git',
    overview: 'An end-to-end administration platform built for educational academies to manage student admissions, attendance, fees, exams, and teacher workloads.',
    problem: 'Private coaching institutes struggle with dispersed spreadsheets for attendance, fee defaults, student progress tracking, and parent communication, leading to administrative overhead and revenue leakage.',
    solution: 'Created a unified institute portal with automated fee installment tracking, visual attendance dashboards, batch-wise performance benchmarking, and automated parent notifications.',
    architecture: 'Relational MySQL database with normalized schemas for multi-tenant batch management, Express REST API with JWT role-based access control, and modular React dashboard UI.',
    features: [
      'Smart attendance logging with automated parent alerts',
      'Automated installment fee scheduler and payment receipt generation',
      'Test series mark entry with percentile scorecards and charts',
      'Batch and course timetable scheduling calendar',
      'Multi-role secure portals for Admin, Teacher, and Student'
    ]
  },
  {
    slug: 'pos-system',
    number: '05',
    status: 'COMPLETED SYSTEM',
    statusType: 'completed',
    category: 'fullstack',
    categories: ['fullstack'],
    categoryLabel: 'Full-Stack',
    title: 'POS & Payment System — Complete Point-of-Sale Solution',
    tagline: 'Full-featured POS with real-time cart, tax computation, UPI & Cash split payments, and advanced sales dashboards.',
    description: 'Full-featured POS with real-time cart, tax computation, UPI & Cash split payments, and advanced sales dashboards built for retail operations.',
    image: '/pos-system.png',
    tech: ['React', 'Node.js', 'MySQL', 'Tailwind CSS'],
    techBadges: ['REACT', 'NODE.JS', 'MYSQL', 'TAILWIND CSS', 'FINTECH'],
    liveUrl: null,
    githubUrl: 'https://github.com/imjayjoshi/Odoo-final-POS.git',
    overview: 'A fast, offline-resilient point-of-sale terminal built for modern retail counters, supporting instant checkout, split payments, and dynamic inventory synchronization.',
    problem: 'Slow checkout queues and fragmented payment handling create customer friction and operational accounting errors during peak retail rush hours.',
    solution: 'Designed a keyboard-first, ultra-responsive POS interface with barcode scanner support, split cash/UPI payment handling, dynamic tax calculation, and real-time inventory deduction.',
    architecture: 'Optimized React client with keyboard shortcut listeners and sub-second barcode indexing, interfacing with MySQL transactions to guarantee zero inventory discrepancies.',
    features: [
      'Sub-second barcode search and rapid cart manipulation',
      'Multi-mode split payments (Cash, Card, QR / UPI)',
      'Automatic GST and tax tier calculation on checkout',
      'Shift-wise cashier cash drawer reconciliation',
      'Daily sales report generation and automated export'
    ]
  },
  {
    slug: 'gearguard',
    number: '06',
    status: 'HACKATHON WINNER',
    statusType: 'completed',
    category: 'academic',
    categories: ['academic', 'fullstack'],
    categoryLabel: 'Academic',
    title: 'GearGuard — The Ultimate Maintenance Tracker',
    tagline: 'Role-based asset lifecycle tracking system built solo in a 24-hour hackathon. Real-time equipment scheduling, maintenance alerts, and multi-department admin.',
    description: 'Role-based asset lifecycle tracking system built solo in a 24-hour hackathon at Adani University & Odoo. Real-time equipment scheduling, maintenance alerts, and multi-department admin.',
    image: '/gearguard.png',
    tech: ['React', 'Node.js', 'MySQL', 'Material UI'],
    techBadges: ['REACT', 'NODE.JS', 'MYSQL', 'MATERIAL UI', 'HACKATHON WINNER'],
    liveUrl: null,
    githubUrl: 'https://github.com/im-umang/odoo-hackathon-2025.git',
    overview: 'An enterprise asset management and preventive maintenance tracking system designed to eliminate machine downtime and automate industrial repair workflows.',
    problem: 'Industrial and educational facilities face severe losses from unexpected equipment breakdowns and disordered paper-based maintenance logs across disparate departments.',
    solution: 'Engineered a centralized dashboard with automated preventive maintenance schedules, role-based access for technicians and supervisors, and real-time alert dispatching for equipment anomalies.',
    architecture: 'Full-stack Node.js/Express service coupled with MySQL relational triggers for preventive maintenance countdowns, rendered through high-contrast Material UI components.',
    features: [
      'Multi-tier role-based authentication and permissions',
      'Automated preventive maintenance scheduling engine',
      'Real-time breakdown ticketing and resolution tracker',
      'Equipment lifecycle and depreciation calculations',
      'Comprehensive audit logs and inventory spare-parts tracking'
    ]
  }
];
