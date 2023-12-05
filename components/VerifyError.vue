<template>
    <p class="text-sm text-gray-400 tracking-tight mt-6 text-center">An error occurred while verifying your wallet.</p>

    <p class="text-sm text-gray-400 tracking-tight mt-2 text-center">Please try again later.</p>

    <div class="flex justify-center mt-6">
        <AppSecondaryButton @click="service.clear()">
            <template #before>
                <FontAwesomeIcon icon="left-long" class="mr-1.5" />
            </template>

            Back
        </AppSecondaryButton>
    </div>
</template>

<script lang="ts" setup>
    import { SignService } from '~/types/SignService.types';

    defineProps<{
        service: SignService;
    }>();
</script>

<style scoped></style>
