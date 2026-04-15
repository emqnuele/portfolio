"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import BlurReveal from "@/components/ui/BlurReveal";
import { stats } from "@/data/portfolio";

const ABOUT_IMAGE_SRC = "/about/main.png";

const fadeInUp: Variants = {
    hidden: { opacity: 0, scale: 0.92, y: 20 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

export default function AboutHeader() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-12 items-center relative z-10 lg:min-h-[calc(100vh-6rem)]">
            {/* Text Column */}
            <motion.div
                className="lg:order-1 space-y-8 text-center lg:text-left items-center lg:items-start flex flex-col"
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
            >
                <div className="space-y-3">
                    <motion.p variants={fadeInUp} className="font-mono text-xs text-zinc-500 tracking-[0.4em] uppercase">
                        about me
                    </motion.p>
                    <div className="flex flex-wrap items-baseline gap-x-3 sm:gap-x-4 leading-[0.9]">
                        <BlurReveal text="Emanuele" as="h1" className="text-4xl sm:text-6xl md:text-8xl font-bold text-white tracking-tight" />
                        <BlurReveal text="Faraci" as="span" className="text-4xl sm:text-6xl md:text-8xl font-bold text-zinc-500 tracking-tight" delay={0.5} />
                    </div>
                </div>

                {/* Mobile Image */}
                <div className="lg:hidden flex justify-center">
                    <div className="relative w-[min(320px,85vw)] aspect-[3/4] rounded-[clamp(24px,5vw,40px)] overflow-hidden bg-zinc-900 border border-zinc-800 shadow-[0_40px_100px_rgba(4,0,15,0.55)]">
                        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(4,3,10,0.15)] to-[rgba(58,18,108,0.4)] mix-blend-screen pointer-events-none z-10" />
                        <Image
                            src={ABOUT_IMAGE_SRC}
                            alt="Emanuele Faraci"
                            fill
                            className="object-cover saturate-0 brightness-[0.83] contrast-[1.05]"
                            priority
                        />
                    </div>
                </div>

                <motion.p variants={fadeInUp} className="text-base sm:text-lg md:text-xl text-zinc-300 leading-relaxed max-w-lg text-center lg:text-left">
                    I pick up whatever a project needs and figure it out. CS student, freelancer, hackathon winner — I build things that go live.
                </motion.p>

                <motion.dl variants={staggerContainer} className="grid grid-cols-2 gap-x-6 sm:gap-x-8 md:gap-x-12 gap-y-6 md:gap-y-8 pt-6 mt-2 w-full text-left">
                    {stats.map(stat => (
                        <motion.div key={stat.label} variants={fadeInUp} className="border-t border-white/20 pt-3 md:pt-4">
                            <dt className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.3em] mb-1.5 md:mb-2">{stat.label}</dt>
                            <dd className="text-zinc-200 text-base md:text-lg font-medium">{stat.value}</dd>
                        </motion.div>
                    ))}
                </motion.dl>
            </motion.div>

            {/* Image Column (Desktop) */}
            <motion.div
                className="hidden lg:flex order-1 lg:order-2 justify-center lg:justify-end"
                initial={{ opacity: 0, scale: 0.93, x: 40, filter: "blur(12px)" }}
                animate={{ opacity: 1, scale: 1, x: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
                <div className="relative w-full max-w-[240px] md:max-w-[340px] aspect-[3/4.5] rounded-[32px] md:rounded-[48px] overflow-hidden bg-zinc-900 border border-zinc-800 shadow-[0_50px_120px_rgba(4,0,15,0.55)]">
                    <div className="absolute inset-0 bg-gradient-to-br from-[rgba(4,3,10,0.15)] to-[rgba(58,18,108,0.4)] mix-blend-screen pointer-events-none z-10" />
                    <Image
                        src={ABOUT_IMAGE_SRC}
                        alt="Emanuele Faraci"
                        fill
                        className="object-cover saturate-0 brightness-[0.83] contrast-[1.05]"
                        priority
                    />
                </div>
            </motion.div>
        </div>
    );
}
