import type { Profile } from "@/lib/profile";

export function SkillsSection({ profile }: { profile: Profile }) {
  if (!profile.skills.length) return null;

  return (
    <section id="skills" className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
      <div className="mb-10 flex items-end justify-between border-b border-line pb-4">
        <div>
          <h2 className="font-display text-section font-medium tracking-tight">Tools</h2>
          <p className="mt-2 text-sm text-muted">Grouped by how they actually get used.</p>
        </div>
        <span className="text-[0.7rem] uppercase tracking-[0.18em] text-muted">04</span>
      </div>
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {profile.skills.map((group) => (
          <div key={group.group}>
            <h3 className="font-display text-xl tracking-tight">{group.group}</h3>
            <ul className="mt-4 space-y-2 border-t border-line pt-4 text-sm text-ink-soft">
              {group.items.filter(Boolean).map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
