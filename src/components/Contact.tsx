import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Send, 
  MapPin, 
  MessageSquare, 
  User, 
  Sparkles, 
  Check, 
  Copy, 
  Clock, 
  ArrowRight,
  Briefcase,
  Code2,
  Cpu,
  Trophy,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import { FaWhatsapp, FaGithub, FaLinkedin } from 'react-icons/fa';
import { toast } from 'sonner';
import { sound } from '@/lib/sound';

const PROJECT_TYPES = [
  { id: 'Client Project', label: 'Client Project', desc: 'Bespoke website, brand platform, or web redesign', icon: Sparkles },
  { id: 'Full-Stack App', label: 'Full-Stack App', desc: 'Custom database, API backend, and reactive UI', icon: Code2 },
  { id: 'AI Platform / MVP', label: 'AI Platform / MVP', desc: 'LLM agent, conversational AI, or rapid prototype', icon: Cpu },
  { id: 'Full-Time SDE Role', label: 'Full-Time SDE Role', desc: 'Software engineer / full-stack engineering team', icon: Briefcase },
  { id: 'Consultation / Collab', label: 'Consultation / Collab', desc: 'Hackathons, code review, or technical advice', icon: Trophy },
];

const AVAILABILITY_CARDS = [
  {
    title: 'Full-Time SDE Roles',
    desc: 'Available for software engineering & full-stack development teams.',
    tag: 'Actively Interviewing',
    highlight: true,
  },
  {
    title: 'Client & Freelance Work',
    desc: 'High-performance web applications, business platforms, and portfolios.',
    tag: 'Open for Q1–Q2',
    highlight: false,
  },
  {
    title: 'AI & Web Architecture',
    desc: 'Voice platforms, LLM integration, and real-time state systems.',
    tag: 'Custom Projects',
    highlight: false,
  },
  {
    title: 'Hackathon Collaborations',
    desc: 'High-speed 24–48hr sprints with proven 1st place track record.',
    tag: 'Available',
    highlight: false,
  },
];

