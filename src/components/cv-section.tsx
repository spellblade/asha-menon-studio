import { FileDown } from "lucide-react";
import { downloadCvPdf } from "@/lib/export-cv";
import type { Profile } from "@/lib/profile";
import { Button } from "@/components/ui/button";

export function CvSection({ profile }: { profile: Profile }) {
  const extras = profile.extras.filter(
    (extra) => extra.title.trim() && extra.items.some((item) => item.label.trim()),
  );

  return (
    <section id="cv" className="border-y border-line bg-paper-2/60">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <div className="mb-10 flex flex-col gap-4 border-b border-line pb-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.18em] text-muted">05 — Curriculum vitae</p>
            <h2 className="mt-2 font-display text-section font-medium tracking-tight">
              Work, in order
            </h2>
            {profile.availability ? (
              <p className="mt-2 max-w-xl text-sm text-muted">{profile.availability}</p>
            ) : null}
          </div>
          <Button type="button" variant="outline" onClick={() => downloadCvPdf(profile)}>
            <FileDown className="size-4" />
            Download PDF
          </Button>
        </div>

        <div className="grid gap-16 lg:grid-cols-12">
          <div className="space-y-12 lg:col-span-8">
            <div>
              <h3 className="text-[0.7rem] uppercase tracking-[0.18em] text-muted">
                Experience
              </h3>
              <ol className="relative mt-6 border-l border-line pl-6 sm:border-l-0 sm:pl-0">
                {profile.experience.map((job) => (
                  <li
                    key={job.id}
                    className="relative grid gap-3 py-7 first:pt-0 last:pb-0 sm:grid-cols-[8.5rem_1fr]"
                  >
                    <span className="absolute -left-[1.54rem] top-8 size-2 rounded-full bg-accent sm:hidden" />
                    <p className="text-sm text-muted tabular-nums sm:pt-1">{job.period}</p>
                    <div className="sm:border-l sm:border-line sm:pl-8">
                      <p className="font-display text-xl tracking-tight">
                        {job.role}
                        <span className="text-muted">, {job.company}</span>
                      </p>
                      {job.location ? (
                        <p className="mt-1 text-sm text-faint">{job.location}</p>
                      ) : null}
                      {job.summary ? (
                        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                          {job.summary}
                        </p>
                      ) : null}
                      {job.highlights.filter(Boolean).length ? (
                        <ul className="mt-3 space-y-1.5 text-sm text-muted">
                          {job.highlights.filter(Boolean).map((item) => (
                            <li key={item}>— {item}</li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h3 className="text-[0.7rem] uppercase tracking-[0.18em] text-muted">
                Education
              </h3>
              <ol className="mt-6 divide-y divide-line">
                {profile.education.map((edu) => (
                  <li key={edu.id} className="grid gap-3 py-6 first:pt-0 sm:grid-cols-[8.5rem_1fr]">
                    <p className="text-sm text-muted tabular-nums">{edu.period}</p>
                    <div>
                      <p className="font-display text-xl tracking-tight">{edu.degree}</p>
                      <p className="mt-1 text-sm text-muted">{edu.school}</p>
                      {edu.detail ? (
                        <p className="mt-2 text-sm text-ink-soft">{edu.detail}</p>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <aside className="space-y-10 lg:col-span-4">
            {profile.skills.length ? (
              <div>
                <h3 className="text-[0.7rem] uppercase tracking-[0.18em] text-muted">
                  Tools
                </h3>
                <ul className="mt-4 space-y-5">
                  {profile.skills.map((group) => (
                    <li key={group.group}>
                      <p className="text-sm font-medium">{group.group}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted">
                        {group.items.filter(Boolean).join(" · ")}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {extras.map((extra) => (
              <div key={extra.id}>
                <h3 className="text-[0.7rem] uppercase tracking-[0.18em] text-muted">
                  {extra.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {extra.items
                    .filter((item) => item.label.trim())
                    .map((item) => (
                      <li
                        key={`${item.label}-${item.meta}`}
                        className="flex items-baseline justify-between gap-4 border-b border-line pb-3 text-sm"
                      >
                        <span>{item.label}</span>
                        <span className="shrink-0 text-muted">{item.meta}</span>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </aside>
        </div>
      </div>
    </section>
  );
}
