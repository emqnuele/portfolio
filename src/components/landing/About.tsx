"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import AboutHeader from "./about/AboutHeader";
import JourneyTimeline from "./about/JourneyTimeline";
import SkillsGrid from "./about/SkillsGrid";

export default function About() {
    return (
        <section id="about" className="px-4 sm:px-6 md:px-12 max-w-7xl mx-auto space-y-32 md:space-y-20 relative pb-8 md:pb-24">

            {/* Aura Background */}
            <div className="absolute inset-x-0 top-0 h-[800px] pointer-events-none opacity-40">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/30 blur-[120px] rounded-full mix-blend-screen" />
                <div className="absolute top-20 left-0 w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full mix-blend-screen" />
            </div>

            {/* 1. Header: Split Layout (Text Left / Image Right) */}
            <AboutHeader />

            {/* 2. Journey Timeline */}
            <JourneyTimeline />

            {/* 3. Skills Grid */}
            <SkillsGrid />

            {/* 4. Projects CTA */}
            <motion.div
                className="relative z-10 border-t border-white/10 pt-10 pb-4"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
                    <div>
                        <p className="font-mono text-xs text-zinc-500 tracking-[0.4em] uppercase mb-3">see it in action</p>
                        <h2 className="text-2xl sm:text-3xl font-bold text-white">Now check what I&apos;ve built.</h2>
                        <p className="text-zinc-500 mt-2 text-sm">Skills are one thing. Projects are where it gets real.</p>
                    </div>
                    <Link
                        href="/projects"
                        className="group flex-shrink-0 self-start sm:self-auto flex items-center gap-2 text-white font-semibold text-sm hover:text-zinc-300 transition-colors duration-200"
                    >
                        View Projects
                        <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
                    </Link>
                </div>
            </motion.div>

        </section>
    );
}
