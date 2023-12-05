import { useWallet } from 'solana-wallets-vue';
import { computed } from 'vue';

export const useAuth = () => {
    const { publicKey } = useWallet();

    const isConnected = computed(() => {
        return publicKey.value !== null;
    });

    return {
        walletPk: publicKey,
        isConnected,
    };
};
