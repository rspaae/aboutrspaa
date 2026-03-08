'use client';

import { useEffect, useRef } from 'react';

export default function FloatingParticles() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let w = window.innerWidth;
        let h = window.innerHeight;
        canvas.width = w;
        canvas.height = h;

        const mouse = { x: -1000, y: -1000 };
        const count = 25;

        // Create particles as plain data
        const particles = Array.from({ length: count }, () => ({
            x: Math.random() * w,
            y: Math.random() * h,
            baseX: 0,
            baseY: 0,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            size: Math.random() * 2.5 + 0.8,
            isCyan: Math.random() > 0.5,
            alpha: Math.random() * 0.3 + 0.1,
        }));
        particles.forEach(p => { p.baseX = p.x; p.baseY = p.y; });

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const handleResize = () => {
            w = window.innerWidth;
            h = window.innerHeight;
            canvas.width = w;
            canvas.height = h;
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('resize', handleResize, { passive: true });

        let raf: number;
        const draw = () => {
            ctx.clearRect(0, 0, w, h);

            for (const p of particles) {
                // Idle float
                p.x += p.vx;
                p.y += p.vy;

                // Bounce off edges gently
                if (p.x < 0 || p.x > w) p.vx *= -1;
                if (p.y < 0 || p.y > h) p.vy *= -1;

                // Mouse repulsion (simple distance check, no DOM calls)
                const dx = p.x - mouse.x;
                const dy = p.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120 && dist > 0) {
                    const force = (1 - dist / 120) * 1.5;
                    p.x += (dx / dist) * force;
                    p.y += (dy / dist) * force;
                }

                // Draw
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.isCyan
                    ? `rgba(0, 245, 255, ${p.alpha})`
                    : `rgba(139, 92, 246, ${p.alpha})`;
                ctx.fill();
            }

            raf = requestAnimationFrame(draw);
        };
        raf = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: 1 }}
        />
    );
}
