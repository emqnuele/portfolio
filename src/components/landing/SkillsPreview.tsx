"use client";

import { motion, type Variants } from "framer-motion";
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
    hidden: { opacity: 0, y: 15 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
    }
};

export default function SkillsPreview() {
    return (
        <section className="relative z-10 px-4 pt-24 md:pt-40 pb-16 md:pb-24 max-w-7xl mx-auto border-t border-white/5">
            {/* Header section - kept because you liked the idea */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-20 gap-4 md:gap-8">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
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

            {/* Quick summary grid - 5 columns for 5 domains */}
            <motion.div
                className="grid grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-12 md:gap-12 lg:gap-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                {skills.map((skill) => {
                    const Icon = iconMap[skill.icon];
                    return (
                        <motion.div
                            key={skill.title}
                            variants={itemVariants}
                            className="group relative"
                        >
                            <div className="flex flex-col items-center md:items-start text-center md:text-left gap-3 md:gap-5">
                                {/* icon with dynamic accent color */}
                                <div className="relative w-fit">
                                    <div
                                        className="absolute inset-0 blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-full"
                                        style={{ background: `rgb(${skill.accent})` }}
                                    />
                                    <div className="relative p-3 rounded-xl bg-white/5 border border-white/5 group-hover:bg-white/10 group-hover:border-white/10 transition-all duration-500">
                                        {Icon && <Icon size={24} style={{ color: `rgb(${skill.accent})` }} strokeWidth={1.5} />}
                                    </div>
                                </div>

                                <div className="space-y-1 md:space-y-3">
                                    <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors">
                                        {skill.title}
                                    </h3>

                                    <div className="flex flex-col md:flex-col gap-1.5 items-center md:items-start">
                                        {skill.tags.slice(0, 3).map(tag => (
                                            <span
                                                key={tag}
                                                className="text-[10px] font-mono text-zinc-600 group-hover:text-zinc-400 uppercase tracking-widest transition-colors"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* subtle decorative underline that grows on hover */}
                            <div className="mt-5 md:mt-8 h-[1px] w-full bg-white/5 relative overflow-hidden">
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                    initial={{ x: "-100%" }}
                                    whileInView={{ x: "100%" }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: Math.random() }}
                                />
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>
        </section>
    );
}
