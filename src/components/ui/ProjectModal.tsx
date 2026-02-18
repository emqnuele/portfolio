"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
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

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

    const media: { type: 'video' | 'image', src: string, poster?: string }[] = [];

    if (project.videos && project.videos.length > 0) {
        project.videos.forEach(v => media.push({ type: 'video', src: v, poster: project.image }));
    }

    if (project.images && project.images.length > 0) {
        project.images.forEach(img => media.push({ type: 'image', src: img }));
    } else if (project.image && media.length === 0) {
        media.push({ type: 'image', src: project.image });
    }

    const hasMultipleMedia = media.length > 1;

    const nextMedia = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentMediaIndex((prev) => (prev + 1) % media.length);
    };

    const prevMedia = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentMediaIndex((prev) => (prev - 1 + media.length) % media.length);
    };

    useEffect(() => {
        if (!isOpen) return;
        document.body.style.overflow = "hidden";
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight") nextMedia();
            if (e.key === "ArrowLeft") prevMedia();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, onClose, media.length]);

    useEffect(() => {
        setCurrentMediaIndex(0);
    }, [project.slug]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/90 backdrop-blur-xl"
                    />

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="w-full max-w-4xl bg-[#0A0A0B]/80 border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] z-[101] backdrop-blur-md"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Media Section (Top) */}
                        <div className="relative w-full aspect-video bg-black/20 flex-shrink-0 group">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`${project.slug}-${currentMediaIndex}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute inset-0 flex items-center justify-center"
                                >
                                    {media[currentMediaIndex].type === 'video' ? (
                                        media[currentMediaIndex].src.endsWith('.m3u8') ? (
                                            <HLSVideo
                                                src={media[currentMediaIndex].src}
                                                poster={media[currentMediaIndex].poster}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <video
                                                src={media[currentMediaIndex].src}
                                                poster={media[currentMediaIndex].poster}
                                                autoPlay
                                                muted
                                                loop
                                                className="w-full h-full object-cover"
                                            />
                                        )
                                    ) : (
                                        <div className="relative w-full h-full">
                                            <Image
                                                src={media[currentMediaIndex].src}
                                                alt={project.title}
                                                fill
                                                priority
                                                className="object-cover"
                                            />
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>

                            {/* Navigation Arrows */}
                            {hasMultipleMedia && (
                                <>
                                    <button
                                        onClick={prevMedia}
                                        className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 text-white/70 hover:text-white hover:bg-white/10 transition-all backdrop-blur-md border border-white/5 opacity-0 group-hover:opacity-100"
                                    >
                                        <ChevronLeft size={24} />
                                    </button>
                                    <button
                                        onClick={nextMedia}
                                        className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 text-white/70 hover:text-white hover:bg-white/10 transition-all backdrop-blur-md border border-white/5 opacity-0 group-hover:opacity-100"
                                    >
                                        <ChevronRight size={24} />
                                    </button>
                                </>
                            )}

                            {/* Close Button Overlay */}
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 p-2 rounded-full bg-black/40 text-white/70 hover:text-white hover:bg-white/10 transition-colors backdrop-blur-sm border border-white/10"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content Section (Bottom) */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 md:p-10 space-y-8 bg-gradient-to-b from-white/[0.02] to-transparent">
                            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                                <div className="space-y-2">
                                    <h2 className="text-4xl font-bold text-white tracking-tight">{project.title}</h2>
                                    <p className="text-zinc-500 font-mono text-sm uppercase tracking-widest">{project.tagline}</p>
                                </div>

                                <div className="flex gap-3">
                                    {project.links.map((link) => (
                                        <Link
                                            key={link.label}
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all font-medium text-sm group ${link.label.toLowerCase() === 'live'
                                                    ? 'bg-white text-black hover:bg-zinc-200'
                                                    : 'bg-white/5 text-white hover:bg-white/10 border border-white/5'
                                                }`}
                                        >
                                            <span className="capitalize">{link.label}</span>
                                            {link.label.toLowerCase().includes('git') ? <Github size={16} /> : <ExternalLink size={16} className="opacity-50 group-hover:opacity-100" />}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <div className="prose prose-invert max-w-none text-zinc-400 font-normal leading-relaxed text-lg">
                                <p>{project.description}</p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.2em] font-bold">Tech Stack</h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.stack.map((tech) => (
                                        <span key={tech} className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/5 text-[11px] text-zinc-300 font-mono">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
