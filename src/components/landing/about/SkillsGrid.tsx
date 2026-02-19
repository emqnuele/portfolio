"use client";

import { motion, type Variants } from "framer-motion";
import { skills } from "@/data/portfolio";
import SkillCard from "./SkillCard";

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 }
    }
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

export default function SkillsGrid() {
    return (
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
                <motion.p variants={fadeInUp} className="text-zinc-400 max-w-xl mx-auto">From expressive UIs to complex backend systems and AI agents.</motion.p>
            </div>

            {/* Top row: 3 cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
                {skills.slice(0, 3).map((skill) => (
                    <SkillCard key={skill.title} skill={skill} />
                ))}
            </div>

            {/* Bottom row: 2 cards, centered */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
                {skills.slice(3).map((skill) => (
                    <SkillCard key={skill.title} skill={skill} />
                ))}
            </div>
        </motion.div>
    );
}
