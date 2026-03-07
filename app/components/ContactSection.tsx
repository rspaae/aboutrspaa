'use client';

import ScrollReveal from './ScrollReveal';
import MagneticButton from './MagneticButton';

const socialLinks = [
    {
        name: 'GitHub',
        href: 'https://github.com/rspaae',
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
        ),
    },
    {
        name: 'Instagram',
        href: 'https://instagram.com/inirspaa',
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
        ),
    },
    {
        name: 'Email',
        href: 'mailto:rafaramdanii31@gmail.com',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
    },
];

export default function ContactSection() {
    return (
        <section id="contact" className="relative py-24 md:py-32" style={{ zIndex: 2 }}>
            {/* Top accent line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--neon-cyan), transparent)' }} />

            <div className="max-w-4xl mx-auto px-6 text-center">
                <ScrollReveal>
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="h-px w-[60px]" style={{ background: 'linear-gradient(90deg, transparent, var(--neon-green))' }} />
                        <span className="text-sm font-medium uppercase tracking-[0.3em]" style={{ color: 'var(--neon-green)' }}>
                            Contact
                        </span>
                        <div className="h-px w-[60px]" style={{ background: 'linear-gradient(90deg, var(--neon-green), transparent)' }} />
                    </div>
                    <h2
                        className="section-heading text-4xl md:text-6xl gradient-text mb-6"
                    >
                        Let&apos;s Work Together
                    </h2>
                    <p className="text-base md:text-lg max-w-lg mx-auto mb-12" style={{ color: 'var(--text-secondary)' }}>
                        Have a project in mind? I&apos;d love to hear about it. Let&apos;s create something extraordinary together.
                    </p>
                </ScrollReveal>

                {/* CTA Button */}
                <ScrollReveal delay={200}>
                    <div className="mb-16">
                        <MagneticButton
                            href="mailto:hello@rspaa.dev"
                            className="!px-10 !py-4 !text-base !bg-gradient-to-r !from-neon-cyan/20 !to-neon-violet/20 !border-neon-violet/30"
                        >
                            <span className="gradient-text font-bold">Say Hello 👋</span>
                        </MagneticButton>
                    </div>
                </ScrollReveal>

                {/* Social Links */}
                <ScrollReveal delay={400}>
                    <div className="flex items-center justify-center gap-4">
                        {socialLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                                style={{
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    color: 'var(--text-secondary)',
                                }}
                                title={link.name}
                            >
                                <span className="group-hover:text-white transition-colors duration-300">
                                    {link.icon}
                                </span>
                            </a>
                        ))}
                    </div>
                </ScrollReveal>

                {/* Footer */}
                <div className="mt-24 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                        © {new Date().getFullYear()} <span className="gradient-text font-medium">Rafa Ramdani</span>. Crafted with passion & code.
                    </p>
                </div>
            </div>
        </section>
    );
}
