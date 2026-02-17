import Link from "next/link";

export default function NotFound() {
    return (
        <main className="relative z-10 flex min-h-screen flex-col items-center justify-center text-center px-4">
            <p className="font-mono text-xs text-zinc-500 tracking-[0.4em] uppercase mb-4">
                404
            </p>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                Page not found
            </h1>
            <p className="text-zinc-400 text-lg max-w-md mb-10 leading-relaxed">
                The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                <Link
                    href="/"
                    className="px-6 py-3 rounded-full bg-white/10 border border-white/10 text-white text-sm font-medium hover:bg-white/20 hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
                >
                    Back to Home
                </Link>
            </div>
        </main>
    );
}
