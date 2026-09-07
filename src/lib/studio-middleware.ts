import { createMiddleware } from "@tanstack/react-start";

export const studioTokenMiddleware = createMiddleware({ type: "function" })
  .client(async ({ next }) => {
    const { getStudioToken } = await import("./studio-session");
    return next({ sendContext: { studioToken: getStudioToken() ?? undefined } });
  })
  .server(async ({ next, context }) => {
    return next({ context: { studioToken: context.studioToken as string | undefined } });
  });

export const studioMiddleware = createMiddleware({ type: "function" })
  .client(async ({ next }) => {
    const { getStudioToken } = await import("./studio-session");
    return next({ sendContext: { studioToken: getStudioToken() ?? undefined } });
  })
  .server(async ({ next, context }) => {
    const { assertSameSiteRequest } = await import("./auth/isolation.server");
    const { requireStudioSession } = await import("./studio-lock.server");
    assertSameSiteRequest();
    await requireStudioSession(context.studioToken);
    return next({ context: { studio: true as const } });
  });
