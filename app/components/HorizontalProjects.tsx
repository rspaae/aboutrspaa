'use client';

import { useRef, useEffect, useState } from 'react';
import anime from 'animejs';
import ProjectCard from './ProjectCard';
import ScrollReveal from './ScrollReveal';
import TextScramble from './TextScramble';
import { getRepositories, Repository } from '../lib/github';

// Static fallback projects in case API fails or for specific branding
const fallbackProjects = [
    {
        title: 'Web Developer',
        description: 'Building modern, responsive, and high-performance web applications with a focus on user experience and clean code.',
        tags: ['Next.js', 'React', 'TypeScript', 'Tailwind'],
        link: '#',
        color: '#00f5ff',
    },
    {
        title: 'Game Developer',
        description: 'Creating immersive and interactive gaming experiences with smooth mechanics, catchy visuals, and engaging gameplay.',
        tags: ['Unity', 'C#', 'Godot', 'Game Design'],
        link: '#',
        color: '#8b5cf6',
    },
    {
        title: 'Scripter',
        description: 'Developing powerful scripts to automate tasks, manipulate data, and enhance functionality across various environments.',
        tags: ['Python', 'Lua', 'Bash', 'Automation'],
        link: '#',
        color: '#ff00e5',
    },
    {
        title: 'Bot Developer',
        description: 'Designing intelligent and versatile bots for platforms like Discord and Telegram to streamline interactions and services.',
        tags: ['Node.js', 'Discord.js', 'API', 'Backend'],
        link: '#',
        color: '#10b981',
    },
];

const COLORS = ['#00f5ff', '#8b5cf6', '#ff00e5', '#10b981', '#ec4899', '#3b82f6'];

export default function HorizontalProjects() {
    const scrollerRef = useRef<HTMLDivElement>(null);
    const animeRef = useRef<any>(null);
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true);
            try {
                const repos = await getRepositories();
                if (repos && repos.length > 0) {
                    const mappedRepos = repos.map((repo, i) => ({
                        title: repo.name,
                        description: repo.description || 'No description provided.',
                        tags: [repo.language, ...repo.topics].filter(Boolean).slice(0, 4),
                        link: repo.html_url,
                        stars: repo.stargazers_count,
                        color: COLORS[i % COLORS.length],
                    }));
                    setProjects(mappedRepos);
                } else {
                    setProjects(fallbackProjects);
                }
            } catch (error) {
                console.error('Failed to load GitHub projects:', error);
                setProjects(fallbackProjects);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    useEffect(() => {
        if (!scrollerRef.current || projects.length === 0) return;

        // Duplicate projects to create a seamless infinite loop
        const singleSetWidth = scrollerRef.current.scrollWidth / 2;

        // Create the infinite scrolling animation
        animeRef.current = anime({
            targets: scrollerRef.current,
            translateX: [`0px`, `-${singleSetWidth}px`],
            duration: projects.length * 6000, // Dynamic duration based on count
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
    }, [projects]);

    const duplicatedProjects = [...projects, ...projects];

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
                        <TextScramble text="My Projects" as="span" />
                    </h2>
                    <p className="text-base max-w-xl" style={{ color: 'var(--text-secondary)' }}>
                        {loading ? 'Fetching latest work from GitHub...' : 'A curated selection of my live repositories.'}
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
                        {loading ? (
                            // Loading Skeleton
                            Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="glass-card w-[340px] md:w-[400px] h-[300px] animate-pulse bg-white/5" />
                            ))
                        ) : (
                            duplicatedProjects.map((project, i) => (
                                <ProjectCard key={`${project.title}-${i}`} {...project} />
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Scroll hint */}
            {!loading && (
                <div className="flex items-center justify-center gap-3 mt-8 opacity-40">
                    <span className="text-xs uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>
                        Hover to pause
                    </span>
                </div>
            )}
        </section>
    );
}
