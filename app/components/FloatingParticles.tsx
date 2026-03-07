'use client';

import { useEffect, useRef } from 'react';
import anime from 'animejs';

interface Particle {
    el: HTMLDivElement;
    x: number;
    y: number;
    baseX: number;
    baseY: number;
    size: number;
}

export default function FloatingParticles() {
    const containerRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const rafRef = useRef<number>(0);

    useEffect(() => {
        if (!containerRef.current) return;
        const container = containerRef.current;
        const particles: Particle[] = [];
        const count = 35;

        for (let i = 0; i < count; i++) {
            const el = document.createElement('div');
            const size = Math.random() * 4 + 1;
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;

            el.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: ${Math.random() > 0.5
                    ? `rgba(0, 245, 255, ${Math.random() * 0.4 + 0.1})`
                    : `rgba(139, 92, 246, ${Math.random() * 0.4 + 0.1})`
                };
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        transition: none;
      `;

            container.appendChild(el);
            particles.push({ el, x, y, baseX: x, baseY: y, size });

            // Idle floating animation
            anime({
                targets: el,
                translateX: () => anime.random(-60, 60),
                translateY: () => anime.random(-60, 60),
                opacity: [
                    { value: Math.random() * 0.5 + 0.2, duration: anime.random(2000, 4000) },
                    { value: Math.random() * 0.3 + 0.1, duration: anime.random(2000, 4000) },
                ],
                easing: 'easeInOutSine',
                duration: anime.random(5000, 10000),
                direction: 'alternate',
                loop: true,
                delay: anime.random(0, 3000),
            });
        }

        particlesRef.current = particles;

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Cursor-reactive loop
        const react = () => {
            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;
            particles.forEach((p) => {
                const rect = p.el.getBoundingClientRect();
                const px = rect.left + rect.width / 2;
                const py = rect.top + rect.height / 2;
                const dx = px - mx;
                const dy = py - my;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const maxDist = 150;

                if (dist < maxDist) {
                    const force = (1 - dist / maxDist) * 30;
                    const ax = (dx / dist) * force;
                    const ay = (dy / dist) * force;
                    anime({
                        targets: p.el,
                        translateX: `+=${ax}`,
                        translateY: `+=${ay}`,
                        duration: 300,
                        easing: 'easeOutQuad',
                    });
                }
            });
            rafRef.current = requestAnimationFrame(react);
        };
        rafRef.current = requestAnimationFrame(react);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(rafRef.current);
            particles.forEach((p) => p.el.remove());
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 overflow-hidden pointer-events-none"
            style={{ zIndex: 1 }}
        />
    );
}
