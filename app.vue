<template>
    <div ref="client" :class="{ connected: hasConnectedWallet }">
        <div class="z-50 bottom-3 fixed -right-[350px] w-full md:w-auto md:min-w-[350px]">
            <transition-group name="list-complete">
                <div class="list-complete-item" v-for="notification in NM.notifications" :key="notification.id">
                    <AppNotification :width="client.clientWidth" :notification="notification" />
                </div>
            </transition-group>
        </div>

        <main id="appMain" class="w-screen h-screen flex items-center justify-center">
            <NuxtPage class="m-3" />
        </main>
    </div>

    <div class="absolute bottom-0 text-center px-4 px-0 right-6 py-3">
        <p class="text-xs text-gray-400">© All right reserved 2022</p>
    </div>
</template>

<script lang="ts" setup>
    import { NotificationManager } from '~/types/NotificationManager.types';
    import { computed, ref } from '#imports';
    import { useWallet } from 'solana-wallets-vue';

    const { publicKey } = useWallet();

    const client = ref(null);

    const NM = NotificationManager.getInstance();

    const hasConnectedWallet = computed(() => {
        return publicKey.value;
    });
</script>

<style scoped></style>
