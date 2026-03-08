'use client';

import { useEffect, useRef } from 'react';
import anime from 'animejs';
import ScrollReveal from './ScrollReveal';
import TextScramble from './TextScramble';

const techItems = [
    { name: 'React', color: '#61DAFB' },
    { name: 'Next.js', color: '#ffffff' },
    { name: 'TypeScript', color: '#3178C6' },
    { name: 'Tailwind', color: '#06B6D4' },
    { name: 'Node.js', color: '#339933' },
    { name: 'Python', color: '#3776AB' },
    { name: 'Unity', color: '#ffffff' },
    { name: 'Godot', color: '#478CBF' },
    { name: 'Lua', color: '#000080' },
    { name: 'PostgreSQL', color: '#4169E1' },
    { name: 'Git', color: '#F05032' },
];

export default function TechOrbit() {
    const orbitRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!orbitRef.current) return;

        anime({
            targets: orbitRef.current,
            rotateY: [0, 360],
            easing: 'linear',
            duration: 30000,
            loop: true,
        });
    }, []);

    const radius = 180;

    return (
        <section id="tech" className="relative py-24 md:py-32" style={{ zIndex: 2 }}>
            <div className="max-w-6xl mx-auto px-6">
                <ScrollReveal>
                    <div className="text-center mb-20">
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <div className="h-px w-[60px]" style={{ background: 'linear-gradient(90deg, transparent, var(--neon-violet))' }} />
                            <span className="text-sm font-medium uppercase tracking-[0.3em]" style={{ color: 'var(--neon-violet)' }}>
                                Skills
                            </span>
                            <div className="h-px w-[60px]" style={{ background: 'linear-gradient(90deg, var(--neon-violet), transparent)' }} />
                        </div>
                        <h2 className="section-heading text-4xl md:text-5xl gradient-text">
                            <TextScramble text="Tech Stack" as="span" />
                        </h2>
                    </div>
                </ScrollReveal>

                {/* 3D Orbit */}
                <div className="flex items-center justify-center">
                    <div className="orbit-container relative w-[400px] h-[400px] flex items-center justify-center">
                        {/* Center label */}
                        <div className="absolute z-10 text-center">
                            <div
                                className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-2 neon-border-glow"
                                style={{
                                    background: 'rgba(139, 92, 246, 0.1)',
                                    border: '1px solid rgba(139, 92, 246, 0.3)',
                                }}
                            >
                                <svg className="w-8 h-8" fill="none" stroke="var(--neon-violet)" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                </svg>
                            </div>
                            <span className="text-xs uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Stack</span>
                        </div>

                        {/* Orbit ring */}
                        <div
                            ref={orbitRef}
                            className="orbit-ring absolute inset-0"
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            {techItems.map((tech, i) => {
                                const angle = (i / techItems.length) * 360;
                                const rad = (angle * Math.PI) / 180;
                                const x = Math.cos(rad) * radius;
                                const z = Math.sin(rad) * radius;

                                return (
                                    <div
                                        key={tech.name}
                                        className="orbit-item absolute left-1/2 top-1/2 group"
                                        style={{
                                            transform: `translate(-50%, -50%) translateX(${x}px) translateZ(${z}px)`,
                                            transformStyle: 'preserve-3d',
                                        }}
                                    >
                                        <div
                                            className="w-14 h-14 rounded-xl flex items-center justify-center cursor-default transition-all duration-300 group-hover:scale-125"
                                            style={{
                                                background: `${tech.color}10`,
                                                border: `1px solid ${tech.color}30`,
                                                boxShadow: `0 0 20px ${tech.color}10`,
                                            }}
                                        >
                                            <span
                                                className="text-xs font-bold"
                                                style={{ color: tech.color }}
                                            >
                                                {tech.name.slice(0, 2).toUpperCase()}
                                            </span>
                                        </div>
                                        {/* Tooltip */}
                                        <div
                                            className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap"
                                        >
                                            <span
                                                className="text-xs font-medium px-2 py-1 rounded-md"
                                                style={{
                                                    background: 'rgba(0,0,0,0.8)',
                                                    border: `1px solid ${tech.color}30`,
                                                    color: tech.color,
                                                }}
                                            >
                                                {tech.name}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Orbit ring visual */}
                        <div
                            className="absolute inset-[10%] rounded-full pointer-events-none"
                            style={{
                                border: '1px solid rgba(139, 92, 246, 0.1)',
                            }}
                        />
                        <div
                            className="absolute inset-[25%] rounded-full pointer-events-none"
                            style={{
                                border: '1px dashed rgba(139, 92, 246, 0.05)',
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
