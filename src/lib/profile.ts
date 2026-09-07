import { z } from "zod";

export const socialSchema = z.object({
  label: z.string(),
  href: z.string(),
});

export const skillGroupSchema = z.object({
  group: z.string(),
  items: z.array(z.string()),
});

export const experienceSchema = z.object({
  id: z.string(),
  company: z.string(),
  role: z.string(),
  period: z.string(),
  location: z.string(),
  summary: z.string(),
  highlights: z.array(z.string()),
});

export const educationSchema = z.object({
  id: z.string(),
  school: z.string(),
  degree: z.string(),
  period: z.string(),
  detail: z.string(),
});

export const projectSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.string(),
  year: z.string(),
  summary: z.string(),
  description: z.string(),
  href: z.string(),
  image: z.string(),
  problem: z.string().default(""),
  constraint: z.string().default(""),
  decision: z.string().default(""),
  result: z.string().default(""),
  stack: z.array(z.string()).default([]),
});

export const extraItemSchema = z.object({
  label: z.string(),
  meta: z.string(),
});

export const extraSectionSchema = z.object({
  id: z.string(),
  title: z.string(),
  items: z.array(extraItemSchema),
});

export const profileSchema = z.object({
  name: z.string(),
  role: z.string(),
  location: z.string(),
  email: z.string(),
  phone: z.string(),
  website: z.string(),
  availability: z.string(),
  tagline: z.string(),
  bio: z.string(),
  portrait: z.string(),
  socials: z.array(socialSchema),
  skills: z.array(skillGroupSchema),
  experience: z.array(experienceSchema),
  education: z.array(educationSchema),
  projects: z.array(projectSchema),
  extras: z.array(extraSectionSchema),
});

export type Profile = z.infer<typeof profileSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type Education = z.infer<typeof educationSchema>;
export type ExtraSection = z.infer<typeof extraSectionSchema>;

