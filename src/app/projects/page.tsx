import { Suspense } from "react";
import { projects } from "@/data/portfolio";
import ProjectsGrid from "@/components/ui/ProjectsGrid";

export default function ProjectsPage() {
    return (
        <main className="relative min-h-screen w-full overflow-hidden">
            <div className="relative z-10 pt-24 md:pt-32 pb-28 md:pb-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
                <div className="mb-16">
                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4">
                        Selected <span className="text-zinc-500">Works</span>
                    </h1>
                    <p className="text-zinc-400 max-w-xl text-lg">
                        A collection of experiments, products, and chaos engineering.
                    </p>
                </div>

                <Suspense fallback={null}>
                    <ProjectsGrid projects={projects} />
                </Suspense>
            </div>
        </main>
    );
}
