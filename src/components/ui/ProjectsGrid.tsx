"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/data/portfolio";
import ProjectModal from "./ProjectModal";
import HLSVideo from "./HLSVideo";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 20 } }
};

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hoveredProject, setHoveredProject] = useState<string | null>(null);
    const [activeVideo, setActiveVideo] = useState<string | null>(null);
    const [videoReady, setVideoReady] = useState<Record<string, boolean>>({});
    const router = useRouter();
    const searchParams = useSearchParams();

    const openModal = (project: Project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        // keep selectedProject alive during exit animation, then clear
        setTimeout(() => setSelectedProject(null), 400);
    };

    useEffect(() => {
        const slug = searchParams.get("open");
        if (!slug) return;
        const project = projects.find((p) => p.slug === slug);
        if (project) {
            openModal(project);
            router.replace("/projects", { scroll: false });
        }
    }, [searchParams, projects]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (hoveredProject) {
            const timer = setTimeout(() => {
                const project = projects.find(p => p.slug === hoveredProject);
                if (project?.videos && project.videos.length > 0) {
                    setActiveVideo(hoveredProject);
                }
            }, 800);
            return () => clearTimeout(timer);
        } else {
            setActiveVideo(null);
            setVideoReady({});
        }
    }, [hoveredProject, projects]);

    return (
        <>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
                {projects.map((project) => (
                    <motion.article
                        key={project.slug}
                        variants={itemVariants}
                        onClick={() => openModal(project)}
                        onMouseEnter={() => setHoveredProject(project.slug)}
                        onMouseLeave={() => setHoveredProject(null)}
                        className="group relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden hover:bg-white/[0.07] transition-colors duration-500 cursor-pointer"
                    >
                        <div className="aspect-video relative overflow-hidden bg-zinc-900/50">
                            {/* Base Image (Always visible) */}
                            {project.image ? (
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-zinc-700 font-mono text-xs uppercase tracking-widest">
                                    No Image Preview
                                </div>
                            )}

                            {/* Video Preview (Fades in over the image ONLY when ready) */}
                            <AnimatePresence>
                                {activeVideo === project.slug && project.videos && project.videos.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 1.05, filter: "blur(12px)" }}
                                        animate={{
                                            opacity: videoReady[project.slug] ? 1 : 0,
                                            scale: videoReady[project.slug] ? 1 : 1.05,
                                            filter: videoReady[project.slug] ? "blur(0px)" : "blur(12px)"
                                        }}
                                        exit={{ opacity: 0, scale: 1.05, filter: "blur(12px)" }}
                                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                        className="absolute inset-0 z-10 bg-zinc-900"
                                    >
                                        {project.videos[0].endsWith('.m3u8') ? (
                                            <HLSVideo
                                                src={project.videos[0]}
                                                className="w-full h-full object-cover"
                                                autoPlay
                                                muted
                                                controls={false}
                                                onReady={() => setVideoReady(prev => ({ ...prev, [project.slug]: true }))}
                                            />
                                        ) : (
                                            <video
                                                src={project.videos[0]}
                                                autoPlay
                                                muted
                                                loop
                                                playsInline
                                                className="w-full h-full object-cover"
                                                onCanPlay={() => setVideoReady(prev => ({ ...prev, [project.slug]: true }))}
                                            />
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-[5]" />
                        </div>

                        <div className="p-6 md:p-8">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-1 transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-sm font-mono text-zinc-500">{project.tagline}</p>
                                </div>
                                <div className="flex gap-2 relative z-20">
                                    {project.links.map(link => (
                                        <Link
                                            key={link.label}
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 rounded-full bg-white/5 hover:bg-white/10 hover:text-white text-zinc-400 transition-colors"
                                            aria-label={`${link.label} link for ${project.title}`}
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            {link.label.toLowerCase().includes('git') ? <Github size={18} /> : <ExternalLink size={18} />}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                                {project.description || "Building things that matter."}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {project.stack.map(tech => (
                                    <span key={tech} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-xs text-zinc-300 font-mono">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.article>
                ))}
            </motion.div>

            {selectedProject && (
                <ProjectModal
                    project={selectedProject}
                    isOpen={isModalOpen}
                    onClose={closeModal}
                />
            )}
        </>
    );
}