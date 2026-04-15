"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Monitor, Server, Brain, Bot, Cloud } from "lucide-react";
import { skills } from "@/data/portfolio";

const iconMap: Record<string, any> = { Monitor, Server, Brain, Bot, Cloud };

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.85, y: 24 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
};

const STEP = 1.7;
const N = 5;

export default function SkillsPreview() {
    const sectionRef = useRef<HTMLElement>(null);
    const inView = useInView(sectionRef, { margin: "0px 0px -10% 0px" });

    return (
        <section ref={sectionRef} className="relative z-10 px-4 pt-24 md:pt-40 pb-16 md:pb-24 max-w-7xl mx-auto border-t border-white/5">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-20 gap-4 md:gap-8">
                <motion.div
                    initial={{ opacity: 0, scale: 1.1, x: -20 }}
                    whileInView={{ opacity: 1, scale: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="max-w-2xl text-center md:text-left w-full md:w-auto"
                >
                    <h2 className="text-3xl md:text-6xl font-bold text-white leading-none tracking-tight">
                        Technical <span className="text-zinc-500">Expertise.</span>
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="pb-2 md:pb-4 w-full md:w-auto flex justify-center md:justify-end"
                >
                    <Link
                        href="/about"
                        className="group flex items-center gap-2 text-sm font-bold text-zinc-400 hover:text-white transition-colors uppercase tracking-[0.2em]"
                    >
                        More about me <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </div>

            <motion.div
                className="grid grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-12 md:gap-12 lg:gap-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                {skills.map((skill, index) => {
                    const Icon = iconMap[skill.icon];
                    const accent = `rgb(${skill.accent})`;
                    const delay = index * STEP * 0.5;
                    const repeatDelay = (N - 2) * STEP * 0.5;

                    return (
                        <motion.div
                            key={skill.title}
                            variants={itemVariants}
                            className="relative"
                        >
                            <div className="flex flex-col items-center md:items-start text-center md:text-left gap-3 md:gap-5">
                                <div className="relative w-fit">
                                    <motion.div
                                        className="absolute inset-0 blur-lg rounded-full"
                                        style={{ background: accent }}
                                        animate={inView ? { opacity: [0, 0.45, 0] } : { opacity: 0 }}
                                        transition={{ duration: STEP, repeat: Infinity, ease: "easeInOut", delay, repeatDelay }}
                                    />
                                    <div className="relative p-3 rounded-xl bg-white/5 border border-white/5">
                                        {Icon && <Icon size={24} style={{ color: accent }} strokeWidth={1.5} />}
                                    </div>
                                </div>

                                <div className="space-y-1 md:space-y-3">
                                    <motion.h3
                                        className="text-lg font-bold tracking-tight"
                                        animate={inView ? { color: ["#ffffff", accent, "#ffffff"] } : { color: "#ffffff" }}
                                        transition={{ duration: STEP, repeat: Infinity, ease: "easeInOut", delay, repeatDelay }}
                                    >
                                        {skill.title}
                                    </motion.h3>

                                    <div className="flex flex-col md:flex-col gap-1.5 items-center md:items-start">
                                        {skill.tags.slice(0, 3).map(tag => (
                                            <motion.span
                                                key={tag}
                                                className="text-[10px] font-mono uppercase tracking-widest"
                                                animate={inView ? { color: ["#52525b", "#a1a1aa", "#52525b"] } : { color: "#52525b" }}
                                                transition={{ duration: STEP, repeat: Infinity, ease: "easeInOut", delay, repeatDelay }}
                                            >
                                                {tag}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* sequential luminous stripe */}
                            <div className="mt-5 md:mt-8 h-[1px] w-full bg-white/5 relative overflow-hidden">
                                <motion.div
                                    className="absolute inset-0"
                                    style={{ background: `linear-gradient(to right, transparent, ${accent}, transparent)` }}
                                    animate={inView ? { x: ["-100%", "100%"] } : { x: "-100%" }}
                                    transition={{ duration: STEP, repeat: Infinity, ease: "linear", delay, repeatDelay }}
                                />
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>
        </section>
    );
}
