import { useState, useEffect } from 'react';
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
  X,
  Send,
  User,
  Plus
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
  avatarInitials: string;
  avatarGradient: string;
  verified: boolean;
  link?: string;
  isLiveSubmission?: boolean;
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
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

const STORAGE_KEY = 'umang_portfolio_live_reviews_v1';

const AVATAR_GRADIENTS = [
  'from-cyan-500 to-blue-600',
  'from-pink-500 to-purple-600',
  'from-emerald-400 to-cyan-500',
  'from-amber-400 to-orange-500',
  'from-violet-500 to-fuchsia-600',
];

/* ── Single Marquee Review Card ── */
const TestimonialCard = ({ item }: { item: Testimonial }) => {
  const CatIcon = item.categoryIcon || Sparkles;

  return (
    <div
      onClick={() => sound.playClick()}
      className={`flex-shrink-0 w-[340px] sm:w-[390px] mx-3 rounded-2xl p-5 sm:p-6 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_36px_rgba(0,189,255,0.15)] flex flex-col justify-between select-none group cursor-pointer ${
        item.isLiveSubmission
          ? 'bg-[#0a162a]/90 hover:bg-[#0d1d36] border border-cyan-400/40 hover:border-cyan-300 ring-1 ring-cyan-400/20'
          : 'bg-[#09101f]/85 hover:bg-[#0c162b] border border-white/[0.08] hover:border-cyan-400/40'
      }`}
    >
      <div>
        {/* Top: Category Tag + Live Badge + 5 Stars */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-400/25">
              <CatIcon className="w-3 h-3 text-cyan-400" />
              {item.categoryLabel}
            </span>
            {item.isLiveSubmission && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono text-emerald-300 bg-emerald-500/15 border border-emerald-400/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live
              </span>
            )}
          </div>

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
                <span title="Verified Endorsement" className="inline-flex shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                </span>
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
  const [reviews, setReviews] = useState<Testimonial[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const rehydrated = parsed.map((item: Partial<Testimonial>) => ({
              ...item,
              categoryIcon: item.categoryLabel === 'Client Project' ? Sparkles : item.categoryLabel === 'Hackathon' ? Trophy : Briefcase,
            })) as Testimonial[];
            return [...rehydrated, ...DEFAULT_TESTIMONIALS];
          }
        }
      } catch {
        // ignore
      }
    }
    return DEFAULT_TESTIMONIALS;
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

    // Simulate instant broadcast
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Generate initials
    const parts = formData.name.trim().split(' ');
    const initials = parts.length > 1
      ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
      : formData.name.slice(0, 2).toUpperCase();

    const randomGradient = AVATAR_GRADIENTS[Math.floor(Math.random() * AVATAR_GRADIENTS.length)];

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
    };

    // Update state & localStorage
    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);

    try {
      const liveOnly = updatedReviews.filter((r) => r.isLiveSubmission);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(liveOnly));
    } catch {
      // ignore
    }

    setIsSubmitting(false);
    setIsModalOpen(false);
    sound.playChime();
    toast.success(`Thank you, ${formData.name}! Your review is now live on the portfolio stream.`);

    // Reset form
    setFormData({
      name: '',
      role: '',
      organization: '',
      category: 'Client Project',
      rating: 5,
      quote: '',
      link: '',
    });
  };

  const doubled = [...reviews, ...reviews, ...reviews];
  const reversed = [...reviews].reverse();
  const revDbl = [...reversed, ...reversed, ...reversed];

  const currentDisplayRating = hoverRating !== null ? hoverRating : formData.rating;

  const RATING_DESCRIPTIONS: Record<number, string> = {
    5: '⭐⭐⭐⭐⭐ 5.0 — Outstanding / Exceptional Work',
    4: '⭐⭐⭐⭐ 4.0 — Very Good / Highly Recommended',
    3: '⭐⭐⭐ 3.0 — Good Collaboration',
    2: '⭐⭐ 2.0 — Fair',
    1: '⭐ 1.0 — Needs Improvement',
  };

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

          <p className="text-white/55 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed mb-6">
            Real feedback from client commissions, hackathon partners, and mentors. Have we worked together? Leave a review live!
          </p>

          {/* Leave a Review Action Button */}
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
              {/* Top ambient glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

              {/* Modal Header */}
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
                      Your endorsement will appear immediately in the stream
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

              {/* Form */}
              <form onSubmit={handleSubmitReview} className="space-y-4">
                {/* 5-Star Interactive Rating Picker */}
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
                      {RATING_DESCRIPTIONS[currentDisplayRating]}
                    </span>
                  </div>
                </div>

                {/* Name & Role Row */}
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
                      Role & Company <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value, organization: e.target.value })}
                      placeholder="e.g. Lead Designer @ Acme"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] focus:border-cyan-400 text-white text-xs sm:text-sm outline-none transition-all placeholder:text-white/25"
                    />
                  </div>
                </div>

                {/* Relationship Tag Chips */}
                <div>
                  <label className="block text-xs font-mono font-medium text-white/70 mb-1.5">
                    Collaboration Type
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {['Client Project', 'Hackathon Teammate', 'Internship Lead', 'Peer Review'].map((cat) => (
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

                {/* Review Text */}
                <div>
                  <label className="block text-xs font-mono font-medium text-white/70 mb-1.5">
                    Your Testimonial / Feedback <span className="text-cyan-400">*</span>
                  </label>
                  <textarea
                    rows={3}
                    value={formData.quote}
                    onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                    placeholder="Share your experience working with Umang on web architecture, speed, design quality, or communication..."
                    required
                    className="w-full p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.1] focus:border-cyan-400 text-white text-xs sm:text-sm outline-none transition-all placeholder:text-white/25 resize-none"
                  />
                </div>

                {/* Optional Website Link */}
                <div>
                  <label className="block text-xs font-mono font-medium text-white/70 mb-1.5">
                    Project / Website URL <span className="text-white/30 text-[10px]">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    placeholder="https://yourcompany.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] focus:border-cyan-400 text-white text-xs sm:text-sm outline-none transition-all placeholder:text-white/25"
                  />
                </div>

                {/* Submit Action */}
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
