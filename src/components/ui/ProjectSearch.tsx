"use client";

import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";

interface ProjectSearchProps {
    allTags: string[];
    searchQuery: string;
    activeFilters: string[];
    onSearchChange: (query: string) => void;
    onFilterToggle: (tag: string) => void;
    onClearAll: () => void;
}

export default function ProjectSearch({
    allTags,
    searchQuery,
    activeFilters,
    onSearchChange,
    onFilterToggle,
    onClearAll,
}: ProjectSearchProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const hasActive = searchQuery.length > 0 || activeFilters.length > 0;

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-3 w-full md:max-w-[380px]"
        >
            {/* Search bar */}
            <div
                className="relative group cursor-text"
                onClick={() => inputRef.current?.focus()}
            >
                <div className="absolute inset-0 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 group-focus-within:border-white/20 group-focus-within:bg-white/[0.07] transition-all duration-300" />
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
                        {hasActive && (
                            <motion.button
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                transition={{ duration: 0.15, ease: "easeOut" }}
                                onClick={(e) => { e.stopPropagation(); onClearAll(); }}
                                className="p-1 rounded-full text-zinc-500 hover:text-white transition-colors flex-shrink-0"
                                aria-label="Clear all filters"
                            >
                                <X size={12} />
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Filter chips */}
            <div className="flex flex-wrap gap-1.5">
                {allTags.map((tag, i) => {
                    const isActive = activeFilters.includes(tag);
                    return (
                        <motion.button
                            key={tag}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.35,
                                delay: 0.28 + i * 0.018,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onFilterToggle(tag)}
                            className={`px-2.5 py-1 rounded-full text-xs font-mono border transition-all duration-200 ${
                                isActive
                                    ? "bg-white/[0.12] border-white/25 text-white shadow-[0_0_14px_rgba(255,255,255,0.07)]"
                                    : "bg-white/[0.03] border-white/[0.06] text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.07] hover:border-white/10"
                            }`}
                        >
                            {tag}
                        </motion.button>
                    );
                })}
            </div>

            {/* Active filter count hint */}
            <AnimatePresence>
                {activeFilters.length > 0 && (
                    <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.2 }}
                        className="text-xs text-zinc-600 font-mono"
                    >
                        {activeFilters.length} filter{activeFilters.length > 1 ? "s" : ""} active
                    </motion.p>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
