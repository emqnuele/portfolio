"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import AboutHeader from "./about/AboutHeader";
import JourneyTimeline from "./about/JourneyTimeline";
import SkillsGrid from "./about/SkillsGrid";

export default function About() {
    return (
        <section id="about" className="px-4 sm:px-6 md:px-12 max-w-7xl mx-auto space-y-32 md:space-y-20 relative pb-24">

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
                className="relative z-10"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
                <div className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-10 md:p-14 overflow-hidden">
                    {/* glow */}
                    <div className="absolute -top-24 -right-24 w-72 h-72 bg-purple-600/20 blur-[90px] rounded-full pointer-events-none" />
                    <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-blue-600/10 blur-[70px] rounded-full pointer-events-none" />

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
                        <div>
                            <p className="font-mono text-xs text-zinc-500 tracking-[0.4em] uppercase mb-3">see it in action</p>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
                                Now check what I&apos;ve built.
                            </h2>
                            <p className="text-zinc-400 mt-3 max-w-sm text-sm sm:text-base">
                                Skills are one thing. Projects are where it gets real.
                            </p>
                        </div>
                        <Link
                            href="/projects"
                            className="group flex-shrink-0 flex items-center gap-3 px-6 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                        >
                            <span className="text-white font-semibold whitespace-nowrap">View Projects</span>
                            <ArrowRight size={16} className="text-zinc-400 group-hover:translate-x-1 group-hover:text-white transition-all duration-200" />
                        </Link>
                    </div>
                </div>
            </motion.div>

        </section>
    );
}
