"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import { projects } from "@/data/portfolio";
import ProjectsGrid from "@/components/ui/ProjectsGrid";

export default function ProjectsPage() {
    return (
        <main className="relative min-h-screen w-full overflow-hidden">
            <div className="relative pt-24 md:pt-32 pb-28 md:pb-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
                <div className="mb-16">
                    <motion.h1
                        initial={{ opacity: 0, scale: 1.08 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4"
                    >
                        Selected <span className="text-zinc-500">Works</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                        className="text-zinc-400 max-w-xl text-lg"
                    >
                        A collection of experiments, products, and chaos engineering.
                    </motion.p>
                </div>

                <Suspense fallback={null}>
                    <ProjectsGrid projects={projects} />
                </Suspense>
            </div>
        </main>
    );
}
