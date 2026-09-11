import { useState, useEffect, useRef } from 'react';
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
  ChevronDown,
  Trophy
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { toast } from 'sonner';
import { sound } from '@/lib/sound';

const SUBJECT_OPTIONS = [
  {
    id: 'Full-time Opportunity',
    label: 'Full-time Software Engineering Role',
    shortLabel: 'Full-time SDE',
    desc: 'Full-Stack / Frontend Engineering Position',
    icon: Briefcase,
  },
  {
    id: 'Freelance Project',
    label: 'Freelance / Contract Development',
    shortLabel: 'Freelance / Contract',
    desc: 'Web App, MVP, or UI System Architecture',
    icon: Sparkles,
  },
  {
    id: 'Hackathon / Collaboration',
    label: 'Hackathon & Tech Collaboration',
    shortLabel: 'Hackathon & Collab',
    desc: 'Build, hack, and innovate in high-stakes projects',
    icon: Trophy,
  },
  {
    id: 'General Inquiry',
    label: 'General Conversation / Mentorship',
    shortLabel: 'General Chat',
    desc: 'Tech exchange, advice, and networking',
    icon: MessageSquare,
  },
];

const Contact = () => {
  const DRAFT_KEY = 'umang_contact_draft';
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
      subject: 'Full-time Opportunity',
      message: '',
    };
  });

  const [hasRestoredDraft, setHasRestoredDraft] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Check if draft was restored on mount
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

  // Auto-save draft on form change
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
      subject: 'Full-time Opportunity',
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

    // Simulate API delivery
    await new Promise((resolve) => setTimeout(resolve, 1200));

    sound.playPop();
    setIsSubmitting(false);
    toast.success(`Thank you, ${formData.name}! Your message has been sent. Umang will reply shortly.`);
    localStorage.removeItem(DRAFT_KEY);
    setHasRestoredDraft(false);
    setFormData({
      name: '',
      email: '',
      subject: 'Full-time Opportunity',
      message: '',
    });
  };

  return (
    <section className="relative pt-20 sm:pt-24 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden" id="contact">
      {/* ── Atmospheric Background Glows ── */}
      <div className="section-glow-accent" aria-hidden="true" />
      <div className="absolute inset-0 cyber-grid-bg opacity-35 pointer-events-none" aria-hidden="true" />
      <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-primary/15 blur-[140px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-secondary/15 blur-[140px] pointer-events-none" aria-hidden="true" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="section-label mx-auto mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Get In Touch</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mb-3 tracking-tight text-white">
            Let's Build Something <span className="text-gradient">Extraordinary</span>
          </h2>
          <p className="text-white/55 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
            Available for full-time software engineering roles, hackathons, and freelance full-stack projects.
          </p>
        </motion.div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* ═══ LEFT COLUMN: Direct Info & Availability ═══ */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col gap-5"
          >
            {/* Status card */}
            <div className="glass-card rounded-2xl p-6 relative overflow-hidden">
              <div className="flex items-center gap-3 mb-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                </span>
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400">
                  Active Status
                </span>
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-2">
                Open to Opportunities
              </h3>
              <p className="text-xs text-white/50 leading-relaxed mb-4">
                Currently exploring full-time software engineer and full-stack developer roles. Let's talk about how I can bring value to your team.
              </p>
              <div className="flex items-center gap-2 text-[11px] font-mono text-white/40 pt-3 border-t border-white/[0.08]">
                <Clock className="w-3.5 h-3.5 text-secondary" />
                <span>Response time: &lt; 4 hours</span>
              </div>
            </div>

            {/* Email card with Copy button */}
            <div className="glass-card rounded-2xl p-5 flex items-center justify-between group">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase text-white/40 tracking-wider">Direct Email</p>
                  <a
                    href="mailto:utrivedi80@gmail.com"
                    className="text-xs sm:text-sm font-semibold text-white group-hover:text-primary transition-colors"
                  >
                    utrivedi80@gmail.com
                  </a>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                aria-label="Copy email address"
                className="p-2.5 rounded-xl glass border border-white/[0.08] hover:border-primary/40 text-white/60 hover:text-white transition-all cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* WhatsApp card */}
            <a
              href="https://wa.me/916352296575"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card rounded-2xl p-5 flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <FaWhatsapp className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase text-white/40 tracking-wider">Instant Chat</p>
                  <p className="text-xs sm:text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">
                    +91 63522 96575
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </a>

            {/* Location card */}
            <div className="glass-card rounded-2xl p-5 flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-secondary/15 border border-secondary/30 flex items-center justify-center text-secondary shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase text-white/40 tracking-wider">Location</p>
                <p className="text-xs sm:text-sm font-semibold text-white">
                  Ahmedabad, Gujarat, India (IST / UTC+5:30)
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
            <div className="glass-strong rounded-3xl p-6 sm:p-8 md:p-10 border border-white/[0.09] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

              <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-2 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-secondary" />
                Send a Direct Message
              </h3>
              {hasRestoredDraft && (
                <div className="flex items-center justify-between px-3 py-2 mb-6 rounded-xl bg-cyan-500/10 border border-cyan-400/25 text-xs text-cyan-300">
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
                {/* Name & Email row */}
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

                {/* Custom Subject Selector (Replaces native select) */}
                <div className="relative" ref={dropdownRef}>
                  <label className="block text-xs font-mono font-medium text-white/70 mb-2">
                    Subject / Discussion Scope <span className="text-cyan-400">*</span>
                  </label>

                  {/* Dropdown Trigger Button */}
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setIsDropdownOpen((prev) => !prev);
                    }}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.1] focus:border-cyan-400 text-left transition-all cursor-pointer group"
                    aria-haspopup="listbox"
                    aria-expanded={isDropdownOpen}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-300">
                        {(() => {
                          const current = SUBJECT_OPTIONS.find((o) => o.id === formData.subject) || SUBJECT_OPTIONS[0];
                          const CurrentIcon = current.icon;
                          return <CurrentIcon className="w-3.5 h-3.5" />;
                        })()}
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-white">
                        {SUBJECT_OPTIONS.find((o) => o.id === formData.subject)?.label || formData.subject}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-white/40 group-hover:text-cyan-300 transition-transform duration-200 ${
                        isDropdownOpen ? 'rotate-180 text-cyan-400' : ''
                      }`}
                    />
                  </button>

                  {/* Custom Animated Glass Menu Popover */}
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.98 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                        className="absolute left-0 right-0 top-full mt-2 z-40 p-2 rounded-2xl bg-[#09101f] border border-cyan-500/30 shadow-[0_16px_40px_rgba(0,0,0,0.8)] backdrop-blur-2xl space-y-1"
                        role="listbox"
                      >
                        {SUBJECT_OPTIONS.map((opt) => {
                          const isSelected = formData.subject === opt.id;
                          const OptIcon = opt.icon;
                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => {
                                sound.playClick();
                                handleInputChange('subject', opt.id);
                                setIsDropdownOpen(false);
                              }}
                              className={`w-full flex items-center justify-between p-2.5 sm:p-3 rounded-xl text-left transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-cyan-500/15 border border-cyan-400/40 text-white shadow-[0_0_12px_rgba(0,189,255,0.15)]'
                                  : 'hover:bg-white/[0.05] border border-transparent text-white/70 hover:text-white'
                              }`}
                              role="option"
                              aria-selected={isSelected}
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                                    isSelected
                                      ? 'bg-cyan-500/25 text-cyan-300 border border-cyan-400/40'
                                      : 'bg-white/[0.04] text-white/40'
                                  }`}
                                >
                                  <OptIcon className="w-4 h-4" />
                                </div>
                                <div>
                                  <p className="text-xs sm:text-[13px] font-semibold text-white">{opt.label}</p>
                                  <p className="text-[10px] text-white/45 font-mono">{opt.desc}</p>
                                </div>
                              </div>
                              {isSelected && <Check className="w-4 h-4 text-cyan-400 shrink-0" />}
                            </button>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* 1-Tap Quick Action Selector Chips */}
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {SUBJECT_OPTIONS.map((opt) => {
                      const isSelected = formData.subject === opt.id;
                      const OptIcon = opt.icon;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => {
                            sound.playClick();
                            handleInputChange('subject', opt.id);
                          }}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-cyan-500/20 border border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(0,189,255,0.25)]'
                              : 'bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] text-white/50 hover:text-white'
                          }`}
                        >
                          <OptIcon className="w-3 h-3" />
                          <span>{opt.shortLabel}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Message Textarea */}
                <div>
                  <label className="block text-xs font-mono font-medium text-white/70 mb-2">
                    Your Message <span className="text-cyan-400">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Tell me about the role, project, tech stack requirements, or questions..."
                    required
                    className="w-full p-4 rounded-xl bg-white/[0.04] border border-white/[0.1] focus:border-cyan-400 focus:bg-white/[0.07] text-white text-xs sm:text-sm outline-none transition-all placeholder:text-white/20 resize-none"
                  />
                </div>

                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className="w-full py-3.5 sm:py-4 rounded-xl text-xs sm:text-sm font-bold text-white flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50 transition-all"
                  style={{
                    background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))',
                    boxShadow: '0 0 25px hsl(var(--primary)/0.4)',
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
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
