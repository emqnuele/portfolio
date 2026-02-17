"use client";

import Link from "next/link";
import { Github, Send, Mail, ArrowUpRight, Twitter, Instagram } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const stackBadges = ['react', 'next.js', 'python', 'fastapi', 'ai agents'];

const contactChannels = [
    {
        id: 'github',
        label: 'gitHub',
        handle: '@emqnuele',
        href: 'https://github.com/emqnuele',
        description: 'All my projects',
        icon: Github
    },
    {
        id: 'twitter',
        label: 'X (Twitter)',
        handle: '@emqnuele',
        href: 'https://x.com/emqnuale',
        description: 'Thoughts & Updates',
        icon: Twitter
    },
    {
        id: 'telegram',
        label: 'telegram',
        handle: 't.me/emqnuele',
        href: 'https://t.me/emqnuele',
        description: 'Direct contact',
        icon: Send
    },
    {
        id: 'email',
        label: 'email',
        handle: 'hey@emanuelefaraci.com',
        href: 'mailto:hey@emanuelefaraci.com',
        description: 'Business inquiries',
        icon: Mail
    }
];

const navLinks = [
    { label: 'home', to: '/' },
    { label: 'about', to: '/about' },
    { label: 'projects', to: '/projects' }
];

function LocationTime() {
    const [time, setTime] = useState<string>("");

    useEffect(() => {
        const updateTime = () => {
            setTime(new Date().toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'Europe/Rome',
                hour12: false
            }));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    if (!time) return null;

    return (
        <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-zinc-300">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="font-mono text-xs uppercase tracking-wider font-semibold">Modena, IT</span>
            </div>
            <p className="text-xs text-zinc-400 font-mono ml-4">{time} (CET)</p>
        </div>
    );
}

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="relative mt-32 border-t border-white/5 bg-black/40 backdrop-blur-xl">

            <div className="max-w-[95%] mx-auto px-4 md:px-8 py-20">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32 mb-16 lg:mb-24">

                    {/* BRAND SECTION (LEFT) */}
                    <div className="space-y-12">
                        <div className="inline-block">
                            <span className="px-3 py-1 rounded-full border border-zinc-700 bg-zinc-800/50 text-[10px] font-mono text-zinc-300 uppercase tracking-widest font-medium">
                                Available for work
                            </span>
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white tracking-tighter leading-[0.9]">
                                Open to collab & <br />
                                <span className="text-zinc-400">CS adventures.</span>
                            </h2>
                            <p className="text-zinc-300 text-lg max-w-lg leading-relaxed font-light">
                                From Next.js interfaces to Python automation agents.
                                I turn chaotic requirements into clean, shipping code.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {stackBadges.map(badge => (
                                <span key={badge} className="px-3 py-1.5 rounded-full text-xs font-mono text-zinc-300 bg-white/10 border border-white/10 font-medium">
                                    {badge}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* PANELS SECTION (RIGHT) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:gap-12 items-start">

                        {/* Channels (Col 1) */}
                        <div className="space-y-8">
                            <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-widest pl-1 font-semibold">Connect</h3>
                            <div className="flex flex-col gap-2">
                                {contactChannels.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <motion.a
                                            key={item.id}
                                            href={item.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ x: 5 }}
                                            className="group flex items-start gap-4 p-3 -ml-3 rounded-lg hover:bg-white/10 transition-colors"
                                        >
                                            <div className="mt-1 text-zinc-400 group-hover:text-white transition-colors">
                                                <Icon size={20} />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-zinc-200 font-semibold text-sm group-hover:text-white transition-colors">{item.label}</span>
                                                    <ArrowUpRight size={14} className="text-zinc-400 group-hover:text-white opacity-0 group-hover:opacity-100 transition-all" />
                                                </div>
                                                <p className="text-xs text-zinc-400 mt-1 font-mono group-hover:text-zinc-300 transition-colors">{item.description}</p>
                                            </div>
                                        </motion.a>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Nav & Location (Col 2) */}
                        <div className="flex flex-col gap-10 lg:gap-12">
                            {/* Explore */}
                            <nav className="space-y-6" aria-label="Footer navigation">
                                <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-widest font-semibold">Explore</h3>
                                <ul className="space-y-4">
                                    {navLinks.map(link => (
                                        <li key={link.label}>
                                            <Link href={link.to} className="text-zinc-300 hover:text-white transition-colors text-sm font-medium hover:pl-2 duration-200 inline-flex items-center gap-2">
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>

                            {/* Location */}
                            <div className="space-y-6">
                                <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-widest font-semibold">Location</h3>
                                <LocationTime />
                            </div>
                        </div>

                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
                    <div className="flex flex-col gap-1">
                        <p className="text-zinc-400 text-sm font-medium">© {year} Emanuele Faraci</p>
                        <p className="text-zinc-500 text-xs">Developer & Designer</p>
                    </div>

                    <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-default max-w-full">
                        <span className="relative flex h-2 w-2 shrink-0">
                            <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-zinc-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-zinc-300"></span>
                        </span>
                        <p className="text-zinc-300 text-[10px] sm:text-xs font-mono uppercase tracking-widest font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                            Designed & Engineered in <span className="text-white ml-1">Italy</span>
                        </p>
                    </div>
                </div>

            </div>
        </footer>
    );
}
