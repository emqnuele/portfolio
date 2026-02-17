"use client";

import Image from "next/image";
import { journey, stats, skills } from "@/data/portfolio";
import type { SkillCategory } from "@/data/portfolio";
import { motion } from "framer-motion";
import BlurReveal from "@/components/ui/BlurReveal";
import { Monitor, Server, Brain, Bot, Cloud, type LucideIcon } from "lucide-react";




const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 }
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.6 }
    }
};

const iconMap: Record<string, LucideIcon> = { Monitor, Server, Brain, Bot, Cloud };

function SkillCard({ skill, idx }: { skill: SkillCategory; idx: number }) {
    const Icon = iconMap[skill.icon];
    return (
        <motion.div
            className="group relative rounded-2xl p-6 overflow-hidden
                       bg-white/[0.03] border border-white/[0.06]
                       backdrop-blur-md
                       hover:border-white/[0.12] transition-all duration-500"
            variants={fadeInUp}
            whileHover={{ y: -4, transition: { duration: 0.3 } }}
        >
            {/* Accent glow on hover */}
            <div
                className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[80px] opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none"
                style={{ background: `rgb(${skill.accent})` }}
            />

            {/* Icon + Title */}
            <div className="flex items-center gap-3 mb-3">
                {Icon && <Icon className="w-5 h-5" style={{ color: `rgb(${skill.accent})` }} strokeWidth={1.5} />}
                <h3 className="text-lg font-bold text-white">{skill.title}</h3>
            </div>

            {/* Description */}
            <p className="text-zinc-400 text-sm leading-relaxed mb-5">{skill.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
                {skill.tags.map((tag) => (
                    <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full text-[11px] font-mono tracking-wide
                                   bg-white/[0.04] border border-white/[0.08] text-zinc-300
                                   group-hover:border-white/[0.15] transition-colors"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </motion.div>
    );
}

export default function About() {


    return (
        <section id="about" className="px-4 sm:px-6 md:px-12 max-w-7xl mx-auto space-y-32 md:space-y-20 relative pb-24 md:pb-0">

            {/* Aura Background */}
            <div className="absolute inset-x-0 top-0 h-[800px] pointer-events-none opacity-40">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/30 blur-[120px] rounded-full mix-blend-screen" />
                <div className="absolute top-20 left-0 w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full mix-blend-screen" />
            </div>

            {/* 1. Header: Split Layout (Text Left / Image Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-12 items-center relative z-10 lg:min-h-[calc(100vh-6rem)]">

                {/* Text Column */}
                <motion.div
                    className="lg:order-1 space-y-8 text-center lg:text-left items-center lg:items-start flex flex-col"
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                >
                    <div className="space-y-3">
                        <motion.p variants={fadeInUp} className="font-mono text-xs text-zinc-500 tracking-[0.4em] uppercase">
                            about me
                        </motion.p>
                        {/* Semantic <h1> for this page */}
                        <div className="flex flex-wrap items-baseline gap-x-3 sm:gap-x-4 leading-[0.9]">
                            <BlurReveal text="Emanuele" as="h1" className="text-4xl sm:text-6xl md:text-8xl font-bold text-white tracking-tight" />
                            <BlurReveal text="Faraci" as="span" className="text-4xl sm:text-6xl md:text-8xl font-bold text-zinc-500 tracking-tight" delay={0.5} />
                        </div>
                    </div>

                    {/* Mobile Image (Visible only on mobile) */}
                    <div className="lg:hidden flex justify-center">
                        <div className="relative w-[min(320px,85vw)] aspect-[3/4] rounded-[clamp(24px,5vw,40px)] overflow-hidden bg-zinc-900 border border-zinc-800 shadow-[0_40px_100px_rgba(4,0,15,0.55)]">
                            <div className="absolute inset-0 bg-gradient-to-br from-[rgba(4,3,10,0.15)] to-[rgba(58,18,108,0.4)] mix-blend-screen pointer-events-none z-10" />
                            <Image
                                src="/about/ema.webp"
                                alt="Emanuele Faraci – fullstack developer and automation builder"
                                fill
                                className="object-cover saturate-0 hover:saturate-100 transition-all duration-700"
                                priority
                            />
                        </div>
                    </div>

                    <motion.p variants={fadeInUp} className="text-base sm:text-lg md:text-xl text-zinc-300 leading-relaxed max-w-lg text-center lg:text-left">
                        CS student in the morning, web and application builder by sunset. I move across Next.js, Node.js, AI, and Python.
                    </motion.p>

                    <motion.dl variants={staggerContainer} className="grid grid-cols-2 gap-x-6 sm:gap-x-8 md:gap-x-12 gap-y-6 md:gap-y-8 pt-6 mt-2 w-full text-left">
                        {stats.map(stat => (
                            <motion.div key={stat.label} variants={fadeInUp} className="border-t border-white/20 pt-3 md:pt-4">
                                <dt className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.3em] mb-1.5 md:mb-2">{stat.label}</dt>
                                <dd className="text-zinc-200 text-base md:text-lg font-medium">{stat.value}</dd>
                            </motion.div>
                        ))}
                    </motion.dl>
                </motion.div>

                {/* Image Column (Desktop Only) */}
                <motion.div
                    className="hidden lg:flex order-1 lg:order-2 justify-center lg:justify-end"
                    initial={{ opacity: 0, x: 40, filter: "blur(10px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                >
                    {/* UPDATED STYLES: Taller aspect ratio, cleaner shadows */}
                    <div className="relative w-full max-w-[240px] md:max-w-[340px] aspect-[3/4.5] rounded-[32px] md:rounded-[48px] overflow-hidden bg-zinc-900 border border-zinc-800 shadow-[0_50px_120px_rgba(4,0,15,0.55)]">
                        {/* Overlay Effect per User Request */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(4,3,10,0.15)] to-[rgba(58,18,108,0.4)] mix-blend-screen pointer-events-none z-10" />

                        <Image
                            src="/about/ema.webp"
                            alt="Emanuele Faraci – fullstack developer and automation builder"
                            fill
                            className="object-cover saturate-0 hover:saturate-100 transition-all duration-700"
                            priority
                        />
                    </div>
                </motion.div>
            </div>


            {/* 2. Journey Timeline */}
            <div className="relative z-10 max-w-4xl mx-auto">
                <motion.div
                    className="text-center mb-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={fadeInUp}
                >
                    <p className="font-mono text-xs text-blue-400 tracking-widest uppercase mb-2">JOURNEY</p>
                    <h2 className="text-3xl md:text-5xl font-bold text-white">My Career</h2>
                </motion.div>

                <div className="relative">
                    {/* Continuous Line Background for Desktop */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-zinc-800 -translate-x-1/2" />

                    <div className="space-y-4">
                        {journey.map((item, idx) => (
                            <motion.div
                                key={idx}
                                className="group relative md:grid md:grid-cols-[1fr_auto_1fr] md:gap-16 items-start pb-24 md:pb-36 last:pb-0"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                            >
                                {/* Mobile: Line & Dot */}
                                <div className="md:hidden absolute left-[7px] top-[8px] bottom-0 w-[1px] bg-zinc-800" />
                                <div className="md:hidden absolute left-0 top-[5px] w-4 h-4 rounded-full border-4 border-black bg-zinc-700 group-hover:bg-purple-500 transition-colors" />

                                {/* Period (Left or Right based on index) - Desktop */}
                                <div className={`hidden md:block md:pt-[0.35rem] md:row-start-1 ${idx % 2 !== 0 ? 'md:col-start-3 md:text-left' : 'md:col-start-1 md:text-right'}`}>
                                    <span className="font-mono text-purple-400 text-xs tracking-[0.2em] uppercase">{item.period}</span>
                                </div>

                                {/* Center Marker - Desktop */}
                                <div className="hidden md:flex flex-col items-center justify-start h-full relative col-start-2 row-start-1 w-3">
                                    <div className="w-3 h-3 rounded-full bg-zinc-900 border-2 border-zinc-500 group-hover:border-purple-500 group-hover:scale-125 transition-all z-10 mt-[0.55rem] shrink-0" />
                                </div>

                                {/* Content */}
                                <div className={`pl-8 md:pl-0 md:row-start-1 ${idx % 2 !== 0 ? 'md:col-start-1 md:text-right' : 'md:col-start-3'}`}>
                                    {/* Mobile Period */}
                                    <div className="md:hidden mb-2 pt-1">
                                        <span className="font-mono text-purple-400 text-xs tracking-[0.2em] uppercase">{item.period}</span>
                                    </div>

                                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-tight">{item.title}</h3>
                                    <ul className={`space-y-1 text-zinc-400 text-sm md:text-base leading-normal ${idx % 2 !== 0 ? 'md:ml-auto' : ''}`}>
                                        {item.details.map((d, i) => (
                                            <li key={i}>{d}</li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>


            {/* 3. Skills Grid */}
            <motion.div
                className="relative z-10 py-12 max-w-6xl mx-auto"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={staggerContainer}
            >
                <div className="text-center mb-16">
                    <motion.p variants={fadeInUp} className="font-mono text-xs text-green-400 tracking-widest uppercase mb-2">WHAT I CAN DO</motion.p>
                    <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold text-white mb-4">My Skills</motion.h2>
                    <motion.p variants={fadeInUp} className="text-zinc-400 max-w-xl mx-auto">From expressive UI to shipping agents that sync backends.</motion.p>
                </div>

                {/* Top row: 3 cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
                    {skills.slice(0, 3).map((skill, idx) => (
                        <SkillCard key={skill.title} skill={skill} idx={idx} />
                    ))}
                </div>

                {/* Bottom row: 2 cards, centered */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
                    {skills.slice(3).map((skill, idx) => (
                        <SkillCard key={skill.title} skill={skill} idx={idx + 3} />
                    ))}
                </div>
            </motion.div>

        </section>
    );
}
