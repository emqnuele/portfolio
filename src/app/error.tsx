"use client";

import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <main className="relative z-10 flex min-h-screen flex-col items-center justify-center text-center px-4">
            <p className="font-mono text-xs text-red-400 tracking-[0.4em] uppercase mb-4">
                Something went wrong
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 tracking-tight">
                Unexpected Error
            </h1>
            <p className="text-zinc-400 text-lg max-w-md mb-10 leading-relaxed">
                An error occurred while loading this page. Please try again.
            </p>
            <button
                onClick={reset}
                className="px-6 py-3 rounded-full bg-white/10 border border-white/10 text-white text-sm font-medium hover:bg-white/20 hover:border-white/20 transition-all duration-300 backdrop-blur-sm cursor-pointer"
            >
                Try again
            </button>
        </main>
    );
}
