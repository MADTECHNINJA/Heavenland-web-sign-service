import { Notification, Variant } from '~/types/Notification.types';
import { useWallet } from 'solana-wallets-vue';
import { NotificationManager } from '~/types/NotificationManager.types';
import { NotificationTitles } from '~/types/Notification.data';
import { API } from '~/api';
import { logger } from '~/plugins/logger.client';
import { signMessage } from '~/js/metaplex/utils';
import { isUserRejectedTx } from '~/js/errors';
import { SignRequest } from '~/types/Wov.types';
import * as web3 from '@solana/web3.js';
import { Solana } from '~/js/solana';

const MEMO_PROGRAM_ID = new web3.PublicKey('MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr');

export class SignService {
    isVerified = false;
    isVerificationError = false;

    clear() {
        this.isVerified = false;
        this.isVerificationError = false;
    }

    private buildAuthTx = (nonce: string) => {
        const tx = new web3.Transaction();

        tx.add(
            new web3.TransactionInstruction({
                programId: MEMO_PROGRAM_ID,
                keys: [],
                data: Buffer.from(nonce, 'utf8'),
            })
        );

        return tx;
    };

    async sign(
        servicePurpose: string,
        onSigned: (signRequest: SignRequest, signature: string) => void,
        options?: {
            isHwWalletEnabled: boolean;
        }
    ) {
        let notification: Notification;

        try {
            const { publicKey, signTransaction } = useWallet();

            if (!publicKey.value) {
                new Error('not defined: wallet.publicKey');
            }

            notification = NotificationManager.getInstance().create({
                title: NotificationTitles.WALLET_VERIFIED,
                message: 'Verifying your wallet...',
                variant: Variant.LOADING,
            });

            const signRequest = await API.WovService.getSignRequests(servicePurpose);

            logger.info('[VERIFY] servicePurposeRespond', signRequest);

            if (options?.isHwWalletEnabled) {
                const tx = this.buildAuthTx(signRequest.rawMessage);
                tx.feePayer = publicKey.value;
                tx.recentBlockhash = await Solana.getInstance().getLatestBlockhash();

                await signTransaction.value(tx);

                await onSigned(signRequest, '[' + Array.from(tx.serialize()) + ']');
            } else {
                const signature = await signMessage(signRequest.rawMessage);

                await onSigned(signRequest, '[' + Array.from(signature).toString() + ']');
            }

            this.isVerified = true;

            notification.setSuccess('Transaction verification successful');
        } catch (e) {
            logger.error(e);

            this.isVerificationError = true;

            if (isUserRejectedTx(e)) {
                notification.setError('User rejected the transaction');
            } else {
                notification.setError('Transaction execution failed');
            }
        }
    }
}
