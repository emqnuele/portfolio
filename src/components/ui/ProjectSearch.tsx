"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    X,
    SlidersHorizontal,
    Globe,
    Sparkles,
    Bot,
    Gamepad2,
    Wrench,
    Box,
    type LucideIcon,
} from "lucide-react";
import AnimatedInput from "@/components/ui/AnimatedInput";

interface ProjectSearchProps {
    allCategories: string[];
    categoryCounts: Record<string, number>;
    searchQuery: string;
    activeCategories: string[];
    onSearchChange: (query: string) => void;
    onCategoryToggle: (cat: string) => void;
    onClearFilters: () => void;
}

const EASE = [0.22, 1, 0.36, 1] as const;

const CATEGORY_ICONS: Record<string, LucideIcon> = {
    "Websites": Globe,
    "AI & Agents": Sparkles,
    "Bots": Bot,
    "Games": Gamepad2,
    "Dev Tools": Wrench,
    "Minecraft": Box,
};

export default function ProjectSearch({
    allCategories,
    categoryCounts,
    searchQuery,
    activeCategories,
    onSearchChange,
    onCategoryToggle,
    onClearFilters,
}: ProjectSearchProps) {
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
                    panelOpen || activeCategories.length > 0
                        ? "bg-zinc-800/90 border-white/[0.16] text-white"
                        : "bg-zinc-900/75 border-white/[0.09] text-zinc-400 hover:text-zinc-200 hover:border-white/[0.14]"
                }`}
            >
                <SlidersHorizontal size={15} />
                <AnimatePresence>
                    {activeCategories.length > 0 && (
                        <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-white text-black text-[9px] font-bold flex items-center justify-center leading-none"
                        >
                            {activeCategories.length}
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
                                {activeCategories.length > 0 && (
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

                        {/* Category chips */}
                        <div className="grid grid-cols-2 gap-1.5">
                            {allCategories.map((cat, i) => {
                                const isActive = activeCategories.includes(cat);
                                const Icon = CATEGORY_ICONS[cat] ?? Box;
                                const count = categoryCounts[cat] ?? 0;
                                return (
                                    <motion.button
                                        key={cat}
                                        initial={{ opacity: 0, y: 4 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.25, delay: 0.04 + i * 0.025, ease: EASE }}
                                        whileHover={{ y: -1 }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => onCategoryToggle(cat)}
                                        className={`group/chip relative flex items-center gap-2.5 pl-2.5 pr-2 py-2 rounded-xl text-[13px] font-medium border overflow-hidden text-left backdrop-blur-md transition-[background-color,border-color,color,box-shadow] duration-200 ${
                                            isActive
                                                ? "bg-white text-black border-white shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_8px_22px_-10px_rgba(255,255,255,0.35)]"
                                                : "bg-white/[0.04] border-white/[0.09] text-zinc-100 hover:bg-white/[0.08] hover:border-white/20"
                                        }`}
                                    >
                                        {/* glass sheen on hover */}
                                        {!isActive && (
                                            <span
                                                aria-hidden
                                                className="pointer-events-none absolute inset-0 opacity-0 group-hover/chip:opacity-100 transition-opacity duration-300"
                                                style={{
                                                    background:
                                                        "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 40%, transparent 100%)",
                                                }}
                                            />
                                        )}

                                        {/* top highlight line — glass edge */}
                                        {!isActive && (
                                            <span
                                                aria-hidden
                                                className="pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-60"
                                            />
                                        )}

                                        {/* icon cap */}
                                        <span
                                            className={`relative z-10 flex items-center justify-center w-6 h-6 rounded-lg flex-shrink-0 transition-colors duration-200 ${
                                                isActive
                                                    ? "bg-black/[0.06] text-black"
                                                    : "bg-white/[0.05] text-zinc-300 group-hover/chip:text-white group-hover/chip:bg-white/[0.1]"
                                            }`}
                                        >
                                            <Icon size={13} strokeWidth={2.1} />
                                        </span>

                                        <span className="relative z-10 flex-1 leading-none tracking-tight">{cat}</span>

                                        <span
                                            className={`relative z-10 text-[10px] font-mono leading-none tabular-nums transition-colors duration-200 ${
                                                isActive ? "text-black/55" : "text-zinc-500 group-hover/chip:text-zinc-200"
                                            }`}
                                        >
                                            {count}
                                        </span>
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
