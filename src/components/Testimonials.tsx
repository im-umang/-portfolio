import { motion } from 'framer-motion';
import { 
  Quote, 
  Star, 
  CheckCircle2, 
  MessageSquareQuote, 
  Sparkles, 
  ExternalLink, 
  Trophy, 
  Briefcase, 
  GraduationCap
} from 'lucide-react';
import { sound } from '@/lib/sound';

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  organization: string;
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
    role: 'Founder & Lead Stylist',
    organization: 'Radhika Studio',
    categoryLabel: 'Client Website',
    categoryIcon: Sparkles,
    badge: 'Live Production • 100% Satisfaction',
    rating: 5,
    quote:
      'Umang turned my vision into an elegant, high-performance portfolio website. He paid incredible attention to modern aesthetics, mobile responsiveness, and booking flows. Communication was prompt throughout, and he delivered ahead of schedule.',
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
    categoryLabel: 'Hackathon Champion',
    categoryIcon: Trophy,
    badge: '1st Place • 24hr Sprint',
    rating: 5,
    quote:
      'Teaming up with Umang for Odoo Combat 2026 was a game-changer. Under intense time constraints, he spearheaded the real-time sensor state engine and UI for GearGuard. His grasp of async architecture and clean components helped our team win 1st place.',
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
    categoryLabel: 'Internship Lead',
    categoryIcon: Briefcase,
    badge: 'Verified Distinction',
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
    categoryLabel: 'Academic Capstone',
    categoryIcon: GraduationCap,
    badge: '9.48 SPI Evaluator',
    rating: 5,
    quote:
      'Umang has consistently stood out in his MCA cohort for architectural discipline in full-stack database modeling and API architecture. His POS and speech AI systems demonstrated industrial-grade code quality far beyond typical coursework.',
    projectContext: 'Full-Stack Architecture & POS System',
    avatarInitials: 'AJ',
    avatarGradient: 'from-emerald-400 to-cyan-500',
    verified: true,
  },
];

const doubled = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];
const reversed = [...TESTIMONIALS].reverse();
const revDbl = [...reversed, ...reversed, ...reversed];

/* ── Single Marquee Review Card ── */
const TestimonialCard = ({ item }: { item: Testimonial }) => {
  const CatIcon = item.categoryIcon;

  return (
    <div
      onClick={() => sound.playClick()}
      className="flex-shrink-0 w-[340px] sm:w-[390px] mx-3 rounded-2xl bg-[#09101f]/85 hover:bg-[#0c162b] border border-white/[0.08] hover:border-cyan-400/40 p-5 sm:p-6 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_36px_rgba(0,189,255,0.12)] flex flex-col justify-between select-none group cursor-pointer"
    >
      <div>
        {/* Top: Category Tag + 5 Stars */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-400/25">
            <CatIcon className="w-3 h-3 text-cyan-400" />
            {item.categoryLabel}
          </span>

          <div className="flex items-center gap-0.5">
            {[...Array(item.rating)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            ))}
          </div>
        </div>

        {/* Quote */}
        <p className="text-white/80 text-xs sm:text-[13px] font-sans font-light leading-relaxed mb-4 italic line-clamp-4 group-hover:text-white/95 transition-colors">
          "{item.quote}"
        </p>
      </div>

      {/* Author Footer */}
      <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`w-9 h-9 rounded-xl bg-gradient-to-br ${item.avatarGradient} flex items-center justify-center font-mono font-bold text-white text-xs shadow-md shrink-0`}
          >
            {item.avatarInitials}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h4 className="text-xs sm:text-sm font-semibold text-white truncate">
                {item.name}
              </h4>
              {item.verified && (
                <CheckCircle2
                  className="w-3.5 h-3.5 text-cyan-400 shrink-0"
                  title="Verified Collaboration"
                />
              )}
            </div>
            <p className="text-[10px] sm:text-[11px] text-white/45 font-mono truncate">
              {item.role} • <span className="text-white/65">{item.organization}</span>
            </p>
          </div>
        </div>

        {item.link && (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.stopPropagation();
              sound.playClick();
            }}
            className="p-1.5 rounded-lg bg-white/[0.03] hover:bg-cyan-500/15 text-white/40 hover:text-cyan-300 border border-white/[0.06] hover:border-cyan-400/30 transition-all cursor-pointer shrink-0"
            title="View project website"
            aria-label="View project website"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </div>
  );
};

export default function Testimonials() {
  return (
    <section id="testimonials" className="pt-20 sm:pt-24 pb-16 sm:pb-20 overflow-hidden relative">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-500/[0.04] rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-10 sm:mb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55 }}
          className="text-center"
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
        </motion.div>
      </div>

      {/* Continuous Marquee Stream (TechStack-style with pause on hover) */}
      <div className="relative w-full overflow-hidden">
        {/* Left & Right Fade Masks */}
        <div className="absolute left-0 inset-y-0 w-20 sm:w-44 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 inset-y-0 w-20 sm:w-44 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Row 1: Leftward Infinite Marquee */}
        <div className="flex animate-marquee hover:[animation-play-state:paused] mb-4">
          {doubled.map((item, i) => (
            <TestimonialCard key={`t1-${item.id}-${i}`} item={item} />
          ))}
        </div>

        {/* Row 2: Rightward Infinite Marquee */}
        <div className="flex animate-marquee-reverse hover:[animation-play-state:paused]">
          {revDbl.map((item, i) => (
            <TestimonialCard key={`t2-${item.id}-${i}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
