'use client';

import { useRef, ReactNode } from 'react';
import anime from 'animejs';

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    href?: string;
}

export default function MagneticButton({ children, className = '', onClick, href }: MagneticButtonProps) {
    const btnRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        const el = btnRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;

        anime({
            targets: el,
            translateX: dx * 0.3,
            translateY: dy * 0.3,
            duration: 300,
            easing: 'easeOutQuad',
        });
    };

    const handleMouseLeave = () => {
        anime({
            targets: btnRef.current,
            translateX: 0,
            translateY: 0,
            duration: 600,
            easing: 'easeOutElastic(1, .5)',
        });
    };

    const baseClasses = `
    relative inline-flex items-center justify-center gap-2 px-7 py-3.5
    rounded-full font-semibold text-sm tracking-wide
    border border-white/10 bg-white/5 backdrop-blur-sm
    hover:border-neon-violet/50 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(139,92,246,0.2)]
    transition-colors duration-300 cursor-pointer
    ${className}
  `;

    if (href) {
        return (
            <a
                ref={btnRef as React.RefObject<HTMLAnchorElement>}
                href={href}
                className={baseClasses}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={onClick}
            >
                {children}
            </a>
        );
    }

    return (
        <button
            ref={btnRef as React.RefObject<HTMLButtonElement>}
            className={baseClasses}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
