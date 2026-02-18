import Featured from "@/components/landing/Featured";
import Hero from "@/components/landing/Hero";
import SkillsPreview from "@/components/landing/SkillsPreview";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">

      <Hero />
      <Featured />
      <SkillsPreview />
    </main>
  );
}
