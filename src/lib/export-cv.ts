import { jsPDF } from "jspdf";
import type { Profile } from "@/lib/profile";

function filenameFromName(name: string) {
  const slug = name
    .trim()
    .replace(/[^\w]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${slug || "CV"}.pdf`;
}

export function downloadCvPdf(profile: Profile) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageW = 210;
  const pageH = 297;
  const margin = 18;
  const maxW = pageW - margin * 2;
  let y = 20;

  const ink: [number, number, number] = [28, 25, 21];
  const muted: [number, number, number] = [107, 100, 91];
  const line: [number, number, number] = [196, 188, 174];

  const ensure = (need: number) => {
    if (y + need > pageH - 16) {
      doc.addPage();
      y = 18;
    }
  };

  const rule = () => {
    ensure(6);
    doc.setDrawColor(...line);
    doc.setLineWidth(0.2);
    doc.line(margin, y, pageW - margin, y);
    y += 6;
  };

  const heading = (text: string) => {
    ensure(12);
    y += 3;
    doc.setFont("times", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...ink);
    doc.text(text.toUpperCase(), margin, y);
    y += 2;
    rule();
  };

  const body = (text: string, size = 10, style: "normal" | "italic" = "normal") => {
    const lines = doc.splitTextToSize(text, maxW) as string[];
    doc.setFont("times", style);
    doc.setFontSize(size);
    doc.setTextColor(...ink);
    for (const lineText of lines) {
      ensure(6);
      doc.text(lineText, margin, y);
      y += 5;
    }
  };

  const mutedLine = (text: string) => {
    doc.setFont("times", "italic");
    doc.setFontSize(9.5);
    doc.setTextColor(...muted);
    const lines = doc.splitTextToSize(text, maxW) as string[];
    for (const lineText of lines) {
      ensure(5.5);
      doc.text(lineText, margin, y);
      y += 5;
    }
  };

  doc.setFont("times", "bold");
  doc.setFontSize(22);
  doc.setTextColor(...ink);
  doc.text(profile.name, margin, y);
  y += 8;

  doc.setFont("times", "italic");
  doc.setFontSize(11);
  doc.text(profile.role, margin, y);
  y += 6;

  const contactBits = [
    profile.location,
    profile.email,
    profile.phone,
    profile.website,
  ].filter(Boolean);
  mutedLine(contactBits.join("  ·  "));
  if (profile.availability) {
    mutedLine(profile.availability);
  }

  y += 2;
  rule();

  if (profile.tagline) {
    body(profile.tagline, 12, "italic");
    y += 2;
  }

  if (profile.bio) {
    heading("Profile");
    for (const para of profile.bio.split(/\n+/).filter(Boolean)) {
      body(para, 10);
      y += 2;
    }
  }

  if (profile.experience.length) {
    heading("Experience");
    for (const job of profile.experience) {
      ensure(18);
      doc.setFont("times", "bold");
      doc.setFontSize(11);
      doc.setTextColor(...ink);
      doc.text(job.role, margin, y);
      doc.setFont("times", "italic");
      doc.setFontSize(10);
      doc.text(job.period, pageW - margin, y, { align: "right" });
      y += 5;
      mutedLine([job.company, job.location].filter(Boolean).join("  ·  "));
      if (job.summary) {
        body(job.summary, 10);
      }
      for (const item of job.highlights.filter(Boolean)) {
        const bullet = doc.splitTextToSize(`•  ${item}`, maxW) as string[];
        doc.setFont("times", "normal");
        doc.setFontSize(10);
        doc.setTextColor(...ink);
        for (const lineText of bullet) {
          ensure(5.5);
          doc.text(lineText, margin, y);
          y += 5;
        }
      }
      y += 3;
    }
  }

  if (profile.education.length) {
    heading("Education");
    for (const edu of profile.education) {
      ensure(14);
      doc.setFont("times", "bold");
      doc.setFontSize(11);
      doc.setTextColor(...ink);
      doc.text(edu.degree, margin, y);
      doc.setFont("times", "italic");
      doc.setFontSize(10);
      doc.text(edu.period, pageW - margin, y, { align: "right" });
      y += 5;
      mutedLine(edu.school);
      if (edu.detail) body(edu.detail, 10);
      y += 2;
    }
  }

  if (profile.skills.length) {
    heading("Skills");
    for (const group of profile.skills) {
      ensure(10);
      doc.setFont("times", "bold");
      doc.setFontSize(10.5);
      doc.setTextColor(...ink);
      doc.text(group.group, margin, y);
      y += 5;
      body(group.items.filter(Boolean).join("  ·  "), 10);
      y += 2;
    }
  }

  if (profile.projects.length) {
    heading("Selected work");
    for (const project of profile.projects) {
      ensure(12);
      doc.setFont("times", "bold");
      doc.setFontSize(11);
      doc.setTextColor(...ink);
      doc.text(project.title, margin, y);
      doc.setFont("times", "italic");
      doc.setFontSize(10);
      const meta = [project.category, project.year].filter(Boolean).join("  ·  ");
      doc.text(meta, pageW - margin, y, { align: "right" });
      y += 5;
      body(project.description || project.summary, 10);
      if (project.problem) {
        mutedLine(`Problem — ${project.problem}`);
      }
      if (project.result) {
        mutedLine(`Result — ${project.result}`);
      }
      const stack = project.stack.filter(Boolean);
      if (stack.length) {
        mutedLine(stack.join("  ·  "));
      }
      y += 2;
    }
  }

  for (const extra of profile.extras) {
    if (!extra.title && !extra.items.length) continue;
    heading(extra.title || "Notes");
    for (const item of extra.items) {
      ensure(7);
      doc.setFont("times", "normal");
      doc.setFontSize(10);
      doc.setTextColor(...ink);
      doc.text(item.label, margin, y);
      doc.setFont("times", "italic");
      doc.setTextColor(...muted);
      if (item.meta) {
        doc.text(item.meta, pageW - margin, y, { align: "right" });
      }
      y += 5.5;
    }
    y += 1;
  }

  doc.save(filenameFromName(profile.name));
}
