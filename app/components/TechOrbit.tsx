'use client';

import { useEffect, useRef } from 'react';
import ScrollReveal from './ScrollReveal';
import TextScramble from './TextScramble';
import { useLanguage } from '../context/LanguageContext';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiPython, SiUnity, SiGodotengine, SiLua, SiPostgresql, SiGit } from 'react-icons/si';

const techItems = [
    { name: 'React', color: '#61DAFB', icon: <SiReact size={20} /> },
    { name: 'Next.js', color: '#ffffff', icon: <SiNextdotjs size={20} /> },
    { name: 'TypeScript', color: '#3178C6', icon: <SiTypescript size={20} /> },
    { name: 'Tailwind', color: '#06B6D4', icon: <SiTailwindcss size={20} /> },
    { name: 'Node.js', color: '#339933', icon: <SiNodedotjs size={20} /> },
    { name: 'Python', color: '#3776AB', icon: <SiPython size={20} /> },
    { name: 'Unity', color: '#ffffff', icon: <SiUnity size={20} /> },
    { name: 'Godot', color: '#478CBF', icon: <SiGodotengine size={20} /> },
    { name: 'Lua', color: '#000080', icon: <SiLua size={20} /> },
    { name: 'PostgreSQL', color: '#4169E1', icon: <SiPostgresql size={20} /> },
    { name: 'Git', color: '#F05032', icon: <SiGit size={20} /> },
];

export default function TechOrbit() {
    const { t } = useLanguage();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const items = container.querySelectorAll<HTMLElement>('.tech-float-item');
        const speeds = Array.from({ length: items.length }, () => ({
            x: (Math.random() - 0.5) * 0.4,
            y: (Math.random() - 0.5) * 0.3,
        }));
        const offsets = Array.from({ length: items.length }, () => ({
            x: 0,
            y: 0,
        }));

        let animationId: number;
        const animate = () => {
            items.forEach((item, i) => {
                offsets[i].x += speeds[i].x;
                offsets[i].y += speeds[i].y;

                // Bounce within range
                if (Math.abs(offsets[i].x) > 20) speeds[i].x *= -1;
                if (Math.abs(offsets[i].y) > 15) speeds[i].y *= -1;

                item.style.transform = `translate(${offsets[i].x}px, ${offsets[i].y}px)`;
            });
            animationId = requestAnimationFrame(animate);
        };

        animate();
        return () => cancelAnimationFrame(animationId);
    }, []);

    return (
        <section id="tech" className="relative py-24 md:py-32" style={{ zIndex: 2 }}>
            <div className="max-w-6xl mx-auto px-6">
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <div className="h-px w-[60px]" style={{ background: 'linear-gradient(90deg, transparent, var(--neon-violet))' }} />
                            <span className="text-sm font-medium uppercase tracking-[0.3em]" style={{ color: 'var(--neon-violet)' }}>
                                {t('tech.subtitle')}
                            </span>
                            <div className="h-px w-[60px]" style={{ background: 'linear-gradient(90deg, var(--neon-violet), transparent)' }} />
                        </div>
                        <h2 className="section-heading text-4xl md:text-5xl gradient-text">
                            <TextScramble text={t('tech.title')} as="span" />
                        </h2>
                    </div>
                </ScrollReveal>

                {/* Floating constellation grid */}
                <div ref={containerRef} className="relative flex flex-wrap items-center justify-center gap-4 md:gap-5 max-w-3xl mx-auto">
                    {/* Ambient glow behind the grid */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.06) 0%, transparent 80%)',
                            transform: 'translateZ(0)',
                        }}
                    />

                    {techItems.map((tech, i) => (
                        <ScrollReveal key={tech.name} delay={i * 80}>
                            <div className="tech-float-item group relative">
                                <div
                                    className="relative flex items-center gap-3 px-5 py-3 rounded-full cursor-default transition-transform duration-500 group-hover:scale-110"
                                    style={{
                                        background: `linear-gradient(135deg, ${tech.color}08, ${tech.color}15)`,
                                        border: `1px solid ${tech.color}25`,
                                        backdropFilter: 'blur(8px)',
                                        WebkitBackdropFilter: 'blur(8px)',
                                    }}
                                >
                                    {/* Glow on hover */}
                                    <div
                                        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                        style={{
                                            background: `radial-gradient(ellipse at center, ${tech.color}20, transparent 70%)`,
                                            boxShadow: `0 0 30px ${tech.color}20, inset 0 0 20px ${tech.color}08`,
                                            border: `1px solid ${tech.color}50`,
                                            borderRadius: 'inherit',
                                        }}
                                    />

                                    {/* Icon */}
                                    <span className="relative z-10 text-base select-none">{tech.icon}</span>

                                    {/* Name */}
                                    <span
                                        className="relative z-10 text-sm font-semibold tracking-wide whitespace-nowrap"
                                        style={{ color: tech.color }}
                                    >
                                        {tech.name}
                                    </span>

                                    {/* Pulse dot */}
                                    <div
                                        className="relative z-10 w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        style={{
                                            backgroundColor: tech.color,
                                            boxShadow: `0 0 8px ${tech.color}`,
                                            animation: 'pulse-glow 2s ease-in-out infinite',
                                        }}
                                    />
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

                {/* Connection lines decoration */}
                <div className="flex justify-center mt-12">
                    <div className="flex items-center gap-3 opacity-30">
                        <div className="w-2 h-2 rounded-full" style={{ background: 'var(--neon-cyan)' }} />
                        <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, var(--neon-cyan), var(--neon-violet))' }} />
                        <div className="w-2 h-2 rounded-full" style={{ background: 'var(--neon-violet)' }} />
                        <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, var(--neon-violet), var(--neon-magenta))' }} />
                        <div className="w-2 h-2 rounded-full" style={{ background: 'var(--neon-magenta)' }} />
                    </div>
                </div>
            </div>
        </section>
    );
}
