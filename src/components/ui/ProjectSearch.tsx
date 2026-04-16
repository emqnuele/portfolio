"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, SlidersHorizontal } from "lucide-react";

interface ProjectSearchProps {
    allTags: string[];
    searchQuery: string;
    activeFilters: string[];
    onSearchChange: (query: string) => void;
    onFilterToggle: (tag: string) => void;
    onClearFilters: () => void;
}

export default function ProjectSearch({
    allTags,
    searchQuery,
    activeFilters,
    onSearchChange,
    onFilterToggle,
    onClearFilters,
}: ProjectSearchProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [panelOpen, setPanelOpen] = useState(false);

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
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex gap-2 w-full md:max-w-[400px]"
        >
            {/* Search bar */}
            <div
                className="relative group flex-1 cursor-text"
                onClick={() => inputRef.current?.focus()}
            >
                <div className="absolute inset-0 rounded-2xl bg-zinc-900/60 backdrop-blur-md border border-white/10 group-focus-within:border-white/20 transition-all duration-300" />
                <div className="relative flex items-center px-4 py-2.5 gap-3">
                    <Search size={14} className="text-zinc-500 flex-shrink-0" />
                    <input
                        ref={inputRef}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Search projects..."
                        className="bg-transparent text-sm text-white placeholder:text-zinc-600 outline-none flex-1 font-mono min-w-0"
                        aria-label="Search projects"
                    />
                    <AnimatePresence>
                        {searchQuery.length > 0 && (
                            <motion.button
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                transition={{ duration: 0.15 }}
                                onClick={(e) => { e.stopPropagation(); onSearchChange(""); }}
                                className="p-1 rounded-full text-zinc-500 hover:text-white transition-colors flex-shrink-0"
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
                className={`relative flex-shrink-0 flex items-center justify-center w-[42px] rounded-2xl backdrop-blur-md border transition-all duration-200 ${
                    panelOpen || activeFilters.length > 0
                        ? "bg-white/10 border-white/25 text-white"
                        : "bg-zinc-900/60 border-white/10 text-zinc-500 hover:text-zinc-300 hover:border-white/15"
                }`}
            >
                <SlidersHorizontal size={14} />
                <AnimatePresence>
                    {activeFilters.length > 0 && (
                        <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-white text-black text-[9px] font-bold flex items-center justify-center leading-none"
                        >
                            {activeFilters.length}
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
                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute top-[calc(100%+8px)] left-0 right-0 z-50 rounded-2xl bg-zinc-900/80 backdrop-blur-xl border border-white/10 p-3 shadow-xl shadow-black/40"
                    >
                        {/* Panel header */}
                        <div className="flex items-center justify-between mb-2.5 px-0.5">
                            <span className="text-xs font-mono text-zinc-500">filter by tech</span>
                            <AnimatePresence>
                                {activeFilters.length > 0 && (
                                    <motion.button
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onClick={onClearFilters}
                                        className="text-xs font-mono text-zinc-500 hover:text-white transition-colors"
                                    >
                                        clear
                                    </motion.button>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Chips */}
                        <div className="flex flex-wrap gap-1.5">
                            {allTags.map((tag) => {
                                const isActive = activeFilters.includes(tag);
                                return (
                                    <motion.button
                                        key={tag}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => onFilterToggle(tag)}
                                        className={`px-2.5 py-1 rounded-full text-xs font-mono border transition-all duration-150 ${
                                            isActive
                                                ? "bg-white/15 border-white/25 text-white"
                                                : "bg-white/[0.04] border-white/[0.07] text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.08] hover:border-white/15"
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
