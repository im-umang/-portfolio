import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  X,
  Send,
  Sparkles,
  ExternalLink,
  Copy,
  ArrowRight,
  RotateCcw,
  Check,
  ArrowUp,
  Command,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { sound } from '@/lib/sound';
import { PROJECTS_DATA } from '@/data/projectsData';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  actions?: { label: string; actionType: 'navigate' | 'copy' | 'link' | 'download'; payload: string }[];
  timestamp: string;
}

const INITIAL_MESSAGE: Message = {
  id: 'init-1',
  sender: 'ai',
  text: "Hello! I'm **Umang AI**, an autonomous assistant trained on Umang Trivedi's real background, production projects, and engineering capabilities. How can I help you explore his work?",
  actions: [
    { label: '🚀 Top Projects', actionType: 'navigate', payload: '#projects' },
    { label: '🏆 Hackathon Win', actionType: 'navigate', payload: '#achievements' },
    { label: '⚡ Core Tech Stack', actionType: 'navigate', payload: '#stack' },
    { label: '✉️ Contact / Hire', actionType: 'navigate', payload: '#contact' },
  ],
  timestamp: 'Just now',
};

const SUGGESTIONS = [
  'What are Umang\'s strongest skills?',
  'Tell me about his client project',
  'Did he win any hackathons?',
  'What is his educational background?',
  'Is Umang open for full-time roles?',
];

