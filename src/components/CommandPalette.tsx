import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Layers,
  Briefcase,
  GraduationCap,
  Trophy,
  Mail,
  FileText,
  Github,
  Linkedin,
  Copy,
  Volume2,
  VolumeX,
  ExternalLink,
  Code2,
  Home,
  X,
  Sparkles,
  MessageSquareQuote,
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { toast } from 'sonner';
import { PROJECTS_DATA } from '@/data/projectsData';
import { sound } from '@/lib/sound';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(sound.isEnabled());
  const navigate = useNavigate();

  // Listen for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        sound.playPop();
        if (isOpen) {
          onClose();
        } else {
          // Open handled by caller or state
          window.dispatchEvent(new CustomEvent('toggle-command-palette'));
        }
      }
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Reset query on open
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSoundEnabled(sound.isEnabled());
    }
  }, [isOpen]);

  const executeAction = useCallback((action: () => void) => {
    sound.playClick();
    action();
    onClose();
  }, [onClose]);

  const handleNavigateTo = (path: string) => {
    executeAction(() => {
      navigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  const handleCopyEmail = () => {
    executeAction(() => {
      navigator.clipboard.writeText('utrivedi80@gmail.com');
      toast.success('Email copied: utrivedi80@gmail.com');
    });
  };

  const handleToggleSound = () => {
    const next = sound.toggle();
    setSoundEnabled(next);
    toast.success(next ? 'Sound effects enabled' : 'Sound effects muted');
  };

  // Filtered sections and projects
  const filteredProjects = PROJECTS_DATA.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase()) ||
      p.tech.some((t) => t.toLowerCase().includes(query.toLowerCase()))
  );

  const sections = [
    { label: 'Home', path: '/', id: 'home', icon: Home, desc: 'Intro & summary' },
    { label: 'Technical Arsenal', path: '/stack', id: 'stack', icon: Layers, desc: 'Languages, frameworks & databases' },
    { label: 'Shipped Projects', path: '/projects', id: 'projects', icon: Code2, desc: 'Client work, AI apps & hackathons' },
    { label: 'Career Progression', path: '/experience', id: 'experience', icon: Briefcase, desc: 'Milestones & production roles' },
    { label: 'Academic Qualifications', path: '/education', id: 'education', icon: GraduationCap, desc: 'MCA, BCA & degree credentials' },
    { label: 'Honors & Certifications', path: '/awards', id: 'awards', icon: Trophy, desc: 'Hackathon win & certifications' },
    { label: 'Client Reviews & Feedback', path: '/reviews', id: 'reviews', icon: MessageSquareQuote, desc: 'Client endorsements & testimonials' },
    { label: 'Get In Touch', path: '/contact', id: 'contact', icon: Mail, desc: 'Direct message & booking inquiries' },
  ].filter(
    (s) =>
      s.label.toLowerCase().includes(query.toLowerCase()) ||
      s.desc.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100000] flex items-start justify-center pt-16 sm:pt-24 px-4 overflow-hidden">
          {/* Frosted Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/65 backdrop-blur-md"
          />

          {/* Palette Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-[#090f1d]/95 border border-white/15 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden z-10 backdrop-blur-2xl flex flex-col max-h-[80vh]"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.08] bg-white/[0.02]">
              <Search className="w-5 h-5 text-cyan-400 shrink-0" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command, section, project, or skill..."
                className="w-full bg-transparent text-white text-sm sm:text-base placeholder:text-white/40 focus:outline-none font-sans"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="p-1 rounded text-white/40 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              ) : (
                <div className="flex items-center gap-1">
                  <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-white/45 bg-white/[0.06] border border-white/10 rounded">
                    ESC to close
                  </kbd>
                </div>
              )}
            </div>

            {/* Scrollable Command List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-4 text-xs sm:text-sm">
              {/* Quick Actions Group */}
              <div>
                <p className="px-3 py-1 text-[11px] font-mono font-semibold uppercase tracking-wider text-cyan-400/80">
                  Quick Actions
                </p>
                <div className="space-y-1 mt-1">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white/[0.06] text-white/80 hover:text-white transition-colors cursor-pointer group text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                        <Copy className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">Copy Email Address</p>
                        <p className="text-[11px] text-white/45">utrivedi80@gmail.com</p>
                      </div>
                    </div>
                    <span className="font-mono text-[10px] text-white/35 group-hover:text-cyan-400 transition-colors">
                      Enter ↵
                    </span>
                  </button>

                  <a
                    href="/resume/Umang_Trivedi_Resume.pdf"
                    download
                    onClick={() => executeAction(() => toast.success('Downloading Resume...'))}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white/[0.06] text-white/80 hover:text-white transition-colors cursor-pointer group text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">Download Resume (PDF)</p>
                        <p className="text-[11px] text-white/45">Official software engineer resume</p>
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-white/30 group-hover:text-emerald-400" />
                  </a>

                  <button
                    type="button"
                    onClick={handleToggleSound}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white/[0.06] text-white/80 hover:text-white transition-colors cursor-pointer group text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                        {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                      </div>
                      <div>
                        <p className="font-semibold text-white">
                          Sound Feedback: {soundEnabled ? 'Enabled' : 'Muted'}
                        </p>
                        <p className="text-[11px] text-white/45">Gentle mechanical audio on interaction</p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.06] text-white/50">
                      Toggle
                    </span>
                  </button>
                </div>
              </div>

              {/* Jump to Sections Group */}
              {sections.length > 0 && (
                <div>
                  <p className="px-3 py-1 text-[11px] font-mono font-semibold uppercase tracking-wider text-cyan-400/80">
                    Jump to Section
                  </p>
                  <div className="space-y-1 mt-1">
                    {sections.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleNavigateTo(item.path)}
                          className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-white/[0.06] text-white/80 hover:text-white transition-colors cursor-pointer group text-left"
                        >
                          <div className="flex items-center gap-3">
                            <Icon className="w-4 h-4 text-cyan-400" />
                            <div>
                              <p className="font-semibold text-white">{item.label}</p>
                              <p className="text-[11px] text-white/45">{item.desc}</p>
                            </div>
                          </div>
                          <span className="font-mono text-[10px] text-white/30 group-hover:text-cyan-400 transition-colors">
                            #{item.id}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Shipped Projects Group */}
              {filteredProjects.length > 0 && (
                <div>
                  <p className="px-3 py-1 text-[11px] font-mono font-semibold uppercase tracking-wider text-cyan-400/80">
                    Projects ({filteredProjects.length})
                  </p>
                  <div className="space-y-1 mt-1">
                    {filteredProjects.map((p) => (
                      <button
                        key={p.slug}
                        type="button"
                        onClick={() => executeAction(() => navigate(`/projects/${p.slug}`))}
                        className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white/[0.06] text-white/80 hover:text-white transition-colors cursor-pointer group text-left"
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-400/20">
                            {p.number}
                          </span>
                          <div>
                            <p className="font-semibold text-white group-hover:text-cyan-300 transition-colors">
                              {p.title}
                            </p>
                            <p className="text-[11px] text-white/45 truncate max-w-[340px]">
                              {p.tagline || p.description}
                            </p>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-400/20">
                          {p.status}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Social & Connect Group */}
              <div>
                <p className="px-3 py-1 text-[11px] font-mono font-semibold uppercase tracking-wider text-cyan-400/80">
                  Connect & Socials
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-1 px-1">
                  <a
                    href="https://github.com/im-umang"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => executeAction(() => {})}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] text-white/80 hover:text-white transition-colors"
                  >
                    <Github className="w-4 h-4 text-white" />
                    <span className="text-xs font-medium">GitHub</span>
                  </a>

                  <a
                    href="https://www.linkedin.com/in/umang-trivedi31101"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => executeAction(() => {})}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] text-white/80 hover:text-white transition-colors"
                  >
                    <Linkedin className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-medium">LinkedIn</span>
                  </a>

                  <a
                    href="https://wa.me/916352296575"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => executeAction(() => {})}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] text-white/80 hover:text-white transition-colors"
                  >
                    <FaWhatsapp className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-medium">WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Footer Tip */}
            <div className="flex items-center justify-between px-5 py-3 border-t border-white/[0.08] bg-white/[0.01] text-[11px] font-mono text-white/40">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                Keyboard-driven spatial navigation
              </span>
              <span>
                Tip: Press <kbd className="text-cyan-300">Ctrl+K</kbd> anywhere
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
