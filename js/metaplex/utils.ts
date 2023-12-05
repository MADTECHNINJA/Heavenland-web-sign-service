import { useWallet } from 'solana-wallets-vue';
import { logger } from '~/plugins/logger.client';

export const signMessage = async (message: string) => {
    try {
        const { signMessage, publicKey } = useWallet();

        if (!publicKey.value) {
            new Error('not connected');
        }

        if (!signMessage) {
            new Error('not supported: message signing');
        }

        const encodedMessage = new TextEncoder().encode(message);

        const signature = await signMessage.value(encodedMessage);

        if (!signature) {
            new Error('not valid: signature');
        }

        return signature;
    } catch (e) {
        logger.error(e);
        throw e;
    }
};
