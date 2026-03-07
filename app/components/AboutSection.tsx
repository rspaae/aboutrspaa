'use client';

import ScrollReveal from './ScrollReveal';

export default function AboutSection() {
    return (
        <section id="about" className="relative py-24 md:py-32" style={{ zIndex: 2 }}>
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    {/* Text content */}
                    <ScrollReveal direction="left">
                        <div>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="h-px flex-1 max-w-[60px]" style={{ background: 'linear-gradient(90deg, var(--neon-magenta), transparent)' }} />
                                <span className="text-sm font-medium uppercase tracking-[0.3em]" style={{ color: 'var(--neon-magenta)' }}>
                                    About Me
                                </span>
                            </div>
                            <h2
                                className="section-heading text-4xl md:text-5xl mb-6"
                                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                            >
                                Crafting Digital
                                <br />
                                <span className="gradient-text">Experiences</span>
                            </h2>
                            <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                                I&apos;m a passionate full-stack developer with a keen eye for design and a love for creating
                                interactive, visually stunning web applications. I believe in pushing the boundaries
                                of what&apos;s possible on the web.
                            </p>
                            <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
                                With expertise spanning from{' '}
                                <span style={{ color: 'var(--neon-cyan)' }}>frontend frameworks</span> to{' '}
                                <span style={{ color: 'var(--neon-violet)' }}>backend architecture</span>, I bring ideas
                                to life with clean code and smooth animations. Every pixel matters, every interaction counts.
                            </p>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-6">
                                {[
                                    { number: '3+', label: 'Years Exp.' },
                                    { number: '20+', label: 'Projects' },
                                    { number: '10+', label: 'Tech Stack' },
                                ].map((stat) => (
                                    <div key={stat.label} className="text-center md:text-left">
                                        <div className="text-2xl md:text-3xl font-bold gradient-text mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                            {stat.number}
                                        </div>
                                        <div className="text-xs uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Decorative element */}
                    <ScrollReveal direction="right" delay={200}>
                        <div className="relative flex items-center justify-center">
                            {/* Abstract decorative card */}
                            <div className="glass-card relative w-full max-w-[380px] aspect-square flex items-center justify-center overflow-hidden">
                                {/* Gradient circles */}
                                <div
                                    className="absolute w-48 h-48 rounded-full"
                                    style={{
                                        background: 'radial-gradient(circle, rgba(0,245,255,0.2) 0%, transparent 70%)',
                                        top: '-20%',
                                        right: '-10%',
                                        filter: 'blur(40px)',
                                        animation: 'float 6s ease-in-out infinite',
                                    }}
                                />
                                <div
                                    className="absolute w-36 h-36 rounded-full"
                                    style={{
                                        background: 'radial-gradient(circle, rgba(255,0,229,0.2) 0%, transparent 70%)',
                                        bottom: '-10%',
                                        left: '-5%',
                                        filter: 'blur(40px)',
                                        animation: 'float 8s ease-in-out infinite reverse',
                                    }}
                                />

                                {/* Code snippet decoration */}
                                <div className="relative z-10 text-left p-6 font-mono text-sm">
                                    <div className="flex gap-2 mb-4">
                                        <div className="w-3 h-3 rounded-full bg-red-500/60" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                                        <div className="w-3 h-3 rounded-full bg-green-500/60" />
                                    </div>
                                    <div style={{ color: 'var(--text-muted)' }}>
                                        <span style={{ color: 'var(--neon-violet)' }}>const</span>{' '}
                                        <span style={{ color: 'var(--neon-cyan)' }}>developer</span>{' '}
                                        <span style={{ color: 'var(--text-muted)' }}>=</span> {'{'}
                                    </div>
                                    <div className="pl-4" style={{ color: 'var(--text-secondary)' }}>
                                        <span style={{ color: 'var(--neon-green)' }}>name</span>: <span style={{ color: '#fbbf24' }}>&apos;Rafa Ramdani&apos;</span>,
                                    </div>
                                    <div className="pl-4" style={{ color: 'var(--text-secondary)' }}>
                                        <span style={{ color: 'var(--neon-green)' }}>role</span>: <span style={{ color: '#fbbf24' }}>&apos;Full-Stack Dev&apos;</span>,
                                    </div>
                                    <div className="pl-4" style={{ color: 'var(--text-secondary)' }}>
                                        <span style={{ color: 'var(--neon-green)' }}>passion</span>: <span style={{ color: '#fbbf24' }}>&apos;∞&apos;</span>,
                                    </div>
                                    <div className="pl-4" style={{ color: 'var(--text-secondary)' }}>
                                        <span style={{ color: 'var(--neon-green)' }}>coffee</span>: <span style={{ color: 'var(--neon-magenta)' }}>true</span>,
                                    </div>
                                    <div style={{ color: 'var(--text-muted)' }}>{'}'}</div>
                                </div>
                            </div>

                            {/* Floating badge */}
                            <div
                                className="absolute -top-4 -right-4 glass-card px-4 py-2 text-xs font-medium"
                                style={{
                                    animation: 'float 4s ease-in-out infinite',
                                    color: 'var(--neon-cyan)',
                                    border: '1px solid rgba(0,245,255,0.2)',
                                }}
                            >
                                ✨ Available for hire
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
