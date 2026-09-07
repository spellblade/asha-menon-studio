import { createFileRoute } from "@tanstack/react-router";
import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-form";
import { CvSection } from "@/components/cv-section";
import { HeroSection } from "@/components/hero-section";
import { ProjectGrid } from "@/components/project-grid";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SkillsSection } from "@/components/skills-section";
import { getProfile } from "@/lib/profile-fns";

export const Route = createFileRoute("/")({
  loader: () => getProfile(),
  component: Home,
});

function Home() {
  const profile = Route.useLoaderData();

  return (
    <div className="min-h-dvh">
      <SiteHeader profile={profile} />
      <main>
        <HeroSection profile={profile} />
        <ProjectGrid profile={profile} />
        <AboutSection profile={profile} />
        <SkillsSection profile={profile} />
        <CvSection profile={profile} />
        <ContactSection profile={profile} />
      </main>
      <SiteFooter profile={profile} />
    </div>
  );
}