const Contact = () => {
  const DRAFT_KEY = 'umang_contact_draft_v2';
  const [formData, setFormData] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(DRAFT_KEY);
        if (saved) return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return {
      name: '',
      email: '',
      projectType: 'Client Project',
      message: '',
    };
  });

  const [hasRestoredDraft, setHasRestoredDraft] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(DRAFT_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.name || parsed.email || parsed.message) {
          setHasRestoredDraft(true);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const handleInputChange = (field: string, value: string) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleClearDraft = () => {
    localStorage.removeItem(DRAFT_KEY);
    setFormData({
      name: '',
      email: '',
      projectType: 'Client Project',
      message: '',
    });
    setHasRestoredDraft(false);
    toast.success('Draft cleared');
  };

  const handleCopyEmail = () => {
    sound.playClick();
    navigator.clipboard.writeText('utrivedi80@gmail.com');
    setCopied(true);
    toast.success('Email copied to clipboard: utrivedi80@gmail.com');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error('Please enter your name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      toast.error('Please enter a valid email address.');
      return;
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      toast.error('Please write a message with at least 10 characters.');
      return;
    }

    sound.playClick();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1100));

    sound.playPop();
    setIsSubmitting(false);
    toast.success(`Thank you, ${formData.name}! Your message regarding "${formData.projectType}" has been delivered. Umang will get back to you shortly.`);
    localStorage.removeItem(DRAFT_KEY);
    setHasRestoredDraft(false);
    setFormData({
      name: '',
      email: '',
      projectType: 'Client Project',
      message: '',
    });
  };

  return (
    <section className="relative pt-20 sm:pt-24 pb-20 sm:pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden" id="contact">
      {/* ── Atmospheric Background Glows ── */}
      <div className="section-glow-accent" aria-hidden="true" />
      <div className="absolute inset-0 cyber-grid-bg opacity-40 pointer-events-none" aria-hidden="true" />
      <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-cyan-500/10 blur-[150px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-primary/15 blur-[150px] pointer-events-none" aria-hidden="true" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="text-center mb-14 md:mb-18"
        >
          <div className="section-label mx-auto mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>LET'S BUILD SOMETHING EXTRAORDINARY</span>
          </div>

          <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 tracking-tight text-white">
            Have an <span className="text-gradient">Idea?</span>
          </h1>

          <p className="text-white/70 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed mb-3">
            Whether you have a breakthrough concept, need an experienced full-stack engineer, or want to collaborate on high-stakes software — my inbox is open.
          </p>

          <p className="text-cyan-400/80 text-xs sm:text-sm font-mono flex items-center justify-center gap-2">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>Typical response time: under 4 hours</span>
          </p>
        </motion.div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* ═══ LEFT COLUMN: Direct Info & Open Opportunities ═══ */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col gap-4"
          >
            {/* "OPEN TO OPPORTUNITIES" Block */}
            <div className="rounded-2xl p-6 bg-[#091224]/90 border border-cyan-500/30 shadow-[0_8px_30px_rgba(0,189,255,0.08)] relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                  </span>
                  <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                    Open to Opportunities
                  </h2>
                </div>
                <span className="text-[11px] font-mono text-white/40">Q1–Q2 2026</span>
              </div>

              {/* 4 Focus Area Badge Cards */}
              <div className="grid grid-cols-1 gap-2.5">
                {AVAILABILITY_CARDS.map((item) => (
                  <div
                    key={item.title}
                    className={`p-3 rounded-xl border transition-all ${
                      item.highlight
                        ? 'bg-cyan-500/10 border-cyan-400/35 text-white shadow-[0_0_15px_rgba(0,189,255,0.15)]'
                        : 'bg-white/[0.03] border-white/[0.07] text-white/80'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-bold text-white flex items-center gap-1.5">
                        {item.title}
                      </span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                          item.highlight
                            ? 'bg-cyan-400/20 text-cyan-300 border border-cyan-400/30'
                            : 'bg-white/[0.05] text-white/50 border border-white/10'
                        }`}
                      >
                        {item.tag}
                      </span>
                    </div>
                    <p className="text-[11px] text-white/50 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Email card with Copy button */}
            <div className="rounded-2xl p-4 sm:p-5 bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.08] hover:border-cyan-400/35 flex items-center justify-between group transition-all">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-mono uppercase text-white/40 tracking-wider">Direct Email</p>
                  <a
                    href="mailto:utrivedi80@gmail.com"
                    className="text-xs sm:text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors truncate block"
                  >
                    utrivedi80@gmail.com
                  </a>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                aria-label="Copy email address"
                className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-cyan-500/20 border border-white/[0.08] hover:border-cyan-400/40 text-white/60 hover:text-white transition-all cursor-pointer shrink-0"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* WhatsApp card */}
            <a
              href="https://wa.me/916352296575"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="rounded-2xl p-4 sm:p-5 bg-white/[0.02] hover:bg-emerald-500/10 border border-white/[0.08] hover:border-emerald-500/35 flex items-center justify-between group transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <FaWhatsapp className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase text-white/40 tracking-wider">Instant Chat</p>
                  <p className="text-xs sm:text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
                    +91 63522 96575
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
            </a>

            {/* Quick Links Row: GitHub & LinkedIn */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href="https://github.com/utrivedi80"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="p-3.5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.08] hover:border-cyan-400/30 flex items-center gap-2.5 group transition-all"
              >
                <FaGithub className="w-4 h-4 text-white/60 group-hover:text-cyan-300" />
                <span className="text-xs font-mono font-medium text-white/70 group-hover:text-white">GitHub</span>
                <ExternalLink className="w-3 h-3 ml-auto text-white/30 group-hover:text-white/60" />
              </a>

              <a
                href="https://www.linkedin.com/in/umang-trivedi31101"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="p-3.5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.08] hover:border-cyan-400/30 flex items-center gap-2.5 group transition-all"
              >
                <FaLinkedin className="w-4 h-4 text-white/60 group-hover:text-cyan-300" />
                <span className="text-xs font-mono font-medium text-white/70 group-hover:text-white">LinkedIn</span>
                <ExternalLink className="w-3 h-3 ml-auto text-white/30 group-hover:text-white/60" />
              </a>
            </div>

            {/* Location card */}
            <div className="rounded-2xl p-4 sm:p-5 bg-white/[0.02] border border-white/[0.08] flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-secondary/15 border border-secondary/30 flex items-center justify-center text-secondary shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase text-white/40 tracking-wider">Base Location</p>
                <p className="text-xs sm:text-sm font-semibold text-white">
                  Ahmedabad, Gujarat, India • IST (UTC+5:30)
                </p>
              </div>
            </div>
          </motion.div>

          {/* ═══ RIGHT COLUMN: Interactive Contact Form ═══ */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="rounded-3xl p-6 sm:p-8 md:p-9 bg-[#080f20]/90 border border-white/[0.09] shadow-2xl relative overflow-hidden backdrop-blur-xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-bold text-xl sm:text-2xl text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-cyan-400" />
                  Start a Conversation
                </h2>
                <span className="text-[11px] font-mono text-cyan-400/80 bg-cyan-500/10 border border-cyan-400/20 px-2.5 py-1 rounded-full">
                  Direct Channel
                </span>
              </div>

              {hasRestoredDraft && (
                <div className="flex items-center justify-between px-3 py-2 mb-5 rounded-xl bg-cyan-500/10 border border-cyan-400/25 text-xs text-cyan-300">
                  <span className="flex items-center gap-1.5 font-mono text-[11px]">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    Auto-saved draft restored
                  </span>
                  <button
                    type="button"
                    onClick={handleClearDraft}
                    className="text-white/50 hover:text-white underline text-[11px] cursor-pointer"
                  >
                    Clear draft
                  </button>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* 1. Project Type Selector (Visual Buttons) */}
                <div>
                  <label className="block text-xs font-mono font-medium text-white/70 mb-2">
                    Project Type / Collaboration Scope <span className="text-cyan-400">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {PROJECT_TYPES.map((pt) => {
                      const isSelected = formData.projectType === pt.id;
                      const PtIcon = pt.icon;
                      return (
                        <button
                          key={pt.id}
                          type="button"
                          onClick={() => {
                            sound.playClick();
                            handleInputChange('projectType', pt.id);
                          }}
                          className={`p-3 rounded-xl text-left border transition-all cursor-pointer flex items-start gap-2.5 ${
                            isSelected
                              ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,189,255,0.2)] ring-1 ring-cyan-400/40'
                              : 'bg-white/[0.03] hover:bg-white/[0.06] border-white/[0.08] text-white/70'
                          }`}
                        >
                          <div
                            className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                              isSelected ? 'bg-cyan-400 text-black' : 'bg-white/[0.06] text-white/50'
                            }`}
                          >
                            <PtIcon className="w-3.5 h-3.5" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-white leading-snug">{pt.label}</p>
                            <p className="text-[10px] text-white/45 font-mono truncate">{pt.desc}</p>
                          </div>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-cyan-400 ml-auto shrink-0 mt-0.5" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Name & Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-medium text-white/70 mb-2">
                      Your Name <span className="text-cyan-400">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Umang Trivedi"
                        required
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] focus:border-cyan-400 focus:bg-white/[0.07] text-white text-xs sm:text-sm outline-none transition-all placeholder:text-white/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-medium text-white/70 mb-2">
                      Your Email <span className="text-cyan-400">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="you@company.com"
                        required
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] focus:border-cyan-400 focus:bg-white/[0.07] text-white text-xs sm:text-sm outline-none transition-all placeholder:text-white/20"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Message Textarea */}
                <div>
                  <label className="block text-xs font-mono font-medium text-white/70 mb-2">
                    Your Message / Project Details <span className="text-cyan-400">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Describe your vision, timeline, stack requirements, or team opportunity..."
                    required
                    className="w-full p-4 rounded-xl bg-white/[0.04] border border-white/[0.1] focus:border-cyan-400 focus:bg-white/[0.07] text-white text-xs sm:text-sm outline-none transition-all placeholder:text-white/20 resize-none"
                  />
                </div>

                {/* 4. Submit button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className="w-full py-3.5 sm:py-4 rounded-xl text-xs sm:text-sm font-bold text-white flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50 transition-all bg-gradient-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-400 shadow-[0_0_25px_rgba(0,189,255,0.35)]"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message to Umang →</span>
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