export const DEFAULT_PROFILE: Profile = {
  name: "Asha Menon",
  role: "Software Engineer",
  location: "London / Remote",
  email: "asha@ashamenon.studio",
  phone: "+44 20 7946 0128",
  website: "ashamenon.studio",
  availability: "Open to senior / staff roles, autumn 2026 · remote-first",
  tagline:
    "I build the unglamorous parts of products — APIs, data paths, and the systems that stay up.",
  bio: "I am a software engineer who likes boring reliability more than clever tricks. Most of my work sits in the middle of a product: services that other teams call, pipelines that have to be right, and interfaces that fail loudly instead of quietly.\n\nI spent three years as a staff engineer at Northline on the mapping platform, four years at Folio Press shipping the reader stack, and a stretch of independent contract work before that. I write TypeScript and Go daily, review a lot of other people’s code, and care about the cost of a change six months later.",
  portrait: "/images/portrait.jpg",
  socials: [
    { label: "Email", href: "mailto:asha@ashamenon.studio" },
    { label: "GitHub", href: "https://github.com" },
    { label: "LinkedIn", href: "https://www.linkedin.com" },
    { label: "Blog", href: "#work" },
  ],
  skills: [
    {
      group: "Languages",
      items: ["TypeScript", "Go", "Python", "SQL", "Rust (reading, small services)"],
    },
    {
      group: "Backend & systems",
      items: [
        "HTTP APIs & gRPC",
        "Postgres (schema, indexes, replication)",
        "Event pipelines & queues",
        "Distributed locking & idempotency",
        "Observability (traces, SLOs)",
      ],
    },
    {
      group: "Frontend",
      items: ["React & TypeScript", "Accessibility", "Performance budgets", "Design-token consumption"],
    },
    {
      group: "Cloud & delivery",
      items: ["AWS / GCP", "Kubernetes", "CI/CD & preview environments", "Load testing", "On-call"],
    },
    {
      group: "Practice",
      items: [
        "RFCs and design docs",
        "Code review",
        "Incident write-ups",
        "Mentoring",
        "Hiring loops",
      ],
    },
  ],
  experience: [
    {
      id: "exp-northline",
      company: "Northline",
      role: "Staff Software Engineer",
      period: "2022 — 2025",
      location: "London",
      summary:
        "Owned the mapping platform’s serving path: tiles, search, and the API the rest of the company ships on.",
      highlights: [
        "Cut p95 tile latency from 420ms to 110ms by splitting hot/cold caches and rewriting the clip pipeline in Go.",
        "Led the migration from a monolith read model to Postgres + Redis with zero-downtime dual-write.",
        "Set SLOs and an on-call rotation used by four product teams; MTTR dropped from hours to under 25 minutes.",
        "Mentored two mid-level engineers to senior; ran the backend hiring loop.",
      ],
    },
    {
      id: "exp-folio",
      company: "Folio Press",
      role: "Senior Software Engineer",
      period: "2018 — 2022",
      location: "London",
      summary:
        "Built the subscription reader and the content pipeline for an independent publisher.",
      highlights: [
        "Shipped a reader used by 120k monthly readers with offline sync and a 1.8s LCP on mid-range phones.",
        "Designed a typed content schema so editorial, print, and web shared one source of truth.",
        "Introduced preview deploys and contract tests; production incidents from schema drift stopped.",
      ],
    },
    {
      id: "exp-studio",
      company: "Independent",
      role: "Software Engineer",
      period: "2015 — 2018",
      location: "London & Kochi",
      summary:
        "Contract work for cultural and hospitality clients: booking APIs, catalogues, and small data tools.",
      highlights: [
        "Delivered eight production backends (Node/Postgres) with documented runbooks.",
        "Built a shared booking calendar that replaced three vendor tools for a six-house hospitality group.",
      ],
    },
  ],
  education: [
    {
      id: "edu-ucl-msc",
      school: "University College London",
      degree: "MSc Computer Science",
      period: "2013 — 2014",
      detail: "Distributed systems and databases. Distinction. Thesis on conflict-free replicated calendars.",
    },
    {
      id: "edu-ucl",
      school: "University College London",
      degree: "BSc Computer Science",
      period: "2010 — 2013",
      detail: "First-class honours. Compilers, networks, and HCI electives.",
    },
  ],
  projects: [
    {
      id: "northline-atlas",
      title: "Northline Atlas",
      category: "Platform",
      year: "2024",
      summary: "Tile and search serving path rebuilt around latency budgets, not features.",
      description:
        "Atlas is the mapping platform every Northline product calls. I led the rewrite of the serving path so cartographers could ship layers without waiting on a release train.",
      href: "",
      image: "/images/project-northline.jpg",
      problem:
        "A single monolith mixed rendering, search, and billing. p95 tile time sat at 420ms and a bad deploy took the whole product dark.",
      constraint:
        "Could not freeze the public HTTP API. Had to keep serving traffic during a three-month cutover, on a team of four.",
      decision:
        "Extracted a Go tile service with a hot Redis cache and a cold object-store fallback. Search moved behind gRPC with a versioned proto. Dual-wrote to the new Postgres read model until lag was under a second, then flipped reads.",
      result:
        "p95 110ms. Four product teams deployed independently. Zero-downtime cutover. The old monolith was deleted six weeks later.",
      stack: ["Go", "Postgres", "Redis", "gRPC", "Kubernetes", "OpenTelemetry"],
    },
    {
      id: "harbor-ledger",
      title: "Harbor Ledger",
      category: "Product",
      year: "2025",
      summary: "A private treasury ledger where every write is idempotent and auditable.",
      description:
        "Interface and service design for a private ledger. The hard part was not the UI — it was making sure two retries never became two transfers.",
      href: "",
      image: "/images/project-harbor.jpg",
      problem:
        "Finance ops were posting transfers in a spreadsheet, then reconciling against three banks. Duplicates and silent failures were normal.",
      constraint:
        "No downtime window. Had to ingest historical entries without rewriting the legal record. Two engineers, one quarter.",
      decision:
        "Append-only Postgres ledger with idempotency keys at the HTTP edge. Outbox pattern for bank adapters. Read models for the UI, never writes from the client.",
      result:
        "Reconciliation time fell from two days to under an hour. Zero duplicate postings in six months of production.",
      stack: ["TypeScript", "Postgres", "Temporal", "React", "AWS"],
    },
    {
      id: "meridian-os",
      title: "Meridian",
      category: "Platform",
      year: "2023",
      summary: "An internal developer platform: previews, secrets, and one way to ship.",
      description:
        "A small paved road for product teams: preview environments, secret injection, and a deploy contract they could not accidentally skip.",
      href: "",
      image: "/images/project-meridian.jpg",
      problem:
        "Each squad had a different CI, a different secret store, and a different idea of “done”. Review apps were folklore.",
      constraint:
        "Could not mandate a rewrite of existing services. Had to work with GitHub and the clusters we already paid for.",
      decision:
        "A thin control plane: one GitHub Action, one Helm chart, one secrets sidecar. Docs written as a book, not a wiki dump.",
      result:
        "Three orgs on the same path. Mean time from PR to preview: 4 minutes. Production config drift stopped showing up in incidents.",
      stack: ["Go", "GitHub Actions", "Kubernetes", "Helm", "Terraform"],
    },
    {
      id: "folio-press",
      title: "Folio Reader",
      category: "Product",
      year: "2021",
      summary: "Offline-first reading product on a typed content schema shared with print.",
      description:
        "The reader had to feel like a book and still sync. Editorial, print, and web needed one content model so a comma change did not fork three pipelines.",
      href: "",
      image: "/images/project-folio.jpg",
      problem:
        "Print and web used different CMS dumps. Offline reading was a zip of HTML. Sync conflicts were resolved by “whoever saved last”.",
      constraint:
        "Editorial would not move off their existing writing tools. Budget for one native app, not two.",
      decision:
        "A typed content graph in Postgres, CRDT-backed notes for annotations, and a web reader with a service worker cache sized to a commute.",
      result:
        "120k monthly readers. LCP 1.8s on mid-range Android. Print and web shipped from the same nightly export.",
      stack: ["TypeScript", "Postgres", "React", "Service Workers", "CRDTs"],
    },
    {
      id: "quiet-hours",
      title: "Quiet Hours",
      category: "Product",
      year: "2020",
      summary: "One booking calendar for six houses, replacing three vendor tools.",
      description:
        "A hospitality group needed a single source of truth for rooms, rates, and holds — without locking into another channel manager.",
      href: "",
      image: "/images/project-quiet.jpg",
      problem:
        "Six properties, three booking vendors, nightly spreadsheet merges. Overbooks happened on weekends.",
      constraint:
        "Front-desk staff would not learn a new UI during high season. Channel managers had to keep receiving iCal until we cut over.",
      decision:
        "A Postgres booking service with explicit holds and a compatibility iCal layer. The desk UI was a single calendar they already understood.",
      result:
        "Overbooks dropped to zero in the first season. Two vendor contracts cancelled. The same API later powered the public booking site.",
      stack: ["Node", "Postgres", "iCal", "React"],
    },
    {
      id: "field-notes",
      title: "Field Notes",
      category: "Open source",
      year: "2022",
      summary: "A long-form archive for RFCs, incident notes, and talks — engineered like a library.",
      description:
        "I wanted a place to publish design docs that still read well in ten years. Static, typed, searchable, no CMS login to lose.",
      href: "",
      image: "/images/project-field.jpg",
      problem:
        "Internal RFCs lived in Google Docs and died there. Public writing was a different toolchain entirely.",
      constraint:
        "No database in production. Had to render from git so diffs stayed the source of truth.",
      decision:
        "MDX in a git repo, a small TS compiler for cross-links and a search index built at compile time.",
      result:
        "Used internally as the RFC archive; a public subset is this site’s writing room. Search stays under 30ms on a static host.",
      stack: ["TypeScript", "MDX", "Vite", "Pagefind"],
    },
  ],
  extras: [
    {
      id: "languages",
      title: "Languages",
      items: [
        { label: "English", meta: "Fluent" },
        { label: "Malayalam", meta: "Fluent" },
        { label: "French", meta: "Professional" },
      ],
    },
    {
      id: "writing",
      title: "Writing & talks",
      items: [
        { label: "Idempotency keys as a product decision", meta: "2025" },
        { label: "Dual-writes without lying to yourself", meta: "2024" },
        { label: "Visiting lecturer, UCL distributed systems lab", meta: "2019 — 2021" },
      ],
    },
  ],
};

export function parseProfile(raw: unknown): Profile {
  const parsed = profileSchema.safeParse(raw);
  return parsed.success ? parsed.data : DEFAULT_PROFILE;
}

export function newId(prefix: string) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}-${crypto.randomUUID().slice(0, 8)}`;
  }
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

export function projectPath(id: string) {
  return `/work/${id}`;
}
