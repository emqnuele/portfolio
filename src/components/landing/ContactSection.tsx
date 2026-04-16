"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Send, ArrowRight, CheckCircle, AlertCircle, Github, Linkedin, Mail } from "lucide-react";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.92, y: 24 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
};

const quickLinks = [
    { icon: Github, label: "GitHub", handle: "@emqnuele", href: "https://github.com/emqnuele" },
    { icon: Linkedin, label: "LinkedIn", handle: "emanuelee-faraci", href: "https://www.linkedin.com/in/emanuelee-faraci/" },
    { icon: Mail, label: "Email", handle: "hey@emanuelefaraci.com", href: "mailto:hey@emanuelefaraci.com" },
];

type Status = "idle" | "loading" | "success" | "error";

export default function ContactSection() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<Status>("idle");
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, message }),
            });

            if (!res.ok) throw new Error();
            setStatus("success");
            setName("");
            setEmail("");
            setMessage("");
        } catch {
            setStatus("error");
            setTimeout(() => setStatus("idle"), 4000);
        }
    };

    const inputBase =
        "w-full bg-white/[0.04] border rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-zinc-600 outline-none transition-all duration-300 font-mono resize-none";

    const inputFocused = (field: string) =>
        focusedField === field
            ? "border-white/20 shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_0_20px_rgba(255,255,255,0.04)] bg-white/[0.06]"
            : "border-white/8 hover:border-white/12";

    return (
        <section id="contact" className="relative z-10 px-4 pt-16 md:pt-32 pb-16 md:pb-24 max-w-7xl mx-auto border-t border-white/5">

            <motion.div
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-start"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={containerVariants}
            >
                {/* LEFT — Copy & quick links */}
                <motion.div variants={itemVariants} className="lg:sticky lg:top-32">

                    {/* Label */}
                    <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4 md:mb-6">
                        Get in touch
                    </p>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight mb-4 md:mb-6">
                        Let&apos;s build{" "}
                        <span className="text-zinc-500">something.</span>
                    </h2>

                    <p className="text-sm md:text-base text-zinc-400 leading-relaxed max-w-sm mb-6 md:mb-10 font-light">
                        Got a project in mind? I&apos;m available for freelance work, collabs, and interesting conversations.
                        Fill the form or reach me directly.
                    </p>

                    {/* Quick contact links — horizontal strip on mobile, vertical on desktop */}
                    <div className="flex flex-row lg:flex-col gap-2 lg:gap-2 flex-wrap">
                        {quickLinks.map(({ icon: Icon, label, handle, href }) => (
                            <motion.a
                                key={label}
                                href={href}
                                target={href.startsWith("http") ? "_blank" : undefined}
                                rel="noopener noreferrer"
                                whileHover={{ x: 2 }}
                                className="group flex items-center gap-3 px-3 py-2.5 rounded-xl border border-white/6 bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/12 transition-all lg:border-transparent lg:bg-transparent lg:p-3 lg:-ml-3 lg:hover:bg-white/5 lg:w-fit"
                            >
                                <div className="p-1.5 lg:p-2 rounded-lg bg-white/5 border border-white/8 text-zinc-400 group-hover:text-white group-hover:border-white/15 transition-all shrink-0">
                                    <Icon size={14} strokeWidth={1.5} />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs lg:text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors leading-none mb-0.5 lg:mb-1">{label}</p>
                                    <p className="text-[10px] lg:text-xs font-mono text-zinc-500 group-hover:text-zinc-400 transition-colors truncate">{handle}</p>
                                </div>
                                <ArrowRight size={12} className="text-zinc-600 group-hover:text-white opacity-0 group-hover:opacity-100 transition-all ml-auto lg:ml-1 shrink-0 hidden lg:block" />
                            </motion.a>
                        ))}
                    </div>
                </motion.div>

                {/* RIGHT — Form card */}
                <motion.div variants={itemVariants}>
                    <div
                        className="relative rounded-2xl md:rounded-3xl overflow-hidden"
                        style={{
                            background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            boxShadow: "0 24px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
                        }}
                    >
                        {/* Card inner glow */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

                        {/* announces status changes to screen readers */}
                        <div aria-live="polite" aria-atomic="true" className="sr-only">
                            {status === "success" && "Message sent. I'll get back to you within 2 hours."}
                            {status === "error" && "Something went wrong. Try again or contact me directly."}
                        </div>

                        <AnimatePresence mode="wait">
                            {status === "success" ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.96 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.96 }}
                                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                    className="flex flex-col items-center justify-center gap-5 p-8 sm:p-12 min-h-[320px] sm:min-h-[420px] text-center"
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.1 }}
                                    >
                                        <CheckCircle size={40} className="text-emerald-400" strokeWidth={1.5} />
                                    </motion.div>
                                    <div>
                                        <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Message sent.</h3>
                                        <p className="text-sm text-zinc-400 font-mono max-w-xs">
                                            I&apos;ll get back to you within 2 hours. Check your inbox.
                                        </p>
                                    </div>
                                    <motion.button
                                        onClick={() => setStatus("idle")}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="text-xs font-mono text-zinc-500 hover:text-white transition-colors uppercase tracking-widest"
                                    >
                                        Send another →
                                    </motion.button>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key="form"
                                    ref={formRef}
                                    onSubmit={handleSubmit}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="p-5 sm:p-8 flex flex-col gap-4 sm:gap-5"
                                >
                                    {/* Form header */}
                                    <div className="mb-1">
                                        <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-1">New message</p>
                                        <div className="h-px w-full bg-white/5" />
                                    </div>

                                    {/* Name & Email row */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Your name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                onFocus={() => setFocusedField("name")}
                                                onBlur={() => setFocusedField(null)}
                                                required
                                                className={`${inputBase} ${inputFocused("name")}`}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                placeholder="you@example.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                onFocus={() => setFocusedField("email")}
                                                onBlur={() => setFocusedField(null)}
                                                required
                                                className={`${inputBase} ${inputFocused("email")}`}
                                            />
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest">
                                            Message
                                        </label>
                                        <textarea
                                            placeholder="Tell me about your project, idea, or just say hi."
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            onFocus={() => setFocusedField("message")}
                                            onBlur={() => setFocusedField(null)}
                                            required
                                            rows={4}
                                            className={`${inputBase} ${inputFocused("message")}`}
                                        />
                                    </div>

                                    {/* Error state */}
                                    <AnimatePresence>
                                        {status === "error" && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -8 }}
                                                className="flex items-center gap-2 text-xs text-red-400 font-mono"
                                            >
                                                <AlertCircle size={13} />
                                                Something went wrong. Try again or contact me directly.
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Submit */}
                                    <motion.button
                                        type="submit"
                                        disabled={status === "loading"}
                                        whileHover={status !== "loading" ? { scale: 1.01 } : {}}
                                        whileTap={status !== "loading" ? { scale: 0.98 } : {}}
                                        className="mt-0.5 w-full flex items-center justify-center gap-2.5 px-6 py-3.5 sm:py-4 bg-white text-black rounded-xl font-bold text-sm transition-colors hover:bg-zinc-100 disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        {status === "loading" ? (
                                            <>
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                                                    className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full"
                                                />
                                                Sending…
                                            </>
                                        ) : (
                                            <>
                                                Send message
                                                <Send size={15} />
                                            </>
                                        )}
                                    </motion.button>

                                    <p className="text-center text-[11px] text-zinc-500 pb-0.5">
                                        By clicking &apos;Send Message&apos;, you confirm that you have read our{" "}
                                        <a href="https://www.iubenda.com/privacy-policy/38634822" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-zinc-300 transition-colors">
                                            Privacy Policy
                                        </a>.
                                    </p>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>

            </motion.div>
        </section>
    );
}
