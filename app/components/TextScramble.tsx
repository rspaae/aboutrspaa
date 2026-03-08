'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface TextScrambleProps {
    text: string;
    className?: string;
    style?: React.CSSProperties;
    as?: 'h1' | 'h2' | 'h3' | 'span' | 'p';
    scrambleSpeed?: number;
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@&%';

export default function TextScramble({
    text,
    className = '',
    style = {},
    as: Tag = 'span',
    scrambleSpeed = 25,
}: TextScrambleProps) {
    // Start with the REAL text so it never looks broken
    const [displayText, setDisplayText] = useState(text);
    const [hasScrambled, setHasScrambled] = useState(false);
    const elRef = useRef<HTMLElement>(null);
    const timeoutsRef = useRef<number[]>([]);

    const scramble = useCallback(() => {
        if (hasScrambled) return;
        setHasScrambled(true);

        const chars = text.split('');
        const totalChars = chars.filter(c => c !== ' ').length;
        const revealed = new Array(chars.length).fill(false);
        // Mark spaces as already revealed
        chars.forEach((c, i) => { if (c === ' ') revealed[i] = true; });
        let revealedCount = 0;

        // Scramble phase — rapidly randomize all for a few frames
        let scrambleFrames = 0;
        const maxScrambleFrames = 6;

        const update = () => {
            scrambleFrames++;

            if (scrambleFrames <= maxScrambleFrames) {
                // Pure scramble phase
                const display = chars
                    .map(c => c === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)])
                    .join('');
                setDisplayText(display);
                timeoutsRef.current.push(window.setTimeout(update, scrambleSpeed));
                return;
            }

            // Reveal 2-3 characters per frame for speed
            const revealPerFrame = Math.max(2, Math.ceil(totalChars / 8));
            for (let r = 0; r < revealPerFrame && revealedCount < totalChars; r++) {
                // Find random unrevealed
                let nextIdx = -1;
                for (let attempts = 0; attempts < chars.length * 3; attempts++) {
                    const idx = Math.floor(Math.random() * chars.length);
                    if (!revealed[idx]) {
                        nextIdx = idx;
                        break;
                    }
                }
                if (nextIdx === -1) {
                    for (let i = 0; i < chars.length; i++) {
                        if (!revealed[i]) { nextIdx = i; break; }
                    }
                }
                if (nextIdx !== -1) {
                    revealed[nextIdx] = true;
                    revealedCount++;
                }
            }

            const display = chars
                .map((char, i) => {
                    if (revealed[i]) return char;
                    return CHARS[Math.floor(Math.random() * CHARS.length)];
                })
                .join('');

            setDisplayText(display);

            if (revealedCount < totalChars) {
                timeoutsRef.current.push(window.setTimeout(update, scrambleSpeed));
            }
        };

        timeoutsRef.current.push(window.setTimeout(update, 50));
    }, [text, scrambleSpeed, hasScrambled]);

    useEffect(() => {
        const el = elRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasScrambled) {
                    scramble();
                }
            },
            { threshold: 0.2 }
        );

        observer.observe(el);

        return () => {
            observer.disconnect();
            timeoutsRef.current.forEach(t => clearTimeout(t));
        };
    }, [scramble, hasScrambled]);

    return (
        <Tag
            ref={elRef as React.RefObject<HTMLElement & HTMLHeadingElement & HTMLParagraphElement & HTMLSpanElement>}
            className={className}
            style={style}
        >
            {displayText}
        </Tag>
    );
}
