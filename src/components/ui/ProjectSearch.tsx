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
            className="flex flex-col gap-2.5 w-full md:max-w-[400px]"
        >
            {/* Search bar */}
            <div
                className="relative group cursor-text"
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

            {/* Single-row horizontal scroll — scales to any number of tags */}
            <div className="relative">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="flex gap-1.5 overflow-x-auto [&::-webkit-scrollbar]:hidden"
                    style={{ scrollbarWidth: "none" }}
                >
                    {allTags.map((tag) => {
                        const isActive = activeFilters.includes(tag);
                        return (
                            <motion.button
                                key={tag}
                                whileHover={{ scale: 1.06 }}
                                whileTap={{ scale: 0.94 }}
                                onClick={() => onFilterToggle(tag)}
                                className={`flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-mono border transition-all duration-200 ${
                                    isActive
                                        ? "bg-white/15 border-white/25 text-white shadow-[0_0_12px_rgba(255,255,255,0.06)]"
                                        : "bg-zinc-900/50 border-white/[0.07] text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/60 hover:border-white/15"
                                }`}
                            >
                                {tag}
                            </motion.button>
                        );
                    })}
                </motion.div>
                {/* fade to indicate scrollable content */}
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/60 to-transparent pointer-events-none" />
            </div>
        </motion.div>
    );
}
