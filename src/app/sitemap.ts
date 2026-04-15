import type { MetadataRoute } from "next";
import { projects } from "@/data/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
    const siteUrl = "https://emanuelefaraci.com";
    const toAbsoluteUrl = (path: string) => `${siteUrl}${path}`;
    const projectImages = Array.from(
        new Set(
            projects.flatMap((project) => {
                const images: string[] = [];

                if (project.image) {
                    images.push(project.image);
                }

                if (project.images && project.images.length > 0) {
                    images.push(...project.images);
                }

                return images;
            })
        )
    ).map(toAbsoluteUrl);

    return [
        {
            url: siteUrl,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1,
        },
        {
            url: `${siteUrl}/about`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
            images: [toAbsoluteUrl("/about/main.png")],
        },
        {
            url: `${siteUrl}/projects`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
            images: projectImages,
        },
    ];
}
