"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import { getProjectMedia, type Project } from "@/data/portfolio";
import HLSVideo from "./HLSVideo";

interface ProjectModalProps {
    project: Project;
    isOpen: boolean;
    onClose: () => void;
}

// splits text into pages by greedily packing sentences under maxChars
function paginateText(text: string, maxChars = 300): string[] {
    const sentences = text.match(/[^.!?]+[.!?]+[\s]*/g) ?? [text];
    const pages: string[] = [];
    let current = "";

    for (const sentence of sentences) {
        if (current.length + sentence.length > maxChars && current.length > 0) {
            pages.push(current.trimEnd());
            current = sentence;
        } else {
            current += sentence;
        }
    }
    if (current.trimEnd()) pages.push(current.trimEnd());
    return pages.length > 0 ? pages : [text];
}

const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.25 } },
};

const panelVariants = {
    hidden: { opacity: 0, scale: 0.91, y: 32 },
    visible: {
        opacity: 1, scale: 1, y: 0,
        transition: { type: "spring" as const, stiffness: 260, damping: 28, mass: 0.9 }
    },
    exit: {
        opacity: 0, scale: 0.94, y: 20,
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

const panelStyles = {
    background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
    backdropFilter: "blur(40px) saturate(180%)",
    WebkitBackdropFilter: "blur(40px) saturate(180%)",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 32px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.08)",
};

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
    const [descPage, setDescPage] = useState(0);
    const [descDir, setDescDir] = useState(1);
    const scrollRef = useRef<HTMLDivElement>(null);

    const descPages = paginateText(project.description || "A project built with care and craft.");
    const totalDescPages = descPages.length;

    const media = getProjectMedia(project);

    const hasMultiple = media.length > 1;

    const prevMedia = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentMediaIndex(i => (i - 1 + media.length) % media.length);
    };
    const nextMedia = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentMediaIndex(i => (i + 1) % media.length);
    };

    const prevDesc = () => {
        if (descPage === 0) return;
        setDescDir(-1);
        setDescPage(p => p - 1);
    };
    const nextDesc = () => {
        if (descPage === totalDescPages - 1) return;
        setDescDir(1);
        setDescPage(p => p + 1);
    };

    const closeBtnRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!isOpen) return;
        document.body.style.overflow = "hidden";
        // move focus into modal on open
        closeBtnRef.current?.focus();
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight") nextMedia();
            if (e.key === "ArrowLeft") prevMedia();
        };
        window.addEventListener("keydown", onKey);
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, onClose, media.length]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setCurrentMediaIndex(0);
        setDescPage(0);
        if (scrollRef.current) scrollRef.current.scrollTop = 0;
    }, [project.slug]);

    const descSlideVariants = {
        enter: (dir: number) => ({ opacity: 0, x: dir * 24 }),
        center: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 260, damping: 28 } },
        exit: (dir: number) => ({
            opacity: 0, x: dir * -20,
            transition: { duration: 0.18, ease: [0.4, 0, 1, 1] as [number, number, number, number] }
        }),
    };


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
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-title"
                        variants={panelVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={e => e.stopPropagation()}
                        className="relative z-[201] w-full max-w-6xl overflow-hidden rounded-2xl lg:rounded-3xl"
                        style={panelStyles}
                    >

                        {/* ═══════════════════════════════════════════
                            MOBILE LAYOUT — hidden on lg+
                            image top (200px) → scrollable content
                        ════════════════════════════════════════════ */}
                        <div className="lg:hidden flex flex-col" style={{ maxHeight: "90vh" }}>
                            {/* hero media carousel */}
                            <div className="relative h-[200px] flex-shrink-0 bg-black/40 overflow-hidden">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={`mob-${project.slug}-${currentMediaIndex}`}
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
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <video
                                                    src={media[currentMediaIndex].src}
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

                                {/* gradient fade bottom */}
                                <div
                                    className="absolute inset-x-0 bottom-0 h-12 pointer-events-none"
                                    style={{ background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.5))" }}
                                />

                                {/* close button */}
                                <button
                                    onClick={onClose}
                                    className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/50 border border-white/10 text-zinc-400 hover:text-white transition-all backdrop-blur-sm"
                                >
                                    <X size={16} />
                                </button>

                                {/* prev/next arrows */}
                                {hasMultiple && (
                                    <>
                                        <button
                                            onClick={prevMedia}
                                            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 border border-white/10 text-white/70 hover:text-white transition-all backdrop-blur-sm"
                                        >
                                            <ChevronLeft size={16} />
                                        </button>
                                        <button
                                            onClick={nextMedia}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 border border-white/10 text-white/70 hover:text-white transition-all backdrop-blur-sm"
                                        >
                                            <ChevronRight size={16} />
                                        </button>
                                    </>
                                )}

                                {/* dot indicators */}
                                {hasMultiple && (
                                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                                        {media.map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setCurrentMediaIndex(i)}
                                                className="transition-all duration-200 rounded-full"
                                                style={{
                                                    width: i === currentMediaIndex ? "16px" : "5px",
                                                    height: "5px",
                                                    background: i === currentMediaIndex ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)",
                                                }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* scrollable body */}
                            <div className="overflow-y-auto flex-1 flex flex-col gap-4 p-5 sm:p-6" style={{ scrollbarWidth: "none" }}>
                                {/* status */}
                                <span className="self-start font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500 border border-white/8 rounded-full px-3 py-1">
                                    {project.status}
                                </span>

                                {/* title + tagline */}
                                <div className="space-y-1">
                                    <h2 id="modal-title" className="text-2xl font-bold text-white leading-[1.1] tracking-tight">
                                        {project.title}
                                    </h2>
                                    <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest leading-relaxed">
                                        {project.tagline}
                                    </p>
                                </div>

                                {/* divider */}
                                <div className="h-px bg-gradient-to-r from-white/10 via-white/5 to-transparent" />

                                {/* description — paginated */}
                                <div className="flex flex-col gap-2.5">
                                    <div className="relative overflow-hidden" style={{ minHeight: "6rem" }}>
                                        <AnimatePresence mode="wait" custom={descDir}>
                                            <motion.p
                                                key={`mob-desc-${descPage}`}
                                                custom={descDir}
                                                variants={descSlideVariants}
                                                initial="enter"
                                                animate="center"
                                                exit="exit"
                                                className="text-zinc-400 text-sm leading-[1.75]"
                                            >
                                                {descPages[descPage]}
                                            </motion.p>
                                        </AnimatePresence>
                                    </div>
                                    {totalDescPages > 1 && (
                                        <div className="flex items-center gap-2.5">
                                            <button
                                                onClick={prevDesc}
                                                disabled={descPage === 0}
                                                className="w-7 h-7 flex items-center justify-center rounded-full border border-white/8 text-zinc-500 hover:text-white hover:border-white/20 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
                                            >
                                                <ChevronLeft size={13} />
                                            </button>
                                            <div className="flex items-center gap-1.5">
                                                {descPages.map((_, i) => (
                                                    <button
                                                        key={i}
                                                        onClick={() => { setDescDir(i > descPage ? 1 : -1); setDescPage(i); }}
                                                        className="transition-all duration-200 rounded-full"
                                                        style={{
                                                            width: i === descPage ? "16px" : "5px",
                                                            height: "5px",
                                                            background: i === descPage ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.2)",
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                            <button
                                                onClick={nextDesc}
                                                disabled={descPage === totalDescPages - 1}
                                                className="w-7 h-7 flex items-center justify-center rounded-full border border-white/8 text-zinc-500 hover:text-white hover:border-white/20 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
                                            >
                                                <ChevronRight size={13} />
                                            </button>
                                            <span className="font-mono text-[10px] text-zinc-600 ml-0.5">
                                                {descPage + 1} / {totalDescPages}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* stack */}
                                <div className="space-y-3">
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
                                </div>

                                {/* links */}
                                {project.links.length > 0 && (
                                    <div className="flex flex-wrap gap-3 pb-2">
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
                                                            ? "border border-transparent bg-white text-black hover:bg-zinc-100"
                                                            : "border border-white/10 text-white/70 hover:text-white hover:border-white/20 hover:bg-white/5"
                                                    }`}
                                                >
                                                    <span className="capitalize">{link.label}</span>
                                                    {isGit
                                                        ? <Github size={14} />
                                                        : <ExternalLink size={14} className={isLive ? "opacity-60" : "opacity-40 group-hover:opacity-80"} />
                                                    }
                                                </Link>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* ═══════════════════════════════════════════
                            DESKTOP LAYOUT — hidden below lg
                            left info + right media, exactly as before
                        ════════════════════════════════════════════ */}
                        <div className="hidden lg:flex flex-row" style={{ maxHeight: "90vh" }}>
                            {/* ─── LEFT: Info Panel ─── */}
                            <div
                                ref={scrollRef}
                                className="relative lg:w-[42%] flex-shrink-0 overflow-y-auto flex flex-col"
                                style={{
                                    background: "linear-gradient(160deg, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.0) 100%)",
                                    borderRight: "1px solid rgba(255,255,255,0.06)",
                                }}
                            >
                                {/* noise texture */}
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
                                    {/* Status + mobile close */}
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

                                    {/* Description — paginated */}
                                    <motion.div variants={lineVariant} className="flex flex-col gap-4">
                                        <div className="relative overflow-hidden" style={{ minHeight: "7.5rem" }}>
                                            <AnimatePresence mode="wait" custom={descDir}>
                                                <motion.p
                                                    key={descPage}
                                                    custom={descDir}
                                                    variants={descSlideVariants}
                                                    initial="enter"
                                                    animate="center"
                                                    exit="exit"
                                                    className="text-zinc-400 text-sm sm:text-[15px] leading-[1.75] font-normal"
                                                >
                                                    {descPages[descPage]}
                                                </motion.p>
                                            </AnimatePresence>
                                        </div>

                                        {totalDescPages > 1 && (
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={prevDesc}
                                                    disabled={descPage === 0}
                                                    className="w-7 h-7 flex items-center justify-center rounded-full border border-white/8 text-zinc-500 hover:text-white hover:border-white/20 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
                                                >
                                                    <ChevronLeft size={13} />
                                                </button>

                                                <div className="flex items-center gap-1.5">
                                                    {descPages.map((_, i) => (
                                                        <button
                                                            key={i}
                                                            onClick={() => { setDescDir(i > descPage ? 1 : -1); setDescPage(i); }}
                                                            className="transition-all duration-200 rounded-full"
                                                            style={{
                                                                width: i === descPage ? "16px" : "5px",
                                                                height: "5px",
                                                                background: i === descPage ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.2)",
                                                            }}
                                                        />
                                                    ))}
                                                </div>

                                                <button
                                                    onClick={nextDesc}
                                                    disabled={descPage === totalDescPages - 1}
                                                    className="w-7 h-7 flex items-center justify-center rounded-full border border-white/8 text-zinc-500 hover:text-white hover:border-white/20 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
                                                >
                                                    <ChevronRight size={13} />
                                                </button>

                                                <span className="font-mono text-[10px] text-zinc-600 ml-1">
                                                    {descPage + 1} / {totalDescPages}
                                                </span>
                                            </div>
                                        )}
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
                                                                ? "border border-transparent bg-white text-black hover:bg-zinc-100"
                                                                : "border border-white/10 text-white/70 hover:text-white hover:border-white/20 hover:bg-white/5"
                                                        }`}
                                                    >
                                                        <span className="capitalize">{link.label}</span>
                                                        {isGit
                                                            ? <Github size={14} />
                                                            : <ExternalLink size={14} className={isLive ? "opacity-60" : "opacity-40 group-hover:opacity-80"} />
                                                        }
                                                    </Link>
                                                );
                                            })}
                                        </motion.div>
                                    )}
                                </motion.div>
                            </div>

                            {/* ─── RIGHT: Media Panel ─── */}
                            <motion.div
                                className="relative flex-1 flex flex-col min-h-[55vw] sm:min-h-[320px] lg:min-h-0 bg-black/30"
                                initial={{ opacity: 0, scale: 1.04, filter: "blur(8px)" }}
                                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                transition={{ duration: 0.55, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                            >
                                {/* Desktop close */}
                                <button
                                    ref={closeBtnRef}
                                    onClick={onClose}
                                    aria-label="Close modal"
                                    className="hidden lg:flex absolute top-5 right-5 z-20 items-center justify-center w-9 h-9 rounded-full bg-black/40 hover:bg-white/10 border border-white/8 text-zinc-400 hover:text-white transition-all backdrop-blur-sm"
                                >
                                    <X size={16} />
                                </button>

                                {/* Main media */}
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
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <video
                                                        src={media[currentMediaIndex].src}
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

                                    {hasMultiple && (
                                        <div className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
                                            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)" }}
                                        />
                                    )}

                                    {hasMultiple && (
                                        <>
                                            <button
                                                onClick={prevMedia}
                                                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 border border-white/10 text-white/70 hover:text-white transition-all backdrop-blur-sm"
                                            >
                                                <ChevronLeft size={18} />
                                            </button>
                                            <button
                                                onClick={nextMedia}
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
                                                    item.src.endsWith(".m3u8") ? (
                                                        <HLSVideo
                                                            src={item.src}
                                                            className="w-full h-full object-cover"
                                                            autoPlay={false}
                                                            muted
                                                            controls={false}
                                                        />
                                                    ) : (
                                                        <video
                                                            src={item.src}
                                                            muted
                                                            playsInline
                                                            preload="metadata"
                                                            className="w-full h-full object-cover"
                                                        />
                                                    )
                                                ) : (
                                                    <Image src={item.src} alt="" fill className="object-cover" />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        </div>

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
