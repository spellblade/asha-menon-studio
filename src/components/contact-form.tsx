import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { submitContact } from "@/lib/profile-fns";
import type { Profile } from "@/lib/profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const schema = z.object({
  name: z.string().trim().min(1, "Please add your name."),
  email: z.string().trim().email("That email does not look right."),
  subject: z.string().trim(),
  message: z.string().trim().min(12, "A little more context helps."),
});

type FormValues = z.infer<typeof schema>;

export function ContactSection({ profile }: { profile: Profile }) {
  const [sent, setSent] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  async function onSubmit(values: FormValues) {
    try {
      await submitContact({ data: values });
      setSent(true);
      form.reset();
      toast.success("Message received. I’ll write back shortly.");
    } catch {
      toast.error("Could not send just now. Please email directly.");
    }
  }

  return (
    <section id="contact" className="no-print mx-auto max-w-6xl px-5 py-20 sm:px-8">
      <div className="mb-10 flex items-end justify-between border-b border-line pb-4">
        <h2 className="font-display text-section font-medium tracking-tight">Contact</h2>
        <span className="text-[0.7rem] uppercase tracking-[0.18em] text-muted">06</span>
      </div>

      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="font-display text-lede tracking-tight">
            A role, a contract, or a hello — I read everything.
          </p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
            For roles and contracts, include stack and timeline if you have them. I
            typically reply within a few days.
          </p>
          <dl className="mt-8 space-y-4 text-sm">
            <div>
              <dt className="text-[0.7rem] uppercase tracking-[0.16em] text-muted">Email</dt>
              <dd className="mt-1">
                <a href={`mailto:${profile.email}`} className="hover:underline">
                  {profile.email}
                </a>
              </dd>
            </div>
            {profile.phone ? (
              <div>
                <dt className="text-[0.7rem] uppercase tracking-[0.16em] text-muted">
                  Telephone
                </dt>
                <dd className="mt-1">{profile.phone}</dd>
              </div>
            ) : null}
            <div>
              <dt className="text-[0.7rem] uppercase tracking-[0.16em] text-muted">
                Studio
              </dt>
              <dd className="mt-1">{profile.location}</dd>
            </div>
          </dl>
        </div>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 rounded-xl border border-line bg-paper p-5 sm:p-7 lg:col-span-7"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Name" error={form.formState.errors.name?.message}>
              <Input autoComplete="name" {...form.register("name")} />
            </Field>
            <Field label="Email" error={form.formState.errors.email?.message}>
              <Input type="email" autoComplete="email" {...form.register("email")} />
            </Field>
          </div>
          <Field label="Subject">
            <Input {...form.register("subject")} placeholder="A project, a talk, a question" />
          </Field>
          <Field label="Message" error={form.formState.errors.message?.message}>
            <Textarea rows={6} {...form.register("message")} />
          </Field>
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs text-faint">
              {sent ? "Sent — thank you." : "No mailing lists. One conversation."}
            </p>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Sending…" : "Send message"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <Label>{label}</Label>
      {children}
      {error ? <p className="text-xs text-danger">{error}</p> : null}
    </label>
  );
}
