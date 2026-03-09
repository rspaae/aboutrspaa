'use client';

export default function SkeletonLoader({ className = '' }: { className?: string }) {
    return (
        <div className={`relative overflow-hidden bg-white/5 rounded-2xl ${className}`}>
            {/* Shimmer effect */}
            <div className="absolute inset-0 -translate-x-full animate-[shimmer-skeleton_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* Content placeholders */}
            <div className="p-8 h-full flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-white/10 mb-6" />
                <div className="h-4 w-2/3 bg-white/10 rounded mb-4" />
                <div className="h-8 w-full bg-white/10 rounded mb-4" />
                <div className="mt-auto flex gap-2">
                    <div className="h-6 w-16 bg-white/10 rounded-full" />
                    <div className="h-6 w-16 bg-white/10 rounded-full" />
                </div>
            </div>
        </div>
    );
}
