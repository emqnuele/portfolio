"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/data/portfolio";

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
    return (
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
                    className="group relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden hover:bg-white/10 transition-colors duration-500"
                >
                    <div className="aspect-video relative overflow-hidden bg-zinc-900/50">
                        {project.image ? (
                            <Image
                                src={project.image}
                                alt={`Screenshot of ${project.title} – ${project.tagline}`}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-zinc-700 font-mono text-xs uppercase tracking-widest">
                                No Image Preview
                            </div>
                        )}

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                    </div>

                    <div className="p-6 md:p-8">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-sm font-mono text-zinc-500">{project.tagline}</p>
                            </div>
                            <div className="flex gap-2">
                                {project.links.map(link => (
                                    <Link
                                        key={link.label}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-full bg-white/5 hover:bg-white/10 hover:text-white text-zinc-400 transition-colors"
                                        aria-label={`${link.label} link for ${project.title}`}
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
    );
}
