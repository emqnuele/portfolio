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
                className="relative z-10 text-center py-12"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
                <p className="font-mono text-xs text-zinc-500 tracking-[0.4em] uppercase mb-4">see it in action</p>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                    Now check what I&apos;ve built.
                </h2>
                <p className="text-zinc-400 max-w-md mx-auto mb-10">
                    Skills are one thing. Projects are where it gets real.
                </p>
                <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-colors duration-200 group"
                >
                    View Projects
                    <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                </Link>
            </motion.div>

        </section>
    );
}
