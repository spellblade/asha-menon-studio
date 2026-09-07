import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { studioMiddleware, studioTokenMiddleware } from "@/lib/studio-middleware";

const keySchema = z
  .string()
  .trim()
  .min(8, "Use at least 8 characters.")
  .max(200);

export const studioStatus = createServerFn({ method: "GET" })
  .middleware([studioTokenMiddleware])
  .handler(async ({ context }) => {
    const { sessionIsValid, studioIsClaimed } = await import("./studio-lock.server");
    const [unlocked, claimed] = await Promise.all([
      sessionIsValid(context.studioToken),
      studioIsClaimed(),
    ]);
    return { unlocked, claimed };
  });

export const claimStudio = createServerFn({ method: "POST" })
  .validator((input: unknown) =>
    z
      .object({
        key: keySchema,
        confirm: keySchema,
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const { assertSameSiteRequest } = await import("./auth/isolation.server");
    const {
      studioIsClaimed,
      claimStudioPassphrase,
      issueStudioSession,
      StudioLockedError,
    } = await import("./studio-lock.server");
    assertSameSiteRequest();
    if (data.key !== data.confirm) {
      throw new StudioLockedError("The two keys do not match.");
    }
    if (await studioIsClaimed()) {
      throw new StudioLockedError("Studio is already claimed.");
    }
    await claimStudioPassphrase(data.key);
    const token = await issueStudioSession();
    return { token };
  });

export const unlockStudio = createServerFn({ method: "POST" })
  .validator((input: unknown) => z.object({ key: keySchema }).parse(input))
  .handler(async ({ data }) => {
    const { assertSameSiteRequest } = await import("./auth/isolation.server");
    const {
      passphraseMatches,
      issueStudioSession,
      StudioLockedError,
    } = await import("./studio-lock.server");
    assertSameSiteRequest();
    const ok = await passphraseMatches(data.key);
    if (!ok) throw new StudioLockedError("That key does not match.");
    const token = await issueStudioSession();
    return { token };
  });

export const lockStudio = createServerFn({ method: "POST" })
  .middleware([studioTokenMiddleware])
  .handler(async ({ context }) => {
    const { revokeStudioSession } = await import("./studio-lock.server");
    await revokeStudioSession(context.studioToken);
    return { ok: true as const };
  });

export const changeStudioKey = createServerFn({ method: "POST" })
  .middleware([studioMiddleware])
  .validator((input: unknown) =>
    z
      .object({
        currentKey: keySchema,
        nextKey: keySchema,
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const {
      passphraseMatches,
      rotatePassphrase,
      issueStudioSession,
      StudioLockedError,
    } = await import("./studio-lock.server");
    if (data.currentKey === data.nextKey) {
      throw new StudioLockedError("Pick a different key.");
    }
    const ok = await passphraseMatches(data.currentKey);
    if (!ok) throw new StudioLockedError("Current key is wrong.");
    await rotatePassphrase(data.nextKey);
    const token = await issueStudioSession();
    return { token };
  });
