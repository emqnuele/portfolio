import type { Metadata } from "next";
import About from "@/components/landing/About";

export const metadata: Metadata = {
    title: "About",
    description:
        "About Emanuele Faraci — CS student, fullstack developer, and automation builder based in Modena, Italy. Skills in Next.js, Python, AI agents, and bot development.",
};

export default function AboutPage() {
    return (
        <main className="relative min-h-screen w-full overflow-hidden">

            <div className="pt-24">
                <About />
            </div>
        </main>
    );
}
