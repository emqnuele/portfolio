"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import { getProjectCoverImage, type Project } from "@/data/portfolio";
import ProjectModal from "./ProjectModal";


export default function ProjectsGrid({ projects, filterKey = "" }: { projects: Project[]; filterKey?: string }) {
    void filterKey;
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    // stagger delay only on first mount, not on filter changes
    const isFirstMount = useRef(true);
    useEffect(() => { isFirstMount.current = false; }, []);
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

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
                <AnimatePresence mode="popLayout">
                {projects.map((project, i) => {
                    const firstMount = isFirstMount.current;
                    return (
                    <motion.article
                        key={project.slug}
                        layout
                        initial={firstMount ? { opacity: 0, y: 28, scale: 0.96, filter: "blur(6px)" } : { opacity: 0, scale: 0.92, filter: "blur(8px)" }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 0.9, filter: "blur(6px)", transition: { duration: 0.22, ease: [0.4, 0, 1, 1] } }}
                        transition={{
                            layout: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                            opacity: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                            scale: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                            filter: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
                            y: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                            delay: firstMount && i < 8 ? i * 0.06 : 0,
                        }}
                        onClick={() => openModal(project)}
                        className="group relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden hover:bg-white/[0.07] transition-colors duration-500 cursor-pointer"
                    >
                        <div className="aspect-video relative overflow-hidden bg-zinc-900/50">
                            {getProjectCoverImage(project) ? (
                                <Image
                                    src={getProjectCoverImage(project)}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-zinc-700 font-mono text-xs uppercase tracking-widest">
                                    No Image Preview
                                </div>
                            )}

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-[5]" />
                        </div>

                        <div className="p-4 sm:p-6 md:p-8">
                            <div className="flex justify-between items-start mb-3 sm:mb-4">
                                <div className="min-w-0 pr-2">
                                    <h3 className="text-lg sm:text-2xl font-bold text-white mb-1 transition-colors leading-snug">
                                        {project.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm font-mono text-zinc-500">{project.tagline}</p>
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

                            <p className="text-zinc-400 text-sm leading-relaxed mb-4 sm:mb-6 line-clamp-2">
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
                    );
                })}
                </AnimatePresence>
            </div>

            {/* Empty state */}
            <AnimatePresence>
                {projects.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col items-center justify-center py-24 gap-3 text-center"
                    >
                        <p className="text-zinc-400 text-lg font-semibold">No projects found</p>
                        <p className="text-zinc-600 text-sm font-mono">Try a different search or filter.</p>
                    </motion.div>
                )}
            </AnimatePresence>

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