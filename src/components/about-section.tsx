import type { Profile } from "@/lib/profile";

export function AboutSection({ profile }: { profile: Profile }) {
  const paragraphs = profile.bio.split(/\n+/).filter(Boolean);

  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
      <div className="mb-10 flex items-end justify-between border-b border-line pb-4">
        <h2 className="font-display text-section font-medium tracking-tight">About</h2>
        <span className="text-[0.7rem] uppercase tracking-[0.18em] text-muted">03</span>
      </div>

      <div className="grid items-start gap-10 lg:grid-cols-12">
        <figure className="lg:col-span-5">
          <div className="overflow-hidden rounded-xl bg-paper-2">
            <img
              src={profile.portrait}
              alt={`Portrait of ${profile.name}`}
              className="aspect-portrait w-full object-cover"
            />
          </div>
          <figcaption className="mt-3 text-sm text-muted">
            {profile.name}, {profile.role.toLowerCase()}.
          </figcaption>
        </figure>

        <div className="lg:col-span-7 lg:pt-4">
          <p className="text-[0.7rem] uppercase tracking-[0.18em] text-muted">Biography</p>
          <div className="mt-5 space-y-5 text-[1.05rem] leading-relaxed text-ink-soft">
            {paragraphs.map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
          </div>
          <dl className="mt-10 grid gap-6 sm:grid-cols-2">
            <div>
              <dt className="text-[0.7rem] uppercase tracking-[0.16em] text-muted">Based</dt>
              <dd className="mt-1 text-sm">{profile.location || "—"}</dd>
            </div>
            <div>
              <dt className="text-[0.7rem] uppercase tracking-[0.16em] text-muted">
                Availability
              </dt>
              <dd className="mt-1 text-sm">{profile.availability || "—"}</dd>
            </div>
            <div>
              <dt className="text-[0.7rem] uppercase tracking-[0.16em] text-muted">Email</dt>
              <dd className="mt-1 text-sm">
                <a href={`mailto:${profile.email}`} className="hover:underline">
                  {profile.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-[0.7rem] uppercase tracking-[0.16em] text-muted">Site</dt>
              <dd className="mt-1 text-sm">{profile.website || "—"}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
