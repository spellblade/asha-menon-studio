import { createFileRoute } from "@tanstack/react-router";
import { CaseStudyMissing, CaseStudyPage } from "@/components/case-study";
import { getProfile } from "@/lib/profile-fns";

export const Route = createFileRoute("/work/$projectId")({
  loader: async ({ params }) => {
    const profile = await getProfile();
    const project = profile.projects.find((item) => item.id === params.projectId) ?? null;
    return { profile, project };
  },
  component: CaseStudyRoute,
});

function CaseStudyRoute() {
  const { profile, project } = Route.useLoaderData();
  if (!project) return <CaseStudyMissing profile={profile} />;
  return <CaseStudyPage profile={profile} project={project} />;
}
