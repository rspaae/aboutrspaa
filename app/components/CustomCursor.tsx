'use client';

import { useEffect, useRef, useCallback } from 'react';

export default function CustomCursor() {
    const containerRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);
    const mouseRef = useRef({ x: -100, y: -100 });
    const ringPosRef = useRef({ x: -100, y: -100 });
    const isHoveredRef = useRef(false);
    const rafRef = useRef<number>(0);
    const lastTrailTime = useRef(0);
    const trailPoolRef = useRef<HTMLDivElement[]>([]);
    const trailIndexRef = useRef(0);

    const TRAIL_POOL_SIZE = 12;

    const createRipple = useCallback((x: number, y: number) => {
        if (!containerRef.current) return;
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 0;
            height: 0;
            border-radius: 50%;
            border: 1.5px solid rgba(0, 245, 255, 0.5);
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 9998;
        `;
        containerRef.current.appendChild(ripple);

        let size = 0;
        let opacity = 0.6;
        const expandRipple = () => {
            size += 5;
            opacity -= 0.025;
            ripple.style.width = `${size}px`;
            ripple.style.height = `${size}px`;
            ripple.style.opacity = `${Math.max(0, opacity)}`;
            if (opacity > 0) {
                requestAnimationFrame(expandRipple);
            } else {
                ripple.remove();
            }
        };
        requestAnimationFrame(expandRipple);
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (window.innerWidth < 768) return;
        if (!containerRef.current) return;

        // Pre-create trail dot pool (reuse DOM elements)
        const pool: HTMLDivElement[] = [];
        for (let i = 0; i < TRAIL_POOL_SIZE; i++) {
            const el = document.createElement('div');
            el.style.cssText = `
                position: fixed;
                width: 3px;
                height: 3px;
                border-radius: 50%;
                background: rgba(0, 245, 255, 0.6);
                pointer-events: none;
                z-index: 9997;
                opacity: 0;
                will-change: transform, opacity;
            `;
            containerRef.current.appendChild(el);
            pool.push(el);
        }
        trailPoolRef.current = pool;

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };

            // Spawn trail using pool
            const now = Date.now();
            if (now - lastTrailTime.current > 70) {
                lastTrailTime.current = now;
                const dot = trailPoolRef.current[trailIndexRef.current % TRAIL_POOL_SIZE];
                trailIndexRef.current++;
                dot.style.left = `${e.clientX}px`;
                dot.style.top = `${e.clientY}px`;
                dot.style.opacity = '0.6';
                dot.style.transform = 'translate(-50%, -50%) scale(1)';

                // Fade out
                setTimeout(() => {
                    dot.style.transition = 'opacity 0.4s, transform 0.4s';
                    dot.style.opacity = '0';
                    dot.style.transform = 'translate(-50%, -50%) scale(0.2)';
                    setTimeout(() => {
                        dot.style.transition = 'none';
                    }, 400);
                }, 16);
            }
        };

        const handleClick = (e: MouseEvent) => {
            createRipple(e.clientX, e.clientY);
        };

        const handleHoverStart = () => { isHoveredRef.current = true; };
        const handleHoverEnd = () => { isHoveredRef.current = false; };

        // Animation loop for ring — fast lerp, no CSS transition on transform
        const animate = () => {
            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;
            const hovered = isHoveredRef.current;

            // Fast lerp — 0.25 for snappy feel
            ringPosRef.current.x += (mx - ringPosRef.current.x) * 0.25;
            ringPosRef.current.y += (my - ringPosRef.current.y) * 0.25;

            if (ringRef.current) {
                const scale = hovered ? 2 : 1;
                ringRef.current.style.transform = `translate(${ringPosRef.current.x - 18}px, ${ringPosRef.current.y - 18}px) scale(${scale})`;
                ringRef.current.style.borderColor = hovered
                    ? 'rgba(0, 245, 255, 0.7)'
                    : 'rgba(0, 245, 255, 0.25)';
            }

            if (dotRef.current) {
                dotRef.current.style.transform = `translate(${mx - 3}px, ${my - 3}px) scale(${hovered ? 0 : 1})`;
            }

            rafRef.current = requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('click', handleClick);

        const attachHover = () => {
            const els = document.querySelectorAll('a, button, .interactive, [role="button"]');
            els.forEach((el) => {
                el.addEventListener('mouseenter', handleHoverStart);
                el.addEventListener('mouseleave', handleHoverEnd);
            });
            return els;
        };

        const els = attachHover();
        rafRef.current = requestAnimationFrame(animate);

        const mutObs = new MutationObserver(() => { attachHover(); });
        mutObs.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('click', handleClick);
            cancelAnimationFrame(rafRef.current);
            mutObs.disconnect();
            els.forEach((el) => {
                el.removeEventListener('mouseenter', handleHoverStart);
                el.removeEventListener('mouseleave', handleHoverEnd);
            });
            pool.forEach(el => el.remove());
        };
    }, [createRipple]);

    return (
        <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
            {/* Glow ring — NO CSS transition on transform for instant response */}
            <div
                ref={ringRef}
                className="fixed top-0 left-0 w-9 h-9 rounded-full pointer-events-none"
                style={{
                    border: '1.5px solid rgba(0, 245, 255, 0.25)',
                    transition: 'border-color 0.2s, scale 0.15s',
                    mixBlendMode: 'screen',
                    willChange: 'transform',
                }}
            />
            {/* Center dot — direct position, no transition */}
            <div
                ref={dotRef}
                className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none"
                style={{
                    background: 'var(--neon-cyan)',
                    boxShadow: '0 0 6px rgba(0, 245, 255, 0.8)',
                    willChange: 'transform',
                }}
            />
        </div>
    );
}
