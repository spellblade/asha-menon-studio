import { useState } from "react";
import { FileDown, Menu, X } from "lucide-react";
import { downloadCvPdf } from "@/lib/export-cv";
import type { Profile } from "@/lib/profile";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const NAV = [
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#skills", label: "Tools" },
  { href: "/#cv", label: "CV" },
  { href: "/#contact", label: "Contact" },
];

export function SiteHeader({ profile }: { profile: Profile }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="no-print sticky top-0 z-40 border-b border-line/80 bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <a
          href="/#top"
          className="font-display text-lg tracking-tight text-ink sm:text-xl"
        >
          {profile.name}
        </a>

        <nav className="hidden items-center gap-7 text-[0.8125rem] tracking-wide text-muted md:flex">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-ink">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="hidden sm:inline-flex"
            onClick={() => downloadCvPdf(profile)}
          >
            <FileDown className="size-3.5" />
            Export PDF
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      <div
        className={cn(
          "border-t border-line bg-paper md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav className="mx-auto flex max-w-6xl flex-col px-5 py-3">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex min-h-11 items-center text-sm text-ink"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <button
            type="button"
            className="flex min-h-11 items-center gap-2 text-left text-sm text-ink"
            onClick={() => {
              downloadCvPdf(profile);
              setOpen(false);
            }}
          >
            <FileDown className="size-4" />
            Export PDF
          </button>
        </nav>
      </div>
    </header>
  );
}