export default function UmangAIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    sound.playPop();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open with custom event if requested
  useEffect(() => {
    const handleOpenAgent = () => {
      sound.playPop();
      setIsOpen(true);
    };
    window.addEventListener('open-umang-ai', handleOpenAgent);
    return () => window.removeEventListener('open-umang-ai', handleOpenAgent);
  }, []);

  const handleActionClick = (action: { label: string; actionType: 'navigate' | 'copy' | 'link' | 'download'; payload: string }) => {
    sound.playClick();
    if (action.actionType === 'navigate') {
      if (action.payload.startsWith('#')) {
        const id = action.payload.replace('#', '');
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          navigate(`/${action.payload}`);
        }
      } else {
        navigate(action.payload);
      }
    } else if (action.actionType === 'copy') {
      navigator.clipboard.writeText(action.payload);
      toast.success(`Copied: ${action.payload}`);
    } else if (action.actionType === 'link') {
      window.open(action.payload, '_blank', 'noopener,noreferrer');
    } else if (action.actionType === 'download') {
      const link = document.createElement('a');
      link.href = action.payload;
      link.download = 'Umang_Trivedi_Resume.pdf';
      link.click();
      toast.success('Downloading Resume...');
    }
  };

  const generateAIResponse = (query: string): { text: string; actions?: Message['actions'] } => {
    const q = query.toLowerCase();

    // Skills & Stack
    if (q.includes('skill') || q.includes('stack') || q.includes('tech') || q.includes('technolog')) {
      return {
        text: "Umang specializes in **Full-Stack MERN Architecture** with extensive production experience:\n\n• **Frontend**: React.js, TypeScript, Next.js, Tailwind CSS, Responsive Design System\n• **Backend & APIs**: Node.js, Express.js, RESTful microservices, Python\n• **Databases**: MongoDB, MySQL, PostgreSQL\n• **Engineering Tools**: Git/GitHub, Vercel, Postman, Agile Delivery",
        actions: [
          { label: 'Explore Technical Arsenal', actionType: 'navigate', payload: '#stack' },
          { label: 'View React & Node Projects', actionType: 'navigate', payload: '#projects' },
        ],
      };
    }

    // Client project / Radhika portfolio
    if (q.includes('client') || q.includes('radhika') || q.includes('iota') || q.includes('freelance')) {
      return {
        text: "Umang built and shipped the official **Valand Radhika Portfolio** (`https://radhika-portfolio-iota.vercel.app/`).\n\nIt features an interactive spatial layout, dynamic project filters, custom typography, and responsive mobile architecture deployed live on Vercel.",
        actions: [
          { label: '🔗 Open Live Site', actionType: 'link', payload: 'https://radhika-portfolio-iota.vercel.app/' },
          { label: '📖 Case Study', actionType: 'navigate', payload: '/projects/radhika-portfolio' },
        ],
      };
    }

    // Client Feedback & Endorsements
    if (q.includes('review') || q.includes('testimonial') || q.includes('feedback') || q.includes('client say') || q.includes('endorse') || q.includes('recommend')) {
      return {
        text: "Umang holds **verified 5-star endorsements** across client delivery, hackathons, and engineering internships:\n\n• **Radhika Valand** (Founder, Radhika Studio): *\"Umang turned my vision into an elegant, high-performance portfolio website... delivered ahead of schedule with 100% satisfaction.\"*\n• **Devendra Sharma** (Odoo Hackathon '26 Teammate): *\"Spearheaded the real-time sensor state engine for GearGuard, helping us clinch 1st place.\"*\n• **Rahul Mehta** (Engineering Lead, OctaNet): *\"Demonstrated strong engineering hygiene, clean React components, and algorithmic discipline.\"*",
        actions: [
          { label: '⭐ View All Endorsements', actionType: 'navigate', payload: '#testimonials' },
          { label: 'Client Project Demo', actionType: 'link', payload: 'https://valandradhika.com' },
        ],
      };
    }

    // Hackathon win / GearGuard
    if (q.includes('hackathon') || q.includes('gearguard') || q.includes('odoo') || q.includes('adani') || q.includes('award') || q.includes('win')) {
      return {
        text: "🏆 **Hackathon Win**: Umang won distinction at the **Odoo × Adani University 24-Hour Hackathon '26**.\n\nHe engineered **GearGuard**, an end-to-end equipment & asset maintenance tracking platform built with React, Node.js, Express, and MySQL.",
        actions: [
          { label: 'Explore GearGuard Case Study', actionType: 'navigate', payload: '/projects/gearguard' },
          { label: 'View Certificate & Honors', actionType: 'navigate', payload: '#achievements' },
        ],
      };
    }

    // Experience / Jobs / Internships
    if (q.includes('experience') || q.includes('job') || q.includes('work') || q.includes('career') || q.includes('intern') || q.includes('octanet') || q.includes('becil')) {
      return {
        text: "Umang's professional trajectory combines technical engineering and developer instruction:\n\n1. **OctaNet Services Pvt. Ltd.** (June–July 2024): Full-Stack Web Development Intern building React interfaces, REST APIs, and MongoDB schemas in Agile sprints.\n2. **BECIL Training Centre** (Aug 2021–Dec 2023): Technical Instructor & Operations Lead training student cohorts on JavaScript, web architectures, and mentoring hands-on builds.",
        actions: [
          { label: 'View Career Milestone Spine', actionType: 'navigate', payload: '#experience' },
          { label: '📄 Download Full Resume', actionType: 'download', payload: '/resume/Umang_Trivedi_Resume.pdf' },
        ],
      };
    }

    // Education
    if (q.includes('education') || q.includes('degree') || q.includes('college') || q.includes('university') || q.includes('mca') || q.includes('bca') || q.includes('lj')) {
      return {
        text: "Umang holds a strong scholastic background in computer applications:\n\n• **MCA (Master of Computer Applications)**: LJ University, Ahmedabad (2024–2026) — Currently pursuing with **7.25 SPI**.\n• **BCA (Bachelor of Computer Applications)**: Gujarat University (2021–2024) — Graduated with **6.33 CGPA**.\n• **HSC Science (PCM)**: Muktajivan High School (2020–2021) — **85% Aggregate**.",
        actions: [
          { label: 'View 2x2 Scholastic Matrix', actionType: 'navigate', payload: '#education' },
        ],
      };
    }

    // Projects overview
    if (q.includes('project') || q.includes('work') || q.includes('portfolio') || q.includes('speakwise') || q.includes('pos') || q.includes('vcs')) {
      const topProjects = PROJECTS_DATA.slice(0, 3);
      return {
        text: `Umang has architected **${PROJECTS_DATA.length}+ production applications**. Top featured works:\n\n` +
          topProjects.map(p => `• **${p.title}** (${p.status}) — ${p.tagline || p.description}`).join('\n\n'),
        actions: [
          { label: 'Browse Shipped Projects', actionType: 'navigate', payload: '#projects' },
          { label: 'SpeakWise AI Case Study', actionType: 'navigate', payload: '/projects/speakwise' },
        ],
      };
    }

    // Hire / Contact / Availability
    if (q.includes('hire') || q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('available') || q.includes('freelance') || q.includes('remote')) {
      return {
        text: "Umang is **actively open to full-time Software Engineer / Full-Stack Developer opportunities**, freelance builds, and technical collaborations.\n\n• **Email**: utrivedi80@gmail.com\n• **Location**: Ahmedabad, Gujarat, India (Open to remote & relocation)\n• **Phone / WhatsApp**: +91 63522 96575",
        actions: [
          { label: 'Jump to Contact Form', actionType: 'navigate', payload: '#contact' },
          { label: 'Copy Email', actionType: 'copy', payload: 'utrivedi80@gmail.com' },
          { label: 'Chat on WhatsApp', actionType: 'link', payload: 'https://wa.me/916352296575' },
        ],
      };
    }

    // Default intelligent fallback
    return {
      text: `Thank you for asking! Umang is a Full-Stack Developer specializing in **React.js, Node.js, MongoDB, and TypeScript** currently completing his MCA at LJ University, Ahmedabad.\n\nHe is an **Odoo Hackathon winner**, has shipped **client projects**, and is available for hire. What specific area would you like to explore?`,
      actions: [
        { label: 'Explore Projects', actionType: 'navigate', payload: '#projects' },
        { label: 'View Tech Stack', actionType: 'navigate', payload: '#stack' },
        { label: 'Contact Umang', actionType: 'navigate', payload: '#contact' },
      ],
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text) return;

    sound.playClick();
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate natural AI thinking delay
    setTimeout(() => {
      const response = generateAIResponse(text);
      sound.playPop();

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: response.text,
        actions: response.actions,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 450);
  };

  return (
    <>
      {/* Unified Single Floating Island (Clean & Non-overlapping) */}
      <div className="fixed bottom-6 right-4 sm:right-6 z-[9998] flex items-center gap-2">
        {/* Scroll To Top Button (reveals on scroll) */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              type="button"
              initial={{ opacity: 0, scale: 0.8, x: 10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: 10 }}
              onClick={scrollToTop}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0a1222]/90 hover:bg-[#0e1a32] border border-white/15 hover:border-cyan-400 text-white/70 hover:text-cyan-300 shadow-[0_8px_24px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all cursor-pointer"
              title="Back to top"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Command Palette Trigger */}
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            window.dispatchEvent(new CustomEvent('toggle-command-palette'));
          }}
          className="hidden sm:flex items-center gap-1.5 px-3 py-2.5 rounded-full bg-[#0a1222]/90 hover:bg-[#0e1a32] border border-white/15 hover:border-cyan-400/40 text-white/70 hover:text-cyan-300 shadow-[0_8px_24px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all cursor-pointer text-xs font-mono"
          title="Open search palette (Ctrl+K)"
          aria-label="Open Command Palette"
        >
          <Command className="w-3.5 h-3.5 text-cyan-400" />
          <span>Ctrl+K</span>
        </button>

        {/* Ask Umang AI Main Trigger */}
        <motion.button
          type="button"
          onClick={() => {
            sound.playPop();
            setIsOpen((p) => !p);
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#0a1222]/90 hover:bg-[#0e1a32] border border-cyan-400/40 hover:border-cyan-400 text-white shadow-[0_8px_30px_rgba(0,189,255,0.3)] backdrop-blur-xl transition-all cursor-pointer group"
          aria-label="Ask Umang AI"
        >
          {/* Pulsing Emerald Live Dot */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400" />
          </span>

          <Bot className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
          <span className="text-xs font-semibold tracking-wide font-sans">
            Ask <span className="text-gradient">Umang AI</span>
          </span>

          {/* Sparkles micro-badge */}
          <Sparkles className="w-3 h-3 text-cyan-300 opacity-70 group-hover:opacity-100 transition-opacity" />
        </motion.button>
      </div>

      {/* Floating Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100001] pointer-events-none flex items-end sm:items-end justify-end p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.92 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto w-full sm:w-[420px] h-[580px] max-h-[85vh] bg-[#070d1a]/95 border border-cyan-500/30 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.85)] backdrop-blur-2xl flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.08] bg-white/[0.02]">
                <div className="flex items-center gap-3">
                  <div className="relative w-9 h-9 rounded-xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-cyan-400" />
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#070d1a]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-bold text-white tracking-tight">Umang AI Copilot</h4>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-400/25">
                        Autonomous
                      </span>
                    </div>
                    <p className="text-[11px] font-mono text-white/40">Portfolio Knowledge Engine</p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setMessages([INITIAL_MESSAGE]);
                    }}
                    title="Reset conversation"
                    className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setIsOpen(false);
                    }}
                    className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Chat Message Stream */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs sm:text-sm">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-r from-primary to-cyan-500 text-white rounded-br-none shadow-md font-medium'
                          : 'bg-white/[0.04] border border-white/[0.08] text-white/85 rounded-bl-none'
                      }`}
                    >
                      <div className="whitespace-pre-line font-sans font-light">
                        {msg.text.split('**').map((part, i) =>
                          i % 2 === 1 ? (
                            <strong key={i} className="font-bold text-white">
                              {part}
                            </strong>
                          ) : (
                            part
                          )
                        )}
                      </div>

                      {/* Action Pills inside AI messages */}
                      {msg.actions && msg.actions.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3 pt-2.5 border-t border-white/[0.08]">
                          {msg.actions.map((act, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => handleActionClick(act)}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 text-[11px] font-mono font-medium border border-cyan-400/30 transition-all cursor-pointer shadow-sm hover:scale-102"
                            >
                              <span>{act.label}</span>
                              <ArrowRight className="w-3 h-3 text-cyan-400" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <span className="text-[9px] font-mono text-white/30 mt-1 px-1">{msg.timestamp}</span>
                  </div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-white/40 w-16">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Suggestion Chips */}
              <div className="px-4 py-2 border-t border-white/[0.06] bg-white/[0.01]">
                <p className="text-[10px] font-mono text-white/35 uppercase tracking-wider mb-1.5">
                  Suggested inquiries:
                </p>
                <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                  {SUGGESTIONS.map((sugg, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleSendMessage(sugg)}
                      className="px-2.5 py-1 rounded-full text-[11px] font-sans text-white/60 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.07] hover:border-cyan-400/30 transition-all whitespace-nowrap cursor-pointer"
                    >
                      {sugg}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Input Bar */}
              <div className="p-3 border-t border-white/[0.08] bg-[#070d1a]">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about skills, projects, hackathons..."
                    className="flex-1 bg-white/[0.04] border border-white/[0.1] focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-white/30 outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim()}
                    className="p-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-black transition-all cursor-pointer disabled:cursor-not-allowed shadow-md"
                    aria-label="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
