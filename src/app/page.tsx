import type { Metadata } from "next";
import Featured from "@/components/landing/Featured";
import Hero from "@/components/landing/Hero";
import SkillsPreview from "@/components/landing/SkillsPreview";
import ContactSection from "@/components/landing/ContactSection";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">

      <Hero />
      <Featured />
      <SkillsPreview />
      <ContactSection />
    </main>
  );
}
