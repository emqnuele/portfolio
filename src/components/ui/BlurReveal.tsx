"use client";

import { motion, type Variants } from "framer-motion";

interface BlurRevealProps {
    text: string;
    className?: string;
    delay?: number;
    as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
}

export default function BlurReveal({ text, className = "", delay = 0, as = "h1" }: BlurRevealProps) {
    const words = text.split(" ");

    const Tag = motion[as] as typeof motion.h1;

    const container: Variants = {
        hidden: { opacity: 0 },
        visible: (i: number = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.03, delayChildren: delay * i },
        }),
    };

    const child: Variants = {
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                duration: 0.4,
                ease: "easeOut"
            },
        },
        hidden: {
            opacity: 0,
            y: 8,
            filter: "blur(8px)",
            transition: {
                duration: 0.4,
                ease: "easeOut"
            },
        },
    };

    return (
        <Tag
            className={`flex flex-wrap overflow-hidden ${className}`}
            variants={container}
            initial="hidden"
            animate="visible"
        >
            {words.map((word, index) => (
                <span key={index} className="flex whitespace-nowrap mr-2 lg:mr-4">
                    {word.split("").map((letter, i) => (
                        <motion.span variants={child} key={i}>
                            {letter}
                        </motion.span>
                    ))}
                </span>
            ))}
        </Tag>
    );
}
