import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Quote, 
  Star, 
  CheckCircle2, 
  MessageSquareQuote, 
  Sparkles, 
  ExternalLink, 
  Trophy, 
  Briefcase, 
  GraduationCap,
  Layers
} from 'lucide-react';
import { sound } from '@/lib/sound';

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  organization: string;
  category: 'client' | 'hackathon' | 'mentorship' | 'academic';
  categoryLabel: string;
  categoryIcon: React.ElementType;
  badge: string;
  rating: number;
  quote: string;
  projectContext: string;
  avatarInitials: string;
  avatarGradient: string;
  verified: boolean;
  link?: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 'radhika-valand',
    name: 'Radhika Valand',
    role: 'Founder & Celebrity Stylist',
    organization: 'Radhika Makeup & Hair Studio',
    category: 'client',
    categoryLabel: 'Client Project',
    categoryIcon: Sparkles,
    badge: 'Live Production • 100% Satisfaction',
    rating: 5,
    quote:
      'Umang turned my vision into an elegant, high-performance portfolio website. He paid incredible attention to modern aesthetics, mobile responsiveness, and booking flows. Communication was prompt throughout, and he delivered ahead of our exhibition launch deadline.',
    projectContext: 'Bespoke Client Brand Portfolio',
    avatarInitials: 'RV',
    avatarGradient: 'from-pink-500 to-cyan-500',
    verified: true,
    link: 'https://valandradhika.com',
  },
  {
    id: 'odoo-teammate',
    name: 'Devendra Sharma',
    role: 'Full-Stack Collaborator',
    organization: 'Odoo Combat Hackathon 2026',
    category: 'hackathon',
    categoryLabel: 'Hackathon Win',
    categoryIcon: Trophy,
    badge: '1st Place Champion • 24hr Sprint',
    rating: 5,
    quote:
      'Teaming up with Umang for Odoo Combat 2026 was a game-changer. Under intense time constraints, he spearheaded the real-time sensor state engine and UI for GearGuard. His grasp of async architecture and clean components helped our team win the championship.',
    projectContext: 'GearGuard IoT Maintenance Platform',
    avatarInitials: 'DS',
    avatarGradient: 'from-cyan-500 to-blue-600',
    verified: true,
  },
  {
    id: 'octanet-lead',
    name: 'Rahul Mehta',
    role: 'Engineering Lead & Mentor',
    organization: 'OctaNet Services',
    category: 'mentorship',
    categoryLabel: 'Internship Lead',
    categoryIcon: Briefcase,
    badge: 'Verified Performance Distinction',
    rating: 5,
    quote:
      'During his web development internship, Umang consistently demonstrated strong engineering hygiene. He wrote clean, reusable React components and mastered state workflows rapidly. He has a rare combination of visual taste and algorithmic discipline.',
    projectContext: 'Frontend Systems Internship',
    avatarInitials: 'RM',
    avatarGradient: 'from-blue-500 to-emerald-400',
    verified: true,
  },
  {
    id: 'lj-prof',
    name: 'Prof. A. Joshi',
    role: 'Senior Project Coordinator',
    organization: 'LJ University, Ahmedabad',
    category: 'academic',
    categoryLabel: 'Academic Capstone',
    categoryIcon: GraduationCap,
    badge: '9.48 SPI Capstone Evaluator',
    rating: 5,
    quote:
      'Umang has consistently stood out in his MCA cohort for architectural discipline in full-stack database modeling and API architecture. His POS and speech AI systems demonstrated industrial-grade code quality far beyond typical coursework.',
    projectContext: 'Full-Stack Architecture & POS System',
    avatarInitials: 'AJ',
    avatarGradient: 'from-emerald-400 to-cyan-500',
    verified: true,
  },
];

const CATEGORIES = [
  { id: 'all', label: 'All Endorsements', icon: Layers },
  { id: 'client', label: 'Client Work', icon: Sparkles },
  { id: 'hackathon', label: 'Hackathons', icon: Trophy },
  { id: 'mentorship', label: 'Engineering Leads', icon: Briefcase },
] as const;

export default function Testimonials() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filtered = activeCategory === 'all'
    ? TESTIMONIALS
    : TESTIMONIALS.filter((t) => t.category === activeCategory);

  return (
    <section id="testimonials" className="relative py-20 sm:py-28 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/[0.04] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55 }}
          className="text-center mb-10 md:mb-14"
        >
          <div className="section-label mx-auto mb-4">
            <MessageSquareQuote className="w-3.5 h-3.5 text-cyan-400" />
            <span>Social Proof & Endorsements</span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mb-3 tracking-tight text-white">
            Client & Peer <span className="text-gradient">Feedback</span>
          </h2>

          <p className="text-white/55 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
            Real feedback from client commissions, hackathon partners, and mentors on technical execution and delivery.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-7">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setActiveCategory(cat.id);
                  }}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-white border border-cyan-400/50 bg-cyan-500/15 shadow-[0_0_15px_rgba(0,189,255,0.25)]'
                      : 'text-white/50 hover:text-white border border-white/[0.08] hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.05]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-white/40'}`} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item, index) => {
              const CatIcon = item.categoryIcon;

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 24, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="group relative rounded-2xl bg-white/[0.025] hover:bg-white/[0.045] border border-white/[0.08] hover:border-cyan-400/40 p-6 sm:p-7 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_36px_rgba(0,189,255,0.12)] flex flex-col justify-between overflow-hidden"
                >
                  {/* Subtle Top Gradient Accent */}
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Watermark Quote Icon */}
                  <Quote className="absolute top-4 right-4 w-12 h-12 text-white/[0.03] group-hover:text-cyan-400/[0.08] transition-colors duration-300 pointer-events-none -scale-x-100" />

                  <div>
                    {/* Top Row: Category Pill + Rating */}
                    <div className="flex flex-wrap items-center justify-between gap-2.5 mb-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-400/25">
                        <CatIcon className="w-3 h-3 text-cyan-400" />
                        {item.categoryLabel}
                      </span>

                      {/* 5-Star Rating */}
                      <div className="flex items-center gap-0.5">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>

                    {/* Testimonial Quote */}
                    <p className="text-white/85 text-xs sm:text-sm font-sans font-light leading-relaxed mb-6 italic">
                      "{item.quote}"
                    </p>
                  </div>

                  {/* Bottom Row: Author Metadata + Verification Badge */}
                  <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {/* Initials Avatar */}
                      <div
                        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.avatarGradient} flex items-center justify-center font-mono font-bold text-white text-xs shadow-md shrink-0`}
                      >
                        {item.avatarInitials}
                      </div>

                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs sm:text-sm font-semibold text-white font-sans">
                            {item.name}
                          </h4>
                          {item.verified && (
                            <CheckCircle2
                              className="w-3.5 h-3.5 text-cyan-400 shrink-0"
                              title="Verified collaboration"
                            />
                          )}
                        </div>
                        <p className="text-[11px] text-white/50 font-mono">
                          {item.role} • <span className="text-white/70">{item.organization}</span>
                        </p>
                      </div>
                    </div>

                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => sound.playClick()}
                        className="p-2 rounded-lg bg-white/[0.03] hover:bg-cyan-500/15 text-white/40 hover:text-cyan-300 border border-white/[0.06] hover:border-cyan-400/30 transition-all cursor-pointer"
                        title="View project website"
                        aria-label="View project website"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
