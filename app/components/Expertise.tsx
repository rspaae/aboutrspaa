'use client';

import ScrollReveal from './ScrollReveal';
import TiltCard from './TiltCard';
import TextScramble from './TextScramble';

import { useLanguage } from '../context/LanguageContext';

export default function Expertise() {
    const { t } = useLanguage();

    const expertiseItems = [
        {
            title: 'Web Developer',
            role: t('expertise.webDevSubtitle') || 'Frontend & Full-stack',
            description: t('expertise.webDevDesc') || 'Building modern, responsive, and high-performance web applications with a focus on user experience.',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 21h6l-.75-4M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            color: 'var(--neon-cyan)',
        },
        {
            title: 'Game Developer',
            role: t('expertise.gameDevSubtitle') || 'Unity & Godot',
            description: t('expertise.gameDevDesc') || 'Creating immersive and interactive gaming experiences with smooth mechanics and catchy visuals.',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
            ),
            color: 'var(--neon-magenta)',
        },
        {
            title: 'Scripter',
            role: t('expertise.scripterSubtitle') || 'Automation & Backend',
            description: t('expertise.scripterDesc') || 'Developing powerful scripts to automate tasks and enhance functionality across various environments.',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
            ),
            color: 'var(--neon-green)',
        },
        {
            title: 'Bot Developer',
            role: t('expertise.botDevSubtitle') || 'Discord & Telegram',
            description: t('expertise.botDevDesc') || 'Designing intelligent and versatile bots to streamline interactions and automate complex services.',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
            ),
            color: 'var(--neon-violet)',
        },
    ];

    return (
        <section id="expertise" className="relative py-24 md:py-32" style={{ zIndex: 2 }}>
            <div className="max-w-6xl mx-auto px-6">
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <div className="h-px w-[60px]" style={{ background: 'linear-gradient(90deg, transparent, var(--neon-cyan))' }} />
                            <span className="text-sm font-medium uppercase tracking-[0.3em]" style={{ color: 'var(--neon-cyan)' }}>
                                {t('expertise.subtitle')}
                            </span>
                            <div className="h-px w-[60px]" style={{ background: 'linear-gradient(90deg, var(--neon-cyan), transparent)' }} />
                        </div>
                        <h2 className="section-heading text-4xl md:text-5xl gradient-text">
                            <TextScramble text={t('expertise.title')} as="span" />
                        </h2>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
                    {expertiseItems.map((item, i) => {
                        const gridClasses = [
                            "md:col-span-2 md:row-span-2", // Web Developer (Big)
                            "md:col-span-2 md:row-span-1", // Game Developer (Wide)
                            "md:col-span-1 md:row-span-1", // Scripter (Small)
                            "md:col-span-1 md:row-span-1", // Bot Developer (Small)
                        ];

                        return (
                            <ScrollReveal key={item.title} delay={i * 100} direction="up" className={gridClasses[i]}>
                                <TiltCard className="h-full">
                                    <div className="glass-card p-8 h-full flex flex-col border border-white/5 group hover:border-white/10 transition-all duration-500 relative overflow-hidden">
                                        {/* Background Glow */}
                                        <div
                                            className="absolute -right-10 -top-10 w-32 h-32 blur-[100px] opacity-20 transition-opacity group-hover:opacity-40"
                                            style={{ backgroundColor: item.color }}
                                        />

                                        <div
                                            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg"
                                            style={{
                                                background: `linear-gradient(135deg, ${item.color}20, ${item.color}10)`,
                                                border: `1px solid ${item.color}40`,
                                                boxShadow: `0 8px 32px ${item.color}20`,
                                                color: item.color
                                            }}
                                        >
                                            {item.icon}
                                        </div>

                                        <div className="mt-auto">
                                            <div className="text-xs uppercase tracking-[0.2em] mb-2 opacity-60 font-bold" style={{ color: item.color }}>
                                                {item.role}
                                            </div>
                                            <h3
                                                className="text-2xl font-bold mb-3 tracking-tight group-hover:text-white transition-colors"
                                                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                                            >
                                                {item.title}
                                            </h3>
                                            <p className="text-sm leading-relaxed opacity-60 group-hover:opacity-90 transition-opacity">
                                                {item.description}
                                            </p>
                                        </div>

                                        {/* Decorative Corner */}
                                        <div
                                            className="absolute bottom-4 right-4 w-2 h-2 rounded-full opacity-20 group-hover:opacity-100 transition-opacity shadow-[0_0_10px_currentcolor]"
                                            style={{ backgroundColor: item.color, color: item.color }}
                                        />
                                    </div>
                                </TiltCard>
                            </ScrollReveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
