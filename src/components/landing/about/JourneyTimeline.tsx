"use client";

import { motion, type Variants } from "framer-motion";
import { journey } from "@/data/portfolio";

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 }
    }
};

export default function JourneyTimeline() {
    return (
        <div className="relative z-10 max-w-4xl mx-auto">
            <motion.div
                className="text-center mb-16"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeInUp}
            >
                <p className="font-mono text-xs text-blue-400 tracking-widest uppercase mb-2">JOURNEY</p>
                <h2 className="text-3xl md:text-5xl font-bold text-white">My Career</h2>
            </motion.div>

            <div className="relative">
                {/* Continuous Line Background for Desktop */}
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/30 -translate-x-1/2" />

                <div className="space-y-4">
                    {journey.map((item, idx) => (
                        <motion.div
                            key={idx}
                            className="relative md:grid md:grid-cols-[1fr_auto_1fr] md:gap-16 items-start pb-24 md:pb-36 last:pb-0"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                        >
                            {/* Mobile: Line & Dot */}
                            <div className="md:hidden absolute left-[7px] top-[8px] bottom-0 w-[1px] bg-white/30" />
                            <div className="md:hidden absolute left-0 top-[5px] w-4 h-4 rounded-full border-4 border-black bg-zinc-600" />

                            {/* Period (Left or Right based on index) - Desktop */}
                            <div className={`hidden md:block md:pt-[0.35rem] md:row-start-1 ${idx % 2 !== 0 ? 'md:col-start-3 md:text-left' : 'md:col-start-1 md:text-right'}`}>
                                <span className="font-mono text-purple-400 text-xs tracking-[0.2em] uppercase">{item.period}</span>
                            </div>

                            {/* Center Marker - Desktop */}
                            <div className="hidden md:flex flex-col items-center justify-start h-full relative col-start-2 row-start-1 w-3">
                                <div className="w-3 h-3 rounded-full bg-black border-2 border-white/40 z-10 mt-[0.55rem] shrink-0" />
                            </div>

                            {/* Content */}
                            <div className={`pl-8 md:pl-0 md:row-start-1 ${idx % 2 !== 0 ? 'md:col-start-1 md:text-right' : 'md:col-start-3'}`}>
                                {/* Mobile Period */}
                                <div className="md:hidden mb-2 pt-1">
                                    <span className="font-mono text-purple-400 text-xs tracking-[0.2em] uppercase">{item.period}</span>
                                </div>

                                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-tight">{item.title}</h3>
                                <ul className={`space-y-1 text-zinc-400 text-sm md:text-base leading-normal ${idx % 2 !== 0 ? 'md:ml-auto' : ''}`}>
                                    {item.details.map((d, i) => (
                                        <li key={i}>{d}</li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
