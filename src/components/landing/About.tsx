"use client";

import AboutHeader from "./about/AboutHeader";
import JourneyTimeline from "./about/JourneyTimeline";
import SkillsGrid from "./about/SkillsGrid";

export default function About() {
    return (
        <section id="about" className="px-4 sm:px-6 md:px-12 max-w-7xl mx-auto space-y-32 md:space-y-20 relative pb-24 md:pb-0">

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

        </section>
    );
}
