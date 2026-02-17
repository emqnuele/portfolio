"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TypewriterTextProps {
    texts: string[];
    typingSpeed?: number;
    deletingSpeed?: number;
    pauseTime?: number;
    className?: string;
}

export default function TypewriterText({
    texts,
    typingSpeed = 100,
    deletingSpeed = 50,
    pauseTime = 2000,
    className = "",
}: TypewriterTextProps) {
    const [displayedText, setDisplayedText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const handleTyping = () => {
            const currentText = texts[index];

            if (isDeleting) {
                setDisplayedText((prev) => prev.slice(0, -1));
            } else {
                setDisplayedText((prev) => currentText.slice(0, prev.length + 1));
            }

            if (!isDeleting && displayedText === currentText) {
                setTimeout(() => setIsDeleting(true), pauseTime);
            } else if (isDeleting && displayedText === "") {
                setIsDeleting(false);
                setIndex((prev) => (prev + 1) % texts.length);
            }
        };

        const timer = setTimeout(
            handleTyping,
            isDeleting ? deletingSpeed : typingSpeed
        );

        return () => clearTimeout(timer);
    }, [displayedText, isDeleting, index, texts, typingSpeed, deletingSpeed, pauseTime]);

    return (
        <span className={`${className} inline-flex items-center`}>
            {displayedText}
            <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                className="ml-1 inline-block w-[2px] h-[1.2em] bg-current"
            />
        </span>
    );
}
