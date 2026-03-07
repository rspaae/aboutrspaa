'use client';

import { useRef } from 'react';
import anime from 'animejs';

interface ProjectCardProps {
    title: string;
    description: string;
    tags: string[];
    image?: string;
    link?: string;
    color?: string;
}

export default function ProjectCard({ title, description, tags, link, color = '#8b5cf6' }: ProjectCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseEnter = () => {
        anime({
            targets: cardRef.current,
            translateY: -8,
            scale: 1.02,
            duration: 400,
            easing: 'easeOutCubic',
        });
    };

    const handleMouseLeave = () => {
        anime({
            targets: cardRef.current,
            translateY: 0,
            scale: 1,
            duration: 500,
            easing: 'easeOutElastic(1, .5)',
        });
    };

    return (
        <div
            ref={cardRef}
            className="glass-card group relative w-[340px] min-w-[340px] md:w-[400px] md:min-w-[400px] overflow-hidden"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Glow effect on hover */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{
                    background: `radial-gradient(circle at 50% 0%, ${color}15, transparent 70%)`,
                }}
            />

            {/* Top accent bar */}
            <div
                className="h-1 w-full"
                style={{
                    background: `linear-gradient(90deg, ${color}, transparent)`,
                }}
            />

            <div className="p-6 md:p-8">
                {/* Project icon */}
                <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{
                        background: `${color}15`,
                        border: `1px solid ${color}30`,
                    }}
                >
                    <svg className="w-6 h-6" fill="none" stroke={color} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                </div>

                {/* Title */}
                <h3
                    className="text-xl font-bold mb-3 tracking-tight"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                    {title}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-secondary)' }}>
                    {description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-3 py-1 text-xs font-medium rounded-full"
                            style={{
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                color: 'var(--text-secondary)',
                            }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Link */}
                {link && (
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-300 hover:opacity-80"
                        style={{ color }}
                    >
                        View Project
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                )}
            </div>
        </div>
    );
}
