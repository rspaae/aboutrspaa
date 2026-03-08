'use client';

import ScrollReveal from './ScrollReveal';
import TiltCard from './TiltCard';
import TextScramble from './TextScramble';

const expertiseItems = [
    {
        title: 'Web Developer',
        role: 'Frontend & Full-stack',
        description: 'Building modern, responsive, and high-performance web applications with a focus on user experience.',
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 21h6l-.75-4M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
        color: 'var(--neon-cyan)',
    },
    {
        title: 'Game Developer',
        role: 'Unity & Godot',
        description: 'Creating immersive and interactive gaming experiences with smooth mechanics and catchy visuals.',
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
            </svg>
        ),
        color: 'var(--neon-magenta)',
    },
    {
        title: 'Scripter',
        role: 'Automation & Backend',
        description: 'Developing powerful scripts to automate tasks and enhance functionality across various environments.',
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
        ),
        color: 'var(--neon-green)',
    },
    {
        title: 'Bot Developer',
        role: 'Discord & Telegram',
        description: 'Designing intelligent and versatile bots to streamline interactions and automate complex services.',
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
        ),
        color: 'var(--neon-violet)',
    },
];

export default function Expertise() {
    return (
        <section id="expertise" className="relative py-24 md:py-32" style={{ zIndex: 2 }}>
            <div className="max-w-6xl mx-auto px-6">
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <div className="h-px w-[60px]" style={{ background: 'linear-gradient(90deg, transparent, var(--neon-cyan))' }} />
                            <span className="text-sm font-medium uppercase tracking-[0.3em]" style={{ color: 'var(--neon-cyan)' }}>
                                Specialization
                            </span>
                            <div className="h-px w-[60px]" style={{ background: 'linear-gradient(90deg, var(--neon-cyan), transparent)' }} />
                        </div>
                        <h2 className="section-heading text-4xl md:text-5xl gradient-text">
                            <TextScramble text="Primary Expertise" as="span" />
                        </h2>
                    </div>
                </ScrollReveal>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {expertiseItems.map((item, i) => (
                        <ScrollReveal key={item.title} delay={i * 100} direction="up">
                            <TiltCard className="h-full">
                                <div className="glass-card p-8 h-full flex flex-col border border-white/5 group hover:border-white/10 transition-colors">
                                    <div
                                        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110"
                                        style={{
                                            background: `${item.color}15`,
                                            border: `1px solid ${item.color}30`,
                                            boxShadow: `0 0 30px ${item.color}10`,
                                            color: item.color
                                        }}
                                    >
                                        {item.icon}
                                    </div>
                                    <h3
                                        className="text-xl font-bold mb-1 tracking-tight group-hover:text-white transition-colors"
                                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                                    >
                                        {item.title}
                                    </h3>
                                    <div className="text-xs uppercase tracking-widest mb-4 opacity-50 font-bold" style={{ color: item.color }}>
                                        {item.role}
                                    </div>
                                    <p className="text-sm leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity">
                                        {item.description}
                                    </p>
                                </div>
                            </TiltCard>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
