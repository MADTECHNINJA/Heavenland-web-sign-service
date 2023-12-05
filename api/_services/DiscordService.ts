import axios from 'axios';

import { logger } from '@/plugins/logger.client';

import { Path, SubPath } from '@/api/resources';
import { DiscordRequestParams, DiscordRequestSchema } from '~/types/services/Discord.types';

class DiscordService {
    async createLink(params: DiscordRequestParams): Promise<unknown> {
        await logger.info('[API]', 'DiscordService', 'createLink', params);

        if (!params.solanaAccountPublicKey) {
            throw new Error('not defined: wallet');
        }

        DiscordRequestSchema.parse(params);

        const res = await axios.post(`${Path.DRM}/${SubPath.DRM.LINKS}`, params);

        return res.data;
    }
}

export default new DiscordService();
