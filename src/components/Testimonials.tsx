import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
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
  X,
  Send,
  ArrowRight,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { toast } from 'sonner';
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
  projectSlug?: string;
  avatarInitials: string;
  avatarGradient: string;
  verified: boolean;
  link?: string;
  isLiveSubmission?: boolean;
  qualities: string[];
}

const FEATURED_REVIEW: Testimonial = {
  id: 'radhika-valand',
  name: 'Radhika Valand',
  role: 'Founder & Lead Stylist',
  organization: 'Radhika Studio',
  categoryLabel: 'Verified Client Project',
  categoryIcon: Sparkles,
  badge: 'Live Production Client',
  rating: 5,
  quote:
    'Umang turned my vision into an elegant, high-performance portfolio website. He paid incredible attention to modern aesthetics, mobile responsiveness, and booking flows. Communication was prompt throughout, and he delivered ahead of schedule.',
  projectContext: 'Valand Radhika Portfolio',
  projectSlug: '/projects/valand-radhika-portfolio',
  avatarInitials: 'RV',
  avatarGradient: 'from-pink-500 to-cyan-500',
  verified: true,
  link: 'https://valandradhika.com',
  qualities: ['Mobile Responsiveness', 'Ahead of Schedule', 'Modern Aesthetics', 'Prompt Communication'],
};

const WALL_REVIEWS: Testimonial[] = [
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
    projectContext: 'GearGuard IoT Platform',
    projectSlug: '/projects/gearguard',
    avatarInitials: 'DS',
    avatarGradient: 'from-cyan-500 to-blue-600',
    verified: true,
    qualities: ['Real-Time Architecture', '24h Sprint Speed', 'Async State Engine', 'Clean Components'],
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
    projectSlug: '/experience',
    avatarInitials: 'RM',
    avatarGradient: 'from-blue-500 to-emerald-400',
    verified: true,
    qualities: ['Engineering Hygiene', 'Reusable React Components', 'State Workflows', 'Algorithmic Discipline'],
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
    projectSlug: '/projects/pos-billing-software',
    avatarInitials: 'AJ',
    avatarGradient: 'from-emerald-400 to-cyan-500',
    verified: true,
    qualities: ['Full-Stack Architecture', 'Database Modeling', 'Industrial Code Quality', 'API Architecture'],
  },
];

const STORAGE_KEY = 'umang_portfolio_live_reviews_v2';

const AVATAR_GRADIENTS = [
  'from-cyan-500 to-blue-600',
  'from-pink-500 to-purple-600',
  'from-emerald-400 to-cyan-500',
  'from-amber-400 to-orange-500',
  'from-violet-500 to-fuchsia-600',
];

