import { HeroSection } from "@/components/hero-section";
import { NavigationWrapper } from "@/components/navigation";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section id="home">
        <HeroSection />
      </section>

      <section
        id="skills"
        className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900"
      >
        <h2 className="text-3xl font-bold">Skills</h2>
      </section>

      <section
        id="projects"
        className="min-h-screen flex items-center justify-center"
      >
        <h2 className="text-3xl font-bold">Projects</h2>
      </section>

      <section
        id="about"
        className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900"
      >
        <h2 className="text-3xl font-bold">About Me</h2>
      </section>

      <section
        id="contact"
        className="min-h-screen flex items-center justify-center"
      >
        <h2 className="text-3xl font-bold">Contact</h2>
      </section>

      {/* Navigation Dock */}
      <NavigationWrapper />
    </main>
  );
}
