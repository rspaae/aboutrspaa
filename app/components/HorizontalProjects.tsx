'use client';

import { useRef, useEffect } from 'react';
import anime from 'animejs';
import ProjectCard from './ProjectCard';
import ScrollReveal from './ScrollReveal';

const projects = [
    {
        title: 'AI Dashboard',
        description: 'A real-time analytics dashboard powered by machine learning models. Features live data visualization, predictive analytics, and automated reporting.',
        tags: ['React', 'Python', 'TensorFlow', 'D3.js'],
        link: '#',
        color: '#00f5ff',
    },
    {
        title: 'E-Commerce Platform',
        description: 'Full-stack e-commerce solution with payment integration, inventory management, and a stunning storefront with micro-animations.',
        tags: ['Next.js', 'Stripe', 'PostgreSQL', 'Tailwind'],
        link: '#',
        color: '#8b5cf6',
    },
    {
        title: 'Social Media App',
        description: 'A modern social platform with real-time messaging, stories, and content sharing. Built for scale with optimistic UI updates.',
        tags: ['React Native', 'Firebase', 'Node.js', 'WebSocket'],
        link: '#',
        color: '#ff00e5',
    },
    {
        title: 'Portfolio Generator',
        description: 'A SaaS tool that helps developers create beautiful portfolio websites in minutes. Drag-and-drop builder with custom themes.',
        tags: ['Next.js', 'Prisma', 'Vercel', 'MDX'],
        link: '#',
        color: '#10b981',
    },
    {
        title: 'Task Management',
        description: 'Kanban-style project management tool with team collaboration, time tracking, and AI-powered task prioritization.',
        tags: ['TypeScript', 'Redux', 'Express', 'MongoDB'],
        link: '#',
        color: '#ec4899',
    },
];

export default function HorizontalProjects() {
    const scrollerRef = useRef<HTMLDivElement>(null);
    const animeRef = useRef<any>(null);

    // Duplicate projects to create a seamless infinite loop
    const duplicatedProjects = [...projects, ...projects];

    useEffect(() => {
        if (!scrollerRef.current) return;

        // Calculate the width of one set of projects
        const singleSetWidth = scrollerRef.current.scrollWidth / 2;

        // Create the infinite scrolling animation
        animeRef.current = anime({
            targets: scrollerRef.current,
            translateX: [`0px`, `-${singleSetWidth}px`],
            duration: 35000,
            easing: 'linear',
            loop: true,
        });

        // Pause on hover
        const handleMouseEnter = () => animeRef.current?.pause();
        const handleMouseLeave = () => animeRef.current?.play();

        const scroller = scrollerRef.current;
        scroller.addEventListener('mouseenter', handleMouseEnter);
        scroller.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            scroller.removeEventListener('mouseenter', handleMouseEnter);
            scroller.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <section id="projects" className="relative py-24 md:py-32" style={{ zIndex: 2, overflow: 'hidden' }}>
            <div className="max-w-6xl mx-auto px-6 mb-12">
                <ScrollReveal>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-px flex-1 max-w-[60px]" style={{ background: 'linear-gradient(90deg, var(--neon-cyan), transparent)' }} />
                        <span className="text-sm font-medium uppercase tracking-[0.3em]" style={{ color: 'var(--neon-cyan)' }}>
                            Portfolio
                        </span>
                    </div>
                    <h2
                        className="section-heading text-4xl md:text-5xl gradient-text mb-4"
                    >
                        My Projects
                    </h2>
                    <p className="text-base max-w-xl" style={{ color: 'var(--text-secondary)' }}>
                        A curated selection of my recent work.
                    </p>
                </ScrollReveal>
            </div>

            {/* Horizontal scroll container */}
            <div className="relative w-full overflow-hidden">
                {/* Fade edges */}
                <div
                    className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
                    style={{ background: 'linear-gradient(90deg, var(--bg-primary) 0%, transparent 100%)' }}
                />
                <div
                    className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
                    style={{ background: 'linear-gradient(270deg, var(--bg-primary) 0%, transparent 100%)' }}
                />

                <div
                    className="flex w-max"
                    style={{
                        paddingLeft: '2rem',
                    }}
                >
                    <div ref={scrollerRef} className="flex gap-6 py-4">
                        {duplicatedProjects.map((project, i) => (
                            <ProjectCard key={`${project.title}-${i}`} {...project} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Scroll hint */}
            <div className="flex items-center justify-center gap-3 mt-8 opacity-40">
                <span className="text-xs uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>
                    Hover to pause
                </span>
            </div>
        </section>
    );
}

