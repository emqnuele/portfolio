"use client";

import { Suspense, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { projects } from "@/data/portfolio";
import ProjectsGrid from "@/components/ui/ProjectsGrid";
import ProjectSearch from "@/components/ui/ProjectSearch";

// sorted by usage frequency across all projects
const allTags = (() => {
    const freq: Record<string, number> = {};
    projects.forEach(p => p.stack.forEach(t => { freq[t] = (freq[t] || 0) + 1; }));
    return Object.entries(freq)
        .sort((a, b) => b[1] - a[1])
        .map(([tag]) => tag);
})();

export default function ProjectsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilters, setActiveFilters] = useState<string[]>([]);

    const filteredProjects = useMemo(() => {
        let result = projects;

        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            result = result.filter(p =>
                p.title.toLowerCase().includes(q) ||
                p.tagline.toLowerCase().includes(q) ||
                p.stack.some(t => t.toLowerCase().includes(q))
            );
        }

        if (activeFilters.length > 0) {
            result = result.filter(p =>
                activeFilters.some(f => p.stack.includes(f))
            );
        }

        return result;
    }, [searchQuery, activeFilters]);

    const toggleFilter = (tag: string) => {
        setActiveFilters(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    };

    const clearAll = () => {
        setSearchQuery("");
        setActiveFilters([]);
    };

    return (
        <main className="relative min-h-screen w-full overflow-hidden">
            <div className="relative pt-24 md:pt-32 pb-28 md:pb-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
                <div className="mb-16 flex flex-col md:flex-row md:items-start md:justify-between gap-8 md:gap-12">
                    {/* Title */}
                    <div className="flex-shrink-0">
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

                    {/* Search + filters */}
                    <ProjectSearch
                        allTags={allTags}
                        searchQuery={searchQuery}
                        activeFilters={activeFilters}
                        onSearchChange={setSearchQuery}
                        onFilterToggle={toggleFilter}
                        onClearAll={clearAll}
                    />
                </div>

                <Suspense fallback={null}>
                    <ProjectsGrid projects={filteredProjects} />
                </Suspense>
            </div>
        </main>
    );
}
