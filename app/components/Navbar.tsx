'use client';

import { useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import CurrentlyPlaying from './CurrentlyPlaying';

const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Tech', href: '#tech' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const navRef = useRef<HTMLElement>(null);
    const [activeSection, setActiveSection] = useState('home');
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        // Initial animation
        anime({
            targets: navRef.current,
            translateY: [-60, 0],
            opacity: [0, 1],
            easing: 'easeOutCubic',
            duration: 800,
            delay: 200,
        });

        // Scroll listener for background opacity
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);

        // IntersectionObserver for active section
        const sectionIds = navLinks.map((l) => l.href.replace('#', ''));
        const observers: IntersectionObserver[] = [];

        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (!el) return;
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setActiveSection(id);
                    }
                },
                { threshold: 0.35 }
            );
            observer.observe(el);
            observers.push(observer);
        });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            observers.forEach((o) => o.disconnect());
        };
    }, []);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setMenuOpen(false);
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <nav
            ref={navRef}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 opacity-0 ${scrolled ? 'glass-nav py-3' : 'py-5 bg-transparent'
                }`}
        >
            <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <a
                    href="#home"
                    onClick={(e) => handleNavClick(e, '#home')}
                    className="text-xl font-bold tracking-tight gradient-text"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                    Rafa Ramdani
                </a>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${activeSection === link.href.replace('#', '')
                                ? 'text-white bg-white/10'
                                : 'text-white/50 hover:text-white/80'
                                }`}
                        >
                            {link.label}
                            {activeSection === link.href.replace('#', '') && (
                                <span
                                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                                    style={{ background: 'var(--neon-cyan)' }}
                                />
                            )}
                        </a>
                    ))}
                    <div className="ml-4">
                        <CurrentlyPlaying />
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5 cursor-pointer"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span
                        className={`block w-5 h-0.5 bg-white/70 transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-1' : ''
                            }`}
                    />
                    <span
                        className={`block w-5 h-0.5 bg-white/70 transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''
                            }`}
                    />
                    <span
                        className={`block w-5 h-0.5 bg-white/70 transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-1' : ''
                            }`}
                    />
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-400 ${menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="px-6 py-4 flex flex-col gap-1 glass-nav mt-2 mx-4 rounded-2xl">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            className={`px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 ${activeSection === link.href.replace('#', '')
                                ? 'text-white bg-white/10'
                                : 'text-white/50 hover:text-white/80'
                                }`}
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    );
}
