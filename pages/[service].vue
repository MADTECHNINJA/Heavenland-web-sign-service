<template>
    <NuxtLayout name="service">
        <component v-if="serviceComponent" :is="serviceComponent" :service="service">
            <template #default="{ serviceProcess }">
                <VerifyError v-if="service.isVerificationError" :service="service" />
                <VerifySteps v-else-if="!service.isVerified" :service="service" :service-process="serviceProcess" />
            </template>
        </component>

        <ServiceUndefined v-else />
    </NuxtLayout>
</template>

<script lang="ts" setup>
    import { useService, useSign } from '~/composables/useSign';
    import { computed } from '#imports';
    import { ServicesDiscordBanner } from '#components';
    import ServiceUndefined from '~/components/ServiceUndefined.vue';

    const { serviceName } = useService();
    const { service } = useSign();

    const serviceComponent = computed(() => {
        switch (serviceName.value) {
            case 'discord':
                return ServicesDiscordBanner;

            default:
                return null;
        }
    });
</script>

<style scoped></style>
