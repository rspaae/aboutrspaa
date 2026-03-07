'use client';

import { useEffect, useState, useRef } from 'react';
import anime from 'animejs';

interface SpotifyData {
    isPlaying: boolean;
    title?: string;
    artist?: string;
    album?: string;
    albumImageUrl?: string;
    songUrl?: string;
}

export default function CurrentlyPlaying() {
    const [data, setData] = useState<SpotifyData>({ isPlaying: false });
    const [loading, setLoading] = useState(true);
    const barsRef = useRef<HTMLDivElement>(null);
    const coverRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const fetchSpotify = async () => {
            try {
                const res = await fetch('/api/spotify');
                const json = await res.json();
                setData(json);
            } catch (e) {
                console.error('Error fetching Spotify data', e);
            } finally {
                setLoading(false);
            }
        };

        fetchSpotify();
        // Poll every 15 seconds
        const interval = setInterval(fetchSpotify, 15000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // Equalizer animation
        if (data.isPlaying && barsRef.current) {
            const bars = barsRef.current.querySelectorAll('.eq-bar');
            anime({
                targets: bars,
                height: () => anime.random(4, 16),
                duration: 400,
                easing: 'easeInOutQuad',
                direction: 'alternate',
                loop: true,
                delay: anime.stagger(100),
            });
        }

        // Spinning vinyl animation
        if (data.isPlaying && coverRef.current) {
            anime({
                targets: coverRef.current,
                rotate: '360deg',
                duration: 8000,
                easing: 'linear',
                loop: true,
            });
        }
    }, [data.isPlaying]);

    if (loading) return null;

    return (
        <a
            href={data.isPlaying ? data.songUrl : 'https://spotify.com'}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 glass-card px-4 py-2 hover:bg-white/10 transition-colors"
            title={data.isPlaying ? `${data.title} by ${data.artist}` : 'Not playing anything'}
        >
            {/* Left Icon / Album Cover */}
            <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-white/5 flex items-center justify-center border border-white/10">
                {data.isPlaying && data.albumImageUrl ? (
                    <>
                        <img
                            ref={coverRef}
                            src={data.albumImageUrl}
                            alt={data.album || 'Album cover'}
                            className="w-full h-full object-cover"
                        />
                        {/* Vinyl hole */}
                        <div className="absolute w-2 h-2 rounded-full bg-black top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    </>
                ) : (
                    <svg className="w-4 h-4 text-white/40" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.54.659.3 1.02zm1.44-3.3c-.301.42-.84.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                    </svg>
                )}
            </div>

            {/* Text Information */}
            <div className="flex flex-col justify-center min-w-0 flex-1 max-w-[140px]">
                {data.isPlaying ? (
                    <>
                        <h4 className="text-[11px] font-bold truncate gradient-text mb-0.5">
                            {data.title}
                        </h4>
                        <p className="text-[10px] truncate text-white/50">
                            {data.artist}
                        </p>
                    </>
                ) : (
                    <>
                        <h4 className="text-[11px] font-bold text-white/80">
                            Spotify
                        </h4>
                        <p className="text-[10px] text-white/40">
                            Not playing
                        </p>
                    </>
                )}
            </div>

            {/* Equalizer Animation */}
            <div ref={barsRef} className="flex items-end h-4 gap-[2px] w-4 opacity-70">
                {data.isPlaying ? (
                    <>
                        <div className="eq-bar w-1 bg-neon-cyan rounded-t-sm h-1" />
                        <div className="eq-bar w-1 bg-neon-cyan rounded-t-sm h-3" />
                        <div className="eq-bar w-1 bg-neon-cyan rounded-t-sm h-2" />
                    </>
                ) : (
                    <>
                        <div className="w-1 bg-white/20 rounded-t-sm h-1" />
                        <div className="w-1 bg-white/20 rounded-t-sm h-1" />
                        <div className="w-1 bg-white/20 rounded-t-sm h-1" />
                    </>
                )}
            </div>
        </a>
    );
}
