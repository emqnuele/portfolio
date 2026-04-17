"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, SlidersHorizontal } from "lucide-react";
import AnimatedInput from "@/components/ui/AnimatedInput";

interface ProjectSearchProps {
    allTags: string[];
    allCategories: string[];
    searchQuery: string;
    activeCategories: string[];
    activeFilters: string[];
    onSearchChange: (query: string) => void;
    onCategoryToggle: (cat: string) => void;
    onFilterToggle: (tag: string) => void;
    onClearFilters: () => void;
}

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ProjectSearch({
    allTags,
    allCategories,
    searchQuery,
    activeCategories,
    activeFilters,
    onSearchChange,
    onCategoryToggle,
    onFilterToggle,
    onClearFilters,
}: ProjectSearchProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [panelOpen, setPanelOpen] = useState(false);

    const totalActive = activeCategories.length + activeFilters.length;

    // close panel on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setPanelOpen(false);
            }
        };
        if (panelOpen) document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [panelOpen]);

    return (
        <motion.div
            ref={containerRef}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            className="relative flex gap-2.5 w-full md:max-w-[440px]"
        >
            {/* Search bar */}
            <div className="relative group flex-1">
                <div className="absolute inset-0 rounded-2xl bg-zinc-900/75 border border-white/[0.09] group-focus-within:border-white/[0.16] transition-all duration-300 pointer-events-none" />
                <div className="relative flex items-center gap-3 pr-3">
                    <Search size={15} className="text-zinc-400/90 flex-shrink-0 absolute left-4 pointer-events-none z-10" />
                    <AnimatedInput
                        value={searchQuery}
                        onChange={onSearchChange}
                        onFocus={() => setPanelOpen(false)}
                        placeholder="Search projects..."
                        aria-label="Search projects"
                        className="flex-1 min-w-0 text-[15px] font-mono text-white"
                        padding="pl-9 pr-2 py-3"
                    />
                    <AnimatePresence>
                        {searchQuery.length > 0 && (
                            <motion.button
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                transition={{ duration: 0.15 }}
                                onClick={() => onSearchChange("")}
                                className="p-1 rounded-full text-zinc-400 hover:text-white transition-colors flex-shrink-0"
                                aria-label="Clear search"
                            >
                                <X size={12} />
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Filter toggle button */}
            <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setPanelOpen(!panelOpen)}
                aria-label="Toggle filters"
                className={`relative flex-shrink-0 flex items-center justify-center w-[46px] rounded-2xl border transition-all duration-200 ${
                    panelOpen || totalActive > 0
                        ? "bg-zinc-800/90 border-white/[0.16] text-white"
                        : "bg-zinc-900/75 border-white/[0.09] text-zinc-400 hover:text-zinc-200 hover:border-white/[0.14]"
                }`}
            >
                <SlidersHorizontal size={15} />
                <AnimatePresence>
                    {totalActive > 0 && (
                        <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-white text-black text-[9px] font-bold flex items-center justify-center leading-none"
                        >
                            {totalActive}
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Filter dropdown panel */}
            <AnimatePresence>
                {panelOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.97 }}
                        transition={{ duration: 0.22, ease: EASE }}
                        className="absolute top-[calc(100%+10px)] left-0 right-0 z-50 rounded-2xl bg-zinc-900/88 backdrop-blur-sm border border-white/[0.09] p-4 shadow-xl shadow-black/45"
                    >
                        {/* Panel header */}
                        <div className="flex items-center justify-between mb-3 px-0.5">
                            <span className="text-[11px] font-mono text-zinc-400 tracking-wide">what are you looking for?</span>
                            <AnimatePresence>
                                {totalActive > 0 && (
                                    <motion.button
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onClick={onClearFilters}
                                        className="text-[11px] font-mono text-zinc-400 hover:text-white transition-colors"
                                    >
                                        clear
                                    </motion.button>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Category chips — primary, bigger, approachable */}
                        <div className="grid grid-cols-2 gap-1.5">
                            {allCategories.map((cat, i) => {
                                const isActive = activeCategories.includes(cat);
                                return (
                                    <motion.button
                                        key={cat}
                                        initial={{ opacity: 0, y: 4 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.25, delay: 0.04 + i * 0.025, ease: EASE }}
                                        whileHover={{ y: -1 }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => onCategoryToggle(cat)}
                                        className={`relative px-3 py-2 rounded-xl text-[13px] font-medium border transition-colors duration-200 text-left ${
                                            isActive
                                                ? "bg-white text-black border-white shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_6px_18px_-8px_rgba(255,255,255,0.3)]"
                                                : "bg-white/[0.03] border-white/[0.08] text-zinc-100 hover:bg-white/[0.07] hover:border-white/[0.16]"
                                        }`}
                                    >
                                        {cat}
                                    </motion.button>
                                );
                            })}
                        </div>

                        {/* Divider with label */}
                        <div className="relative flex items-center my-3.5">
                            <div className="flex-1 h-px bg-white/[0.06]" />
                            <span className="px-2.5 text-[10px] font-mono text-zinc-500 tracking-[0.15em] uppercase">by tech</span>
                            <div className="flex-1 h-px bg-white/[0.06]" />
                        </div>

                        {/* Tech chips — secondary, thin pills */}
                        <div className="flex flex-wrap gap-1.5">
                            {allTags.map((tag, i) => {
                                const isActive = activeFilters.includes(tag);
                                const delay = 0.04 + allCategories.length * 0.025 + i * 0.015;
                                return (
                                    <motion.button
                                        key={tag}
                                        initial={{ opacity: 0, y: 4 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.22, delay, ease: EASE }}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => onFilterToggle(tag)}
                                        className={`px-2.5 py-1 rounded-full text-[11px] font-mono border transition-all duration-150 ${
                                            isActive
                                                ? "bg-white/[0.11] border-white/[0.16] text-white"
                                                : "bg-white/[0.02] border-white/[0.06] text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.06] hover:border-white/[0.12]"
                                        }`}
                                    >
                                        {tag}
                                    </motion.button>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
