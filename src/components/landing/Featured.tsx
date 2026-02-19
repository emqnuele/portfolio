"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, Variants, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Github, ExternalLink, Zap, Code, Layout } from "lucide-react";
import { projects } from "@/data/portfolio";
import HLSVideo from "@/components/ui/HLSVideo";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }
    }
};

const badgeVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -20 },
    visible: {
        opacity: 1,
        scale: 1,
        rotate: -6,
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 20,
            delay: 0.5
        }
    }
};

export default function Featured() {
    const featuredProject = projects[0];
    const router = useRouter();
    const [shouldShowVideo, setShouldShowVideo] = useState(false);
    const [videoReady, setVideoReady] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShouldShowVideo(true);
        }, 2000); // 2 seconds delay
        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="relative z-10 px-4 py-24 max-w-7xl mx-auto">
            <motion.div
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={containerVariants}
            >

                {/* Visual - Pinned Project */}
                <motion.div
                    variants={itemVariants}
                    className="relative group cursor-pointer"
                    onClick={() => router.push(`/projects?open=${featuredProject.slug}`)}
                >
                    {/* Featured Badge */}
                    <motion.div
                        className="absolute top-[-5px] left-[-5px] z-50 pointer-events-none"
                        variants={badgeVariants}
                    >
                        <div className="absolute inset-0 bg-cyan-400 blur-md opacity-50 rounded-full" />
                        <span className="relative px-4 py-1.5 rounded-full bg-gradient-to-br from-cyan-300 to-cyan-500 text-black font-bold tracking-wide shadow-[0_4px_12px_rgba(6,182,212,0.4)] flex items-center justify-center border border-cyan-200/50">
                            FEATURED
                        </span>
                    </motion.div>

                    <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden hover:bg-white/[0.07] transition-colors duration-500 p-2">
                        <div className="relative aspect-video rounded-2xl overflow-hidden bg-zinc-900/50">
                            {/* Base Image (Always visible as fallback) */}
                            <Image
                                src={featuredProject.image}
                                alt={featuredProject.title}
                                fill
                                priority
                                className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                            />

                            {/* Video Preview (Fades in over image ONLY when ready) */}
                            <AnimatePresence>
                                {shouldShowVideo && featuredProject.videos && featuredProject.videos.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 1.05, filter: "blur(15px)" }}
                                        animate={{
                                            opacity: videoReady ? 1 : 0,
                                            scale: videoReady ? 1 : 1.05,
                                            filter: videoReady ? "blur(0px)" : "blur(15px)"
                                        }}
                                        exit={{ opacity: 0, scale: 1.05, filter: "blur(15px)" }}
                                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                                        className="absolute inset-0 z-10 bg-zinc-900"
                                    >
                                        {featuredProject.videos[0].endsWith('.m3u8') ? (
                                            <HLSVideo
                                                src={featuredProject.videos[0]}
                                                className="w-full h-full object-cover"
                                                autoPlay
                                                muted
                                                controls={false}
                                                onReady={() => setVideoReady(true)}
                                            />
                                        ) : (
                                            <video
                                                src={featuredProject.videos[0]}
                                                autoPlay
                                                muted
                                                loop
                                                playsInline
                                                className="w-full h-full object-cover"
                                                onCanPlay={() => setVideoReady(true)}
                                            />
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Subtle Overlay */}
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-[5]" />
                        </div>

                        <div className="p-4 sm:p-6">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl sm:text-2xl font-bold text-white transition-colors">
                                    {featuredProject.title}
                                </h3>

                                <div className="flex gap-3 relative z-20">
                                    {featuredProject.links.map(link => (
                                        <Link
                                            key={link.label}
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all hover:scale-110 hover:border-white/20"
                                            aria-label={link.label}
                                        >
                                            {link.label.toLowerCase().includes('git') ? <Github size={20} /> : <ExternalLink size={20} />}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            <p className="text-sm text-zinc-400 font-mono mb-4">
                                {featuredProject.tagline}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {featuredProject.stack.slice(0, 3).map(tech => (
                                    <span key={tech} className="text-xs text-zinc-500 border border-white/5 bg-white/5 px-2 py-1 rounded">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Content - Summary & Stats */}
                <motion.div variants={itemVariants}>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                        Not just <span className="text-zinc-400">Code.</span>
                    </h2>

                    <p className="text-lg text-zinc-400 mb-8 leading-relaxed max-w-lg">
                        I build digital products that feel alive. From interactive frontend experiences to complex AI automation systems, every project is crafted with precision and purpose.
                    </p>

                    {/* Trust Labels / Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-10">
                        {[
                            { label: "Projects Completed", value: "+15", icon: Layout },
                            { label: "Years Experience", value: "2+", icon: Code },
                            { label: "Response Time", value: "< 2h", icon: Zap },
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                variants={itemVariants}
                                className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 transition-colors"
                            >
                                <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400">
                                    <stat.icon size={24} />
                                </div>
                                <div className="">
                                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                                    <div className="text-xs font-mono text-zinc-500 uppercase tracking-wide">{stat.label}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                            href="mailto:hey@emanuelefaraci.com"
                            className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-zinc-200 transition-colors"
                        >
                            Start Chatting <ArrowRight size={18} />
                        </Link>
                        <Link
                            href="/projects"
                            className="flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/10 hover:bg-white/5 text-white transition-colors"
                        >
                            View All Projects
                        </Link>
                    </div>
                </motion.div>

            </motion.div>
        </section>
    );
}
