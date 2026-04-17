"use client";

import { Suspense, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { projects, allCategories } from "@/data/portfolio";
import ProjectsGrid from "@/components/ui/ProjectsGrid";
import ProjectSearch from "@/components/ui/ProjectSearch";

const categoryCounts: Record<string, number> = (() => {
    const counts: Record<string, number> = {};
    allCategories.forEach(c => { counts[c] = 0; });
    projects.forEach(p => p.categories.forEach(c => {
        if (c in counts) counts[c] += 1;
    }));
    return counts;
})();

export default function ProjectsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategories, setActiveCategories] = useState<string[]>([]);

    const filteredProjects = useMemo(() => {
        let result = projects;

        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            result = result.filter(p =>
                p.title.toLowerCase().includes(q) ||
                p.tagline.toLowerCase().includes(q) ||
                p.stack.some(t => t.toLowerCase().includes(q)) ||
                p.categories.some(c => c.toLowerCase().includes(q))
            );
        }

        if (activeCategories.length > 0) {
            result = result.filter(p =>
                activeCategories.some(c => p.categories.includes(c))
            );
        }

        return result;
    }, [searchQuery, activeCategories]);

    const toggleCategory = (cat: string) => {
        setActiveCategories(prev =>
            prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
        );
    };

    return (
        <main className="relative min-h-screen w-full overflow-hidden">
            <div className="relative pt-24 md:pt-32 pb-28 md:pb-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
                <div className="mb-8 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-12">
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
                        allCategories={allCategories as unknown as string[]}
                        categoryCounts={categoryCounts}
                        searchQuery={searchQuery}
                        activeCategories={activeCategories}
                        onSearchChange={setSearchQuery}
                        onCategoryToggle={toggleCategory}
                        onClearFilters={() => setActiveCategories([])}
                    />
                </div>

                <Suspense fallback={null}>
                    <ProjectsGrid
                        projects={filteredProjects}
                        filterKey={searchQuery + activeCategories.join(",")}
                    />
                </Suspense>
            </div>
        </main>
    );
}
