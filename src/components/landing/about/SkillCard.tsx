"use client";

import { motion, type Variants } from "framer-motion";
import type { SkillCategory } from "@/data/portfolio";
import { Monitor, Server, Brain, Bot, Cloud, type LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = { Monitor, Server, Brain, Bot, Cloud };

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 }
    }
};

export default function SkillCard({ skill }: { skill: SkillCategory }) {
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
