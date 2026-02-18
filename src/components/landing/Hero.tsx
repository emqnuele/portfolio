"use client";

import { motion } from "framer-motion";
import BlurReveal from "@/components/ui/BlurReveal";
import TypewriterText from "@/components/ui/TypewriterText";
import { heroRoles } from "@/data/portfolio";

export default function Hero() {
    const scrollToAbout = () => {
        const nextSection = document.getElementById("about");
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className="relative z-10 flex min-h-screen flex-col items-center justify-center text-center px-4">
            {/* Kicker */}
            <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-sm md:text-base font-medium text-zinc-400 mb-4 tracking-widest uppercase font-mono"
            >
                who am i?
            </motion.p>

            {/* Main Title - Semantic <h1> via BlurReveal */}
            <BlurReveal
                text="Emanuele Faraci"
                as="h1"
                className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-bold text-white mb-6 font-sans tracking-tight"
                delay={0.4}
            />

            {/* SEO-visible subtitle (hidden visually but crawlable via sr-only) */}
            <p className="sr-only">
                Fullstack developer and automation builder specializing in Next.js, Python, AI agents, and bot workflows. Based in Modena, Italy.
            </p>

            {/* Subtext and Typewriter */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="text-[15px] sm:text-lg md:text-xl text-zinc-300 font-mono flex flex-col md:flex-row items-center gap-2 md:gap-3"
            >
                <span className="opacity-75">I&apos;m a</span>
                <TypewriterText
                    texts={heroRoles}
                    className="text-white font-semibold"
                    typingSpeed={80}
                    deletingSpeed={50}
                    pauseTime={2000}
                />
            </motion.div>



            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-24 md:bottom-12 cursor-pointer"
                onClick={scrollToAbout}
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white/70 hover:text-white transition-colors w-8 h-8"
                        aria-hidden="true"
                    >
                        <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                    </svg>
                </motion.div>
            </motion.div>
        </section>
    );
}
