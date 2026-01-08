import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeTab, setActiveTab] = useState("Home");

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Tech Stack", href: "#stack" },
        { name: "Projects", href: "#projects" },
        { name: "Experience", href: "#experience" },
        { name: "Education", href: "#education" },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="fixed top-0 w-full z-50 flex justify-center pt-4 px-4"
        >
            <div
                className={cn(
                    "w-full max-w-5xl rounded-full transition-all duration-300 border border-transparent",
                    scrolled
                        ? "glass-strong py-2 px-6 shadow-2xl border-white/10"
                        : "bg-transparent py-4 px-4"
                )}
            >
                <div className="flex justify-between items-center">
                    <div className="flex-shrink-0 flex items-center">
                        <Link
                            to="/"
                            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-white to-secondary hover:opacity-80 transition-opacity"
                        >
                            <span className="text-gradient font-bold tracking-tighter">Portfolio </span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-2">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setActiveTab(link.name)}
                                className="relative px-4 py-2 rounded-full text-sm font-medium transition-colors hover:text-white"
                            >
                                {activeTab === link.name && (
                                    <motion.div
                                        layoutId="active-pill"
                                        className="absolute inset-0 bg-white/10 rounded-full border border-white/5"
                                        transition={{ type: "spring", duration: 0.6 }}
                                    />
                                )}
                                <span className={cn(
                                    "relative z-10 transition-colors duration-200",
                                    activeTab === link.name ? "text-primary" : "text-muted-foreground"
                                )}>
                                    {link.name}
                                </span>
                            </a>
                        ))}
                        <a
                            href="#contact"
                            className="ml-4 px-6 py-2 rounded-full bg-primary text-black font-bold hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:shadow-[0_0_30px_rgba(6,182,212,0.8)]"
                        >
                            Contact
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-foreground p-2 rounded-full hover:bg-white/10 transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="absolute top-20 left-4 right-4 p-4 rounded-2xl glass-strong md:hidden overflow-hidden border border-white/10"
                    >
                        <div className="flex flex-col space-y-2">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="block px-4 py-3 rounded-xl text-base font-medium text-foreground hover:bg-white/5 transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </a>
                            ))}
                            <a
                                href="#contact"
                                className="block px-4 py-3 rounded-xl text-base font-bold text-center bg-primary text-black mt-4 hover:shadow-lg transition-all"
                                onClick={() => setIsOpen(false)}
                            >
                                Let's Connect
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
