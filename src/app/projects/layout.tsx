import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Projects",
    description:
        "Selected works by Emanuele Faraci — websites, web apps, AI bots, Telegram automations, Minecraft mods, and creative coding projects.",
};

export default function ProjectsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
