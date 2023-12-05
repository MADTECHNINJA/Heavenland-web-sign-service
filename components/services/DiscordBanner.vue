<template>
    <div
        class="w-full bg-indigo-920 w-full py-3 max-w-xl flex flex-col items-center mt-6"
        :class="[
            service.isVerified
                ? 'bg-green-600 bg-opacity-40'
                : service.isVerificationError || !code
                ? 'bg-red-600 bg-opacity-20'
                : 'bg-indigo-920',
        ]"
    >
        <div class="px-12">
            <div class="flex justify-center w-full">
                <FontAwesomeIcon v-if="service.isVerified" icon="circle-check" class="text-green-500 h-7 w-7" />
                <FontAwesomeIcon
                    v-else-if="service.isVerificationError"
                    icon="times-circle"
                    class="text-red-500 h-7 w-7"
                />
                <FontAwesomeIcon v-else-if="!code" icon="link" class="text-red-500 h-7 w-7" />
                <img v-else :src="discordLogo" alt="Discord" class="h-8" />
            </div>

            <div v-if="!code" class="text-sm text-red-500 font-semibold mt-2 text-center">
                <p>Invalid request</p>
            </div>

            <p v-else-if="service.isVerified" class="text-sm text-green-500 font-semibold mt-2 text-center">
                You're verified for Discord service
            </p>

            <p v-else-if="service.isVerificationError" class="text-sm text-red-500 font-semibold mt-2 text-center">
                Verification error
            </p>

            <p v-else class="text-sm text-gray-300 mt-2 font-semibold text-center">
                You're verifying for Discord service
            </p>
        </div>
    </div>

    <div class="px-9">
        <p v-if="!code" class="text-sm text-center leading-6 text-gray-400 font-normal mt-6">
            Your request is missing auth information.<br />
            Please try again.
        </p>

        <div v-else-if="service.isVerified" class="mt-6">
            <p class="text-sm text-gray-300 font-semibold mt-6 text-center">Next steps</p>

            <div class="flex justify-center">
                <ul class="list-disc text-sm text-gray-400 mt-3 leading-6 tracking-tight">
                    <li>Head back to Discord and check your verification result.</li>
                </ul>
            </div>
        </div>

        <slot v-if="code" v-bind="{ serviceProcess }" />
    </div>
</template>

<script lang="ts" setup>
    import discordLogo from 'assets/services/discord.svg';
    import { DiscordRequestParams } from '~/types/services/Discord.types';
    import { API } from '~/api';
    import { ref, useService } from '#imports';
    import { useWallet } from 'solana-wallets-vue';
    import useUrl from '~/composables/useUrl';
    import { SignService } from '~/types/SignService.types';
    import { computed } from 'vue';

    const props = defineProps<{
        service: SignService;
    }>();

    const verifyButtonLoading = ref(false);
    const { publicKey } = useWallet();
    const { getParam } = useUrl();

    const code = computed(() => {
        return getParam.value('code');
    });

    const { servicePurpose } = useService();

    const serviceProcess = async (isHwWalletEnabled: boolean) => {
        verifyButtonLoading.value = true;

        await props.service.sign(
            servicePurpose.value,
            async (signRequest, signature) => {
                const params: DiscordRequestParams = {
                    signatureAsJsonArray: signature,
                    signRequestId: signRequest.id,
                    solanaAccountPublicKey: publicKey.value?.toBase58(),
                    discordAuthCode: code.value,
                };

                await API.DiscordService.createLink(params);
            },
            {
                isHwWalletEnabled,
            }
        );

        verifyButtonLoading.value = false;
    };
</script>

<style scoped></style>
