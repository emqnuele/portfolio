"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

type RevealVariant = "scale" | "slide-up" | "slide-right" | "slide-left" | "fade";

function buildVariants(variant: RevealVariant, delay: number): Variants {
    const ease = [0.22, 1, 0.36, 1] as const;
    const transition = { duration: 0.7, ease, delay };

    switch (variant) {
        case "scale":
            return {
                hidden: { opacity: 0, scale: 0.88 },
                visible: { opacity: 1, scale: 1, transition },
            };
        case "slide-up":
            return {
                hidden: { opacity: 0, y: 48 },
                visible: { opacity: 1, y: 0, transition },
            };
        case "slide-right":
            return {
                hidden: { opacity: 0, x: 48 },
                visible: { opacity: 1, x: 0, transition },
            };
        case "slide-left":
            return {
                hidden: { opacity: 0, x: -48 },
                visible: { opacity: 1, x: 0, transition },
            };
        case "fade":
            return {
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition },
            };
    }
}

interface ScrollRevealProps {
    children: ReactNode;
    variant?: RevealVariant;
    delay?: number;
    className?: string;
    margin?: string;
}

export default function ScrollReveal({
    children,
    variant = "scale",
    delay = 0,
    className,
    margin = "-80px",
}: ScrollRevealProps) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: `0px 0px ${margin} 0px` }}
            variants={buildVariants(variant, delay)}
            className={className}
        >
            {children}
        </motion.div>
    );
}
