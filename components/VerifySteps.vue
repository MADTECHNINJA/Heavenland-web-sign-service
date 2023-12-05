<template>
    <div>
        <p class="text-sm text-gray-400 tracking-tight mt-6 text-center">
            In order to verify for this service, please execute the following steps.
        </p>

        <ol class="relative mt-9 border-l border-gray-700 flex justify-center flex-col w-full max-w-sm mx-auto">
            <li class="mb-6 last:mb-0 ml-5">
                <div
                    class="absolute w-2 h-2 bg-gray-300 rounded-full mt-2 -left-1"
                    :class="[!isConnected ? 'bg-green-500' : 'bg-gray-300']"
                />

                <p
                    class="text-sm pt-1 leading-none font-semibold"
                    :class="[!isConnected ? 'text-green-500' : 'text-gray-300']"
                >
                    1. Connect your wallet
                </p>
                <div class="flex text-sm flex-col space-y-3 mt-3">
                    <div class="flex">
                        <ConnectButton />
                    </div>
                </div>
            </li>

            <li class="mb-6 last:mb-0 ml-5">
                <div
                    class="absolute w-2 h-2 rounded-full mt-2 -left-1"
                    :class="[isConnected ? 'bg-green-500' : 'bg-gray-300']"
                />

                <p
                    class="text-sm pt-1 leading-none font-semibold"
                    :class="[isConnected ? 'text-green-500' : 'text-gray-300']"
                >
                    2. {{ isHwWalletEnabled ? 'Sign transaction' : 'Sign message' }}
                </p>

                <p class="text-xs pt-1 leading-none leading-5 text-gray-400 mt-2">
                    {{
                        isHwWalletEnabled
                            ? 'Signed transaction is not sent to blockchain and only serves for ownership verification'
                            : 'Message signed by your wallet only serves for ownership verification'
                    }}
                </p>

                <div class="w-full max-w-[185px] bg-white bg-opacity-[5%] rounded-full mt-2">
                    <AppSwitch v-model="isHwWalletEnabled"> Are you using Ledger? </AppSwitch>
                </div>

                <div class="flex text-sm flex-col space-y-3 mt-5">
                    <div class="flex">
                        <AppButton @click="verify" :loading="verifyButtonLoading" :disabled="!isConnected">
                            Verify
                        </AppButton>
                    </div>
                </div>
            </li>
        </ol>
    </div>
</template>

<script lang="ts" setup>
    import { SignService } from '~/types/SignService.types';
    import { useAuth } from '~/composables/useAuth';
    import { ref } from '#imports';

    const props = defineProps<{
        service: SignService;
        serviceProcess: (isHwWalletEnabled: boolean) => void;
    }>();

    const { isConnected } = useAuth();
    const verifyButtonLoading = ref(false);
    const isHwWalletEnabled = ref(false);

    const verify = async () => {
        verifyButtonLoading.value = true;

        await props.serviceProcess(isHwWalletEnabled.value);

        verifyButtonLoading.value = false;
    };
</script>

<style scoped></style>