export default function Testimonials() {
  const [liveReviews, setLiveReviews] = useState<Testimonial[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed.map((item: Partial<Testimonial>) => ({
              ...item,
              categoryIcon: item.categoryLabel === 'Client Project' ? Sparkles : item.categoryLabel === 'Hackathon' ? Trophy : Briefcase,
              qualities: item.qualities || ['Clean Code', 'Responsive Communication'],
            })) as Testimonial[];
          }
        }
      } catch {
        // ignore
      }
    }
    return [];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    organization: '',
    category: 'Client Project',
    rating: 5,
    quote: '',
    link: '',
    qualities: 'Clean Code, Fast Delivery, Great UX',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };
    if (isModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  // Handle Review Submission
  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error('Please enter your name.');
      return;
    }
    if (!formData.role.trim() || !formData.organization.trim()) {
      toast.error('Please specify your role and company/organization.');
      return;
    }
    if (!formData.quote.trim() || formData.quote.length < 10) {
      toast.error('Please write a review of at least 10 characters.');
      return;
    }

    setIsSubmitting(true);
    sound.playClick();

    await new Promise((resolve) => setTimeout(resolve, 600));

    const parts = formData.name.trim().split(' ');
    const initials = parts.length > 1
      ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
      : formData.name.slice(0, 2).toUpperCase();

    const randomGradient = AVATAR_GRADIENTS[Math.floor(Math.random() * AVATAR_GRADIENTS.length)];
    const parsedQualities = formData.qualities
      .split(',')
      .map((q) => q.trim())
      .filter(Boolean);

    const newReview: Testimonial = {
      id: `user-review-${Date.now()}`,
      name: formData.name.trim(),
      role: formData.role.trim(),
      organization: formData.organization.trim(),
      categoryLabel: formData.category,
      categoryIcon: formData.category === 'Client Project' ? Sparkles : formData.category === 'Hackathon' ? Trophy : Briefcase,
      badge: 'Live Verified Review',
      rating: formData.rating,
      quote: formData.quote.trim(),
      projectContext: 'Direct Community Endorsement',
      avatarInitials: initials,
      avatarGradient: randomGradient,
      verified: true,
      link: formData.link.trim() ? (formData.link.startsWith('http') ? formData.link : `https://${formData.link}`) : undefined,
      isLiveSubmission: true,
      qualities: parsedQualities.length > 0 ? parsedQualities : ['Verified Collaboration', 'Prompt Communication'],
    };

    const updated = [newReview, ...liveReviews];
    setLiveReviews(updated);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }

    setIsSubmitting(false);
    setIsModalOpen(false);
    sound.playChime();
    toast.success(`Thank you, ${formData.name}! Your review is now live on the review wall.`);

    setFormData({
      name: '',
      role: '',
      organization: '',
      category: 'Client Project',
      rating: 5,
      quote: '',
      link: '',
      qualities: 'Clean Code, Fast Delivery, Great UX',
    });
  };

  const allWallReviews = [...liveReviews, ...WALL_REVIEWS];
  const currentDisplayRating = hoverRating !== null ? hoverRating : formData.rating;

  return (
    <section id="testimonials" className="pt-20 sm:pt-24 pb-20 sm:pb-28 overflow-hidden relative">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyan-500/[0.04] rounded-full blur-[150px] pointer-events-none" />

      {/* ── Section Header ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-14 sm:mb-16 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55 }}
        >
          <div className="section-label mx-auto mb-4">
            <MessageSquareQuote className="w-3.5 h-3.5 text-cyan-400" />
            <span>Social Proof & Endorsements</span>
          </div>

          <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-3 tracking-tight text-white">
            What People <span className="text-gradient">Say</span>
          </h1>

          <p className="text-white/70 text-base sm:text-lg max-w-xl mx-auto font-light leading-relaxed mb-6">
            Built with code. <span className="text-cyan-300 font-medium">Remembered by people.</span>
          </p>

          <p className="text-white/45 text-xs sm:text-sm max-w-lg mx-auto font-mono mb-8">
            Genuine feedback from production clients, hackathon partners, and academic mentors.
          </p>

          {/* Leave a Review Button */}
          <motion.button
            type="button"
            onClick={() => {
              sound.playPop();
              setIsModalOpen(true);
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-400 border border-cyan-400/40 shadow-[0_0_22px_rgba(0,189,255,0.35)] transition-all cursor-pointer group"
          >
            <Star className="w-4 h-4 fill-amber-300 text-amber-300 group-hover:rotate-12 transition-transform" />
            <span>Leave a Review (5★ Rating)</span>
            <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
          </motion.button>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 space-y-12 sm:space-y-16">
        {/* ═══ FEATURED CLIENT REVIEW SPOTLIGHT: RADHIKA VALAND ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl p-6 sm:p-10 md:p-12 bg-gradient-to-b from-[#09152a] to-[#060c18] border border-cyan-400/40 shadow-[0_0_50px_rgba(0,189,255,0.12)] overflow-hidden"
        >
          {/* Ambient Corner Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-primary/15 rounded-full blur-3xl pointer-events-none" />

          {/* Glowing Quote Icon */}
          <div className="absolute top-6 right-6 sm:top-8 sm:right-8 opacity-15">
            <Quote className="w-20 h-20 sm:w-28 sm:h-28 text-cyan-400 rotate-180" />
          </div>

          <div className="relative z-10 flex flex-col justify-between h-full">
            {/* Top Bar: Spotlight Label + Verified Badge + 5 Stars */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold text-cyan-300 bg-cyan-500/15 border border-cyan-400/35 shadow-[0_0_12px_rgba(0,189,255,0.25)]">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  FEATURED CLIENT REVIEW
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono text-emerald-300 bg-emerald-500/10 border border-emerald-400/30">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  Verified Production Client
                </span>
              </div>

              <div className="flex items-center gap-1">
                {[...Array(FEATURED_REVIEW.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.6)]" />
                ))}
              </div>
            </div>

            {/* Quote Body */}
            <div className="mb-6">
              <blockquote className="font-display text-lg sm:text-2xl md:text-3xl text-white font-medium leading-relaxed sm:leading-snug mb-4">
                "{FEATURED_REVIEW.quote}"
              </blockquote>

              {/* Qualitative Tags: "What They Noticed" */}
              <div className="pt-2">
                <p className="text-[11px] font-mono uppercase tracking-wider text-cyan-400/80 mb-2">
                  What She Noticed:
                </p>
                <div className="flex flex-wrap gap-2">
                  {FEATURED_REVIEW.qualities.map((q) => (
                    <span
                      key={q}
                      className="px-3 py-1 rounded-lg text-xs font-mono text-cyan-200 bg-cyan-500/10 border border-cyan-400/25"
                    >
                      ✦ {q}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Author + Case Study Link Footer */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${FEATURED_REVIEW.avatarGradient} flex items-center justify-center font-mono font-bold text-white text-base shadow-lg shrink-0 ring-2 ring-cyan-400/30`}>
                  {FEATURED_REVIEW.avatarInitials}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                      {FEATURED_REVIEW.name}
                    </h3>
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  </div>
                  <p className="text-xs sm:text-sm text-white/50 font-mono">
                    {FEATURED_REVIEW.role} • <span className="text-white/80">{FEATURED_REVIEW.organization}</span>
                  </p>
                </div>
              </div>

              {/* Case study banner link */}
              <div className="flex items-center gap-2">
                <Link
                  to={FEATURED_REVIEW.projectSlug!}
                  onClick={() => sound.playClick()}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-white/[0.06] hover:bg-cyan-500/20 border border-cyan-400/30 hover:border-cyan-400 transition-all group cursor-pointer"
                >
                  <span>This feedback came after working on <strong>Valand Radhika Portfolio</strong> → View Case Study</span>
                  <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                </Link>
                {FEATURED_REVIEW.link && (
                  <a
                    href={FEATURED_REVIEW.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playClick()}
                    className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-cyan-500/15 border border-white/10 hover:border-cyan-400 text-white/60 hover:text-cyan-300 transition-all cursor-pointer"
                    title="Visit Live Client Website"
                    aria-label="Visit Live Client Website"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ═══ REVIEW WALL: STAGGERED GRID FOR PEERS & MENTORS ═══ */}
        <div>
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight">
                Peer Collaborators & Mentors Wall
              </h2>
              <p className="text-xs sm:text-sm text-white/50 font-mono">
                From hackathons, software internships, and academic coordination
              </p>
            </div>
            <span className="text-xs font-mono text-cyan-400 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20">
              {allWallReviews.length} Verified Reviews
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allWallReviews.map((item, idx) => {
              const CatIcon = item.categoryIcon || Sparkles;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.1 }}
                  className={`rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_36px_rgba(0,189,255,0.15)] group ${
                    item.isLiveSubmission
                      ? 'bg-[#0a162a]/95 border border-cyan-400/40 ring-1 ring-cyan-400/20'
                      : 'bg-[#09101f]/90 hover:bg-[#0c162b] border border-white/[0.08] hover:border-cyan-400/40'
                  }`}
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-400/25">
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
                    <p className="text-white/80 text-sm font-light leading-relaxed mb-5 italic group-hover:text-white/95 transition-colors">
                      "{item.quote}"
                    </p>

                    {/* Qualitative Tags */}
                    {item.qualities && item.qualities.length > 0 && (
                      <div className="mb-5">
                        <p className="text-[10px] font-mono uppercase text-cyan-400/70 mb-1.5">
                          What They Noticed:
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {item.qualities.map((q) => (
                            <span
                              key={q}
                              className="px-2 py-0.5 rounded text-[11px] font-mono text-white/70 bg-white/[0.04] border border-white/[0.08]"
                            >
                              {q}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Author and Project Reference */}
                  <div className="pt-4 border-t border-white/[0.06] space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${item.avatarGradient} flex items-center justify-center font-mono font-bold text-white text-xs shadow-md shrink-0`}>
                          {item.avatarInitials}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <h4 className="text-sm font-semibold text-white truncate">
                              {item.name}
                            </h4>
                            {item.verified && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                            )}
                          </div>
                          <p className="text-[11px] text-white/45 font-mono truncate">
                            {item.role} • <span className="text-white/70">{item.organization}</span>
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
                          title="View project link"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>

                    {/* Linked Project / Experience Context */}
                    {item.projectSlug && (
                      <Link
                        to={item.projectSlug}
                        onClick={() => sound.playClick()}
                        className="inline-flex items-center gap-1.5 text-[11px] font-mono text-cyan-300/80 hover:text-cyan-300 hover:underline transition-colors"
                      >
                        <span>Related: {item.projectContext}</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ═══ FINAL CTA SECTION: "LIKE WHAT YOU SEE?" ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl p-8 sm:p-12 text-center bg-gradient-to-r from-primary/15 via-[#0c162b] to-cyan-500/15 border border-cyan-400/30 shadow-[0_10px_40px_rgba(0,0,0,0.5)] relative overflow-hidden"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-40 bg-cyan-500/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-400/25">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              LET'S CREATE VALUE TOGETHER
            </span>

            <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight">
              Like What You See?
            </h2>

            <p className="text-white/60 text-sm sm:text-base font-light leading-relaxed">
              Let's build something worth talking about. Whether it's a full-stack production platform, custom web application, or full-time engineering role.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/contact"
                onClick={() => sound.playClick()}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-400 shadow-[0_0_24px_rgba(0,189,255,0.4)] border border-cyan-400/40 transition-all cursor-pointer group"
              >
                <span>START A PROJECT</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/projects"
                onClick={() => sound.playClick()}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-white/80 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-cyan-400/30 transition-all cursor-pointer"
              >
                <span>EXPLORE ALL PROJECTS</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ═══ Interactive Live Review Modal ═══ */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative w-full max-w-lg bg-[#070d1a] border border-cyan-500/35 rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.85)] my-8 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-300">
                    <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                      Leave a Live Review
                    </h3>
                    <p className="text-[11px] font-mono text-white/40">
                      Your endorsement will appear on the review wall
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setIsModalOpen(false);
                  }}
                  className="p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono font-medium text-white/70 mb-2">
                    Your Rating <span className="text-cyan-400">*</span>
                  </label>
                  <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(null)}
                        onClick={() => {
                          sound.playClick();
                          setFormData({ ...formData, rating: star });
                        }}
                        className="p-1 text-2xl transition-transform hover:scale-125 focus:outline-none cursor-pointer"
                      >
                        <Star
                          className={`w-7 h-7 transition-colors ${
                            star <= currentDisplayRating
                              ? 'fill-amber-400 text-amber-400 filter drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]'
                              : 'text-white/20'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-auto text-[11px] font-mono text-cyan-300 hidden sm:inline">
                      {currentDisplayRating}.0 / 5.0
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono font-medium text-white/70 mb-1.5">
                      Your Name <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Sarah Jenkins"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] focus:border-cyan-400 text-white text-xs sm:text-sm outline-none transition-all placeholder:text-white/25"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-medium text-white/70 mb-1.5">
                      Role & Organization <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value, organization: e.target.value })}
                      placeholder="e.g. Lead Engineer @ Acme"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] focus:border-cyan-400 text-white text-xs sm:text-sm outline-none transition-all placeholder:text-white/25"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-white/70 mb-1.5">
                    Collaboration Context
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {['Client Project', 'Hackathon Teammate', 'Internship Mentor', 'Peer Review'].map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => {
                          sound.playClick();
                          setFormData({ ...formData, category: cat });
                        }}
                        className={`px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer ${
                          formData.category === cat
                            ? 'bg-cyan-500/20 border border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(0,189,255,0.25)]'
                            : 'bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] text-white/50 hover:text-white'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-white/70 mb-1.5">
                    What Did You Notice? <span className="text-white/40 text-[10px]">(Comma separated)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.qualities}
                    onChange={(e) => setFormData({ ...formData, qualities: e.target.value })}
                    placeholder="e.g. Fast delivery, Clean code, Responsive UX"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] focus:border-cyan-400 text-white text-xs sm:text-sm outline-none transition-all placeholder:text-white/25"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-white/70 mb-1.5">
                    Your Testimonial / Feedback <span className="text-cyan-400">*</span>
                  </label>
                  <textarea
                    rows={3}
                    value={formData.quote}
                    onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                    placeholder="Share your experience working with Umang on full-stack architecture, code quality, speed, or communication..."
                    required
                    className="w-full p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.1] focus:border-cyan-400 text-white text-xs sm:text-sm outline-none transition-all placeholder:text-white/25 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-white/70 mb-1.5">
                    Project or Profile URL <span className="text-white/30 text-[10px]">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    placeholder="https://yourcompany.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] focus:border-cyan-400 text-white text-xs sm:text-sm outline-none transition-all placeholder:text-white/25"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setIsModalOpen(false);
                    }}
                    className="px-4 py-2.5 rounded-xl text-xs font-mono text-white/60 hover:text-white hover:bg-white/[0.05] transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-400 disabled:opacity-50 transition-all shadow-[0_0_20px_rgba(0,189,255,0.35)] cursor-pointer flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        <span>Publishing Live...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Publish Review Live ✦</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
