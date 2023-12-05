import { z } from 'zod';

export const DiscordRequestSchema = z.object({
    signRequestId: z.string(),
    signatureAsJsonArray: z.string(),
    discordAuthCode: z.string().nullable(),
    solanaAccountPublicKey: z.string().optional(),
});

export type DiscordRequestParams = z.infer<typeof DiscordRequestSchema>;
