"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import type { Project } from "@/data/portfolio";
import HLSVideo from "./HLSVideo";

interface ProjectModalProps {
    project: Project;
    isOpen: boolean;
    onClose: () => void;
}

const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.25 } },
};

const panelVariants = {
    hidden: { opacity: 0, scale: 0.96, y: 24 },
    visible: {
        opacity: 1, scale: 1, y: 0,
        transition: { type: "spring" as const, stiffness: 280, damping: 32, mass: 0.8 }
    },
    exit: {
        opacity: 0, scale: 0.96, y: 16,
        transition: { duration: 0.22, ease: [0.4, 0, 1, 1] as [number, number, number, number] }
    },
};

const leftContentVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};

const lineVariant = {
    hidden: { opacity: 0, x: -18 },
    visible: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 200, damping: 26 } },
};

const mediaVariants = {
    enter: { opacity: 0, scale: 1.04 },
    center: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
    exit: { opacity: 0, scale: 0.97, transition: { duration: 0.25, ease: [0.4, 0, 1, 1] as [number, number, number, number] } },
};

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);

    const media: { type: "video" | "image"; src: string; poster?: string }[] = [];

    if (project.videos && project.videos.length > 0) {
        project.videos.forEach(v => media.push({ type: "video", src: v, poster: project.image }));
    }
    if (project.images && project.images.length > 0) {
        project.images.forEach(img => media.push({ type: "image", src: img }));
    } else if (project.image && media.length === 0) {
        media.push({ type: "image", src: project.image });
    }

    const hasMultiple = media.length > 1;

    const prev = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentMediaIndex(i => (i - 1 + media.length) % media.length);
    };
    const next = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentMediaIndex(i => (i + 1) % media.length);
    };

    useEffect(() => {
        if (!isOpen) return;
        document.body.style.overflow = "hidden";
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight") next();
            if (e.key === "ArrowLeft") prev();
        };
        window.addEventListener("keydown", onKey);
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, onClose, media.length]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setCurrentMediaIndex(0);
        if (scrollRef.current) scrollRef.current.scrollTop = 0;
    }, [project.slug]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-5 lg:p-8"
                    variants={overlayVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    {/* Backdrop */}
                    <div
                        onClick={onClose}
                        className="fixed inset-0 bg-black/70 backdrop-blur-md"
                    />

                    {/* Panel */}
                    <motion.div
                        variants={panelVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={e => e.stopPropagation()}
                        className="relative z-[201] w-full max-w-6xl flex flex-col lg:flex-row overflow-hidden rounded-2xl lg:rounded-3xl"
                        style={{
                            background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                            backdropFilter: "blur(40px) saturate(180%)",
                            WebkitBackdropFilter: "blur(40px) saturate(180%)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            boxShadow: "0 32px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.08)",
                            maxHeight: "90vh",
                        }}
                    >
                        {/* ─── LEFT: Info Panel ─── */}
                        <div
                            ref={scrollRef}
                            className="relative lg:w-[42%] flex-shrink-0 overflow-y-auto flex flex-col"
                            style={{
                                background: "linear-gradient(160deg, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.0) 100%)",
                                borderRight: "1px solid rgba(255,255,255,0.06)",
                            }}
                        >
                            {/* top noise layer */}
                            <div
                                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                                    backgroundSize: "128px 128px",
                                }}
                            />

                            <motion.div
                                variants={leftContentVariants}
                                initial="hidden"
                                animate={isOpen ? "visible" : "hidden"}
                                className="relative flex flex-col gap-7 p-6 sm:p-8 lg:p-10 flex-1"
                            >
                                {/* Status + close (mobile) */}
                                <motion.div variants={lineVariant} className="flex items-center justify-between">
                                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500 border border-white/8 rounded-full px-3 py-1">
                                        {project.status}
                                    </span>
                                    <button
                                        onClick={onClose}
                                        className="lg:hidden p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/8 text-zinc-400 hover:text-white transition-all"
                                    >
                                        <X size={16} />
                                    </button>
                                </motion.div>

                                {/* Title */}
                                <motion.div variants={lineVariant} className="space-y-2">
                                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-[1.1] tracking-tight">
                                        {project.title}
                                    </h2>
                                    <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest leading-relaxed">
                                        {project.tagline}
                                    </p>
                                </motion.div>

                                {/* Divider */}
                                <motion.div
                                    variants={lineVariant}
                                    className="h-px bg-gradient-to-r from-white/10 via-white/5 to-transparent"
                                />

                                {/* Description */}
                                <motion.div variants={lineVariant}>
                                    <p className="text-zinc-400 text-sm sm:text-[15px] leading-[1.75] font-normal">
                                        {project.description || "A project built with care and craft."}
                                    </p>
                                </motion.div>

                                {/* Stack */}
                                <motion.div variants={lineVariant} className="space-y-3">
                                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                                        Tech Stack
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.stack.map(tech => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1.5 rounded-lg font-mono text-[11px] text-zinc-300"
                                                style={{
                                                    background: "rgba(255,255,255,0.04)",
                                                    border: "1px solid rgba(255,255,255,0.07)",
                                                }}
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Links */}
                                {project.links.length > 0 && (
                                    <motion.div variants={lineVariant} className="flex flex-wrap gap-3 mt-auto pt-2">
                                        {project.links.map(link => {
                                            const isLive = link.label.toLowerCase() === "live";
                                            const isGit = link.label.toLowerCase().includes("git");
                                            return (
                                                <Link
                                                    key={link.label}
                                                    href={link.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`group flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                                                        isLive
                                                            ? "bg-white text-black hover:bg-zinc-100"
                                                            : "border border-white/10 text-white/70 hover:text-white hover:border-white/20 hover:bg-white/5"
                                                    }`}
                                                >
                                                    <span className="capitalize">{link.label}</span>
                                                    {isGit
                                                        ? <Github size={14} />
                                                        : <ExternalLink size={13} className={isLive ? "opacity-60" : "opacity-40 group-hover:opacity-80"} />
                                                    }
                                                </Link>
                                            );
                                        })}
                                    </motion.div>
                                )}
                            </motion.div>
                        </div>

                        {/* ─── RIGHT: Media Panel ─── */}
                        <div className="relative flex-1 flex flex-col min-h-[55vw] sm:min-h-[320px] lg:min-h-0 bg-black/30">
                            {/* Close button desktop */}
                            <button
                                onClick={onClose}
                                className="hidden lg:flex absolute top-5 right-5 z-20 items-center justify-center w-9 h-9 rounded-full bg-black/40 hover:bg-white/10 border border-white/8 text-zinc-400 hover:text-white transition-all backdrop-blur-sm"
                            >
                                <X size={16} />
                            </button>

                            {/* Main media display */}
                            <div className="relative flex-1 overflow-hidden">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={`${project.slug}-${currentMediaIndex}`}
                                        variants={mediaVariants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        className="absolute inset-0"
                                    >
                                        {media[currentMediaIndex]?.type === "video" ? (
                                            media[currentMediaIndex].src.endsWith(".m3u8") ? (
                                                <HLSVideo
                                                    src={media[currentMediaIndex].src}
                                                    poster={media[currentMediaIndex].poster}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <video
                                                    src={media[currentMediaIndex].src}
                                                    poster={media[currentMediaIndex].poster}
                                                    autoPlay muted loop playsInline
                                                    className="w-full h-full object-cover"
                                                />
                                            )
                                        ) : (
                                            <Image
                                                src={media[currentMediaIndex]?.src ?? project.image}
                                                alt={project.title}
                                                fill priority
                                                className="object-cover"
                                            />
                                        )}
                                    </motion.div>
                                </AnimatePresence>

                                {/* subtle bottom vignette for thumbnail strip */}
                                {hasMultiple && (
                                    <div className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
                                        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)" }}
                                    />
                                )}

                                {/* Arrow nav */}
                                {hasMultiple && (
                                    <>
                                        <button
                                            onClick={prev}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 border border-white/10 text-white/70 hover:text-white transition-all backdrop-blur-sm"
                                        >
                                            <ChevronLeft size={18} />
                                        </button>
                                        <button
                                            onClick={next}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 border border-white/10 text-white/70 hover:text-white transition-all backdrop-blur-sm"
                                        >
                                            <ChevronRight size={18} />
                                        </button>
                                    </>
                                )}
                            </div>

                            {/* Thumbnail strip */}
                            {hasMultiple && (
                                <div className="relative flex-shrink-0 px-4 py-3 flex gap-2 overflow-x-auto"
                                    style={{
                                        background: "rgba(0,0,0,0.45)",
                                        borderTop: "1px solid rgba(255,255,255,0.06)",
                                        scrollbarWidth: "none",
                                    }}
                                >
                                    {media.map((item, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setCurrentMediaIndex(i)}
                                            className="relative flex-shrink-0 w-14 h-10 sm:w-16 sm:h-11 rounded-lg overflow-hidden transition-all duration-200"
                                            style={{
                                                outline: i === currentMediaIndex ? "2px solid rgba(255,255,255,0.7)" : "2px solid transparent",
                                                outlineOffset: "2px",
                                                opacity: i === currentMediaIndex ? 1 : 0.45,
                                            }}
                                        >
                                            {item.type === "video" ? (
                                                <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                                                    <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-wider">vid</span>
                                                </div>
                                            ) : (
                                                <Image src={item.src} alt="" fill className="object-cover" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
