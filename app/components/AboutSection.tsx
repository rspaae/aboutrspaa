'use client';

import ScrollReveal from './ScrollReveal';
import TiltCard from './TiltCard';
import TextScramble from './TextScramble';
import { useLanguage } from '../context/LanguageContext';

export default function AboutSection() {
    const { t } = useLanguage();
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
                                    {t('about.title')}
                                </span>
                            </div>
                            <h2
                                className="section-heading text-4xl md:text-5xl mb-6"
                                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                            >
                                <TextScramble text={t('about.subtitle')} as="span" />
                                <br />
                                <span className="gradient-text">
                                    <TextScramble text={t('about.highlight')} as="span" />
                                </span>
                            </h2>
                            <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                                {t('about.paragraph1')}
                            </p>
                            <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
                                {t('about.paragraph2')}
                            </p>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-6">
                                {[
                                    { number: '1+', label: t('about.experience') },
                                    { number: '20+', label: t('about.projects') },
                                    { number: '10+', label: t('tech.title') },
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
                            {/* Profile Card */}
                            <TiltCard className="glass-card relative w-full max-w-[380px] p-8 flex flex-col items-center justify-center overflow-hidden">
                                {/* Gradient circles */}
                                <div
                                    className="absolute w-48 h-48 rounded-full pointer-events-none"
                                    style={{
                                        background: 'radial-gradient(circle, rgba(0,245,255,0.15) 0%, transparent 70%)',
                                        top: '-10%',
                                        right: '-10%',
                                        filter: 'blur(40px)',
                                        animation: 'float 6s ease-in-out infinite',
                                    }}
                                />
                                <div
                                    className="absolute w-36 h-36 rounded-full pointer-events-none"
                                    style={{
                                        background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)',
                                        bottom: '-5%',
                                        left: '-5%',
                                        filter: 'blur(40px)',
                                        animation: 'float 8s ease-in-out infinite reverse',
                                    }}
                                />

                                {/* Profile Image */}
                                <div className="relative w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-[3px] border-white/10 mb-6 z-10 p-1">
                                    <div className="w-full h-full rounded-full overflow-hidden bg-white/5 relative group">
                                        <img
                                            src="/profile.jpg"
                                            alt="Rafa Ramdani"
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=Rafa+Ramdani&background=8b5cf6&color=fff&size=200';
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Profile Info */}
                                <div className="w-full relative z-10 space-y-4 font-mono text-xs md:text-sm border-t border-white/10 pt-6">
                                    <div className="flex justify-between items-center" style={{ color: 'var(--text-secondary)' }}>
                                        <span style={{ color: 'var(--neon-green)' }}>{t('about.profile.name')}</span>
                                        <span className="text-white font-medium">Rafa Ramdani</span>
                                    </div>
                                    <div className="flex justify-between items-center" style={{ color: 'var(--text-secondary)' }}>
                                        <span style={{ color: 'var(--neon-cyan)' }}>{t('about.profile.age')}</span>
                                        <span className="text-white font-medium">{t('about.profile.ageValue')}</span>
                                    </div>
                                    <div className="flex justify-between items-center" style={{ color: 'var(--text-secondary)' }}>
                                        <span style={{ color: 'var(--neon-violet)' }}>{t('about.profile.school')}</span>
                                        <span className="text-white font-medium text-right max-w-[150px] truncate" title={t('about.profile.schoolValue')}>{t('about.profile.schoolValue')}</span>
                                    </div>
                                    <div className="flex justify-between items-center" style={{ color: 'var(--text-secondary)' }}>
                                        <span style={{ color: 'var(--neon-magenta)' }}>{t('about.profile.email')}</span>
                                        <a href="mailto:rafaramdanii31@gmail.com" className="text-white font-medium hover:text-[var(--neon-cyan)] transition-colors truncate max-w-[150px]" title="rafaramdanii31@gmail.com">rafaramdanii31@gmail.com</a>
                                    </div>
                                    <div className="flex justify-between items-center" style={{ color: 'var(--text-secondary)' }}>
                                        <span style={{ color: '#fbbf24' }}>{t('about.profile.ig')}</span>
                                        <a href="https://instagram.com/inirspaa" target="_blank" rel="noopener noreferrer" className="text-white font-medium hover:text-[var(--neon-cyan)] transition-colors">@inirspaa</a>
                                    </div>
                                </div>
                            </TiltCard>

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
