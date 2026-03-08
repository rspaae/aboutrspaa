'use client';

import { useEffect, useState } from 'react';
import { getLatestActivity, CommitActivity } from '../lib/github';

export default function CommitStatus() {
    const [activity, setActivity] = useState<CommitActivity | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchActivity = async () => {
            const data = await getLatestActivity();
            if (data) setActivity(data);
            setLoading(false);
        };
        fetchActivity();

        // Refresh every minute to stay "real-time"
        const interval = setInterval(fetchActivity, 60000);
        return () => clearInterval(interval);
    }, []);

    if (loading || !activity) return null;

    const timeAgo = (dateString: string) => {
        const now = new Date();
        const past = new Date(dateString);
        const diffInMs = now.getTime() - past.getTime();
        const diffInMins = Math.floor(diffInMs / (1000 * 60));

        if (diffInMins < 60) return `${diffInMins}m ago`;
        const diffInHours = Math.floor(diffInMins / 60);
        if (diffInHours < 24) return `${diffInHours}h ago`;
        return `${Math.floor(diffInHours / 24)}d ago`;
    };

    return (
        <a
            href={activity.url}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 group flex items-center gap-3 glass-card px-4 py-3 border border-white/10 hover:border-neon-cyan/40 transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
                background: 'rgba(10, 10, 15, 0.8)',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
            }}
        >
            {/* Status Indicator */}
            <div className="relative">
                <div className="w-2 h-2 rounded-full bg-neon-green" />
                <div className="absolute inset-0 w-2 h-2 rounded-full bg-neon-green animate-ping opacity-75" />
            </div>

            <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Latest Commit</span>
                    <span className="text-[10px] text-neon-cyan/60 font-mono">{timeAgo(activity.date)}</span>
                </div>
                <div className="flex flex-col max-w-[180px]">
                    <span className="text-xs font-bold text-white group-hover:text-neon-cyan transition-colors truncate">
                        {activity.repoName}
                    </span>
                    <span className="text-[10px] text-white/60 line-clamp-1 italic">
                        &quot;{activity.message}&quot;
                    </span>
                </div>
            </div>

            {/* GitHub Icon */}
            <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-white/80 group-hover:text-neon-cyan transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
            </div>
        </a>
    );
}
