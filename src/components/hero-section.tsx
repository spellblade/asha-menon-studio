import { ArrowDown, FileDown } from "lucide-react";
import { downloadCvPdf } from "@/lib/export-cv";
import type { Profile } from "@/lib/profile";
import { Button } from "@/components/ui/button";

export function HeroSection({ profile }: { profile: Profile }) {
  return (
    <section id="top" className="mx-auto max-w-6xl px-5 pb-20 pt-10 sm:px-8 sm:pt-16">
      <div className="flex items-end justify-between gap-6 border-b border-line pb-4 text-[0.7rem] uppercase tracking-[0.18em] text-muted">
        <span>Portfolio / CV</span>
        <span className="tabular-nums">01 — 08</span>
      </div>

      <h1 className="mt-8 font-display text-display font-medium text-ink">{profile.name}</h1>

      <div className="mt-8 grid gap-10 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <p className="font-display text-lede italic text-ink-soft">{profile.tagline}</p>
          <p className="mt-5 max-w-xl text-muted">
            {profile.role}
            {profile.location ? ` · ${profile.location}` : ""}
          </p>
          {profile.availability ? (
            <p className="mt-2 text-sm text-faint">{profile.availability}</p>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-3 md:col-span-5 md:justify-end">
          <Button asChild>
            <a href="#work">
              View work
              <ArrowDown className="size-4" />
            </a>
          </Button>
          <Button type="button" variant="outline" onClick={() => downloadCvPdf(profile)}>
            <FileDown className="size-4" />
            Export CV
          </Button>
        </div>
      </div>
    </section>
  );
}
