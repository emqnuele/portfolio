"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, User, Briefcase } from "lucide-react";
import clsx from "clsx";
import { useRef, useLayoutEffect, useState } from "react";

const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "About", path: "/about", icon: User },
    { name: "Projects", path: "/projects", icon: Briefcase },
];

export default function Navbar() {
    const pathname = usePathname();
    const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
    const navRef = useRef<HTMLElement | null>(null);
    const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number; height: number } | null>(null);

    const activeIndex = navItems.findIndex((item) => item.path === pathname);

    const measure = () => {
        const activeEl = itemRefs.current[activeIndex];
        const navEl = navRef.current;
        if (!activeEl || !navEl) return;

        const navRect = navEl.getBoundingClientRect();
        const itemRect = activeEl.getBoundingClientRect();

        setIndicatorStyle({
            left: itemRect.left - navRect.left,
            width: itemRect.width,
            height: itemRect.height,
        });
    };

    useLayoutEffect(() => {
        measure();

        const navEl = navRef.current;
        if (!navEl) return;

        const observer = new ResizeObserver(() => measure());
        observer.observe(navEl);
        return () => observer.disconnect();
    }, [activeIndex]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
            <nav
                ref={navRef}
                className="relative flex items-center gap-2 px-4 py-3 rounded-full border border-white/10 bg-black/40 backdrop-blur-xl shadow-[0_0_20px_rgba(0,0,0,0.5)]"
            >
                {/* Single persistent indicator — avoids layoutId scroll-offset bug */}
                {indicatorStyle && (
                    <motion.div
                        className="absolute top-1/2 -translate-y-1/2 rounded-full bg-white/10 border border-white/5 shadow-[0_0_10px_rgba(255,255,255,0.1)] pointer-events-none"
                        animate={{
                            left: indicatorStyle.left,
                            width: indicatorStyle.width,
                            height: indicatorStyle.height,
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                )}

                {navItems.map((item, i) => {
                    const isActive = pathname === item.path;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.path}
                            href={item.path}
                            ref={(el) => { itemRefs.current[i] = el; }}
                            className={clsx(
                                "relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full transition-colors duration-300 group z-10",
                                isActive ? "text-white" : "text-zinc-500 hover:text-zinc-200"
                            )}
                        >
                            <Icon size={20} strokeWidth={1.5} />

                            {/* Tooltip */}
                            <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 border border-white/10 rounded text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap backdrop-blur-sm">
                                {item.name}
                            </span>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
