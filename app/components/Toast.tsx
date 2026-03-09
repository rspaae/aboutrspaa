'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ToastProps {
    message: string;
    type?: 'success' | 'error' | 'info';
    duration?: number;
    onClose: () => void;
}

export default function Toast({ message, type = 'success', duration = 3000, onClose }: ToastProps) {
    const [isVisible, setIsVisible] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onClose, 300); // Wait for fade out animation
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const colors = {
        success: 'var(--neon-green)',
        error: 'var(--neon-magenta)',
        info: 'var(--neon-cyan)',
    };

    const toastContent = (
        <div
            className={`fixed bottom-8 right-8 z-[9999] transition-all duration-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
        >
            <div
                className="glass-card px-6 py-4 flex items-center gap-4 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                style={{ borderLeft: `4px solid ${colors[type]}` }}
            >
                <div
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ backgroundColor: colors[type], boxShadow: `0 0 10px ${colors[type]}` }}
                />
                <span className="text-sm font-medium tracking-wide text-white/90">
                    {message}
                </span>
                <button
                    onClick={() => setIsVisible(false)}
                    className="ml-2 text-white/40 hover:text-white transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );

    // Use portal to render directly on document.body
    // This bypasses any parent transform that breaks position: fixed
    if (!mounted) return null;
    return createPortal(toastContent, document.body);
}
