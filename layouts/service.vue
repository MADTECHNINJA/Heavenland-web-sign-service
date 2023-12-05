<template>
    <div class="flex items-center ease-out w-full">
        <div class="flex flex-col items-center w-full">
            <div
                class="bg-gradient-to-r w-full py-3 max-w-xl flex flex-col from-indigo-920 items-center to-indigo-940 rounded-xl mt-3"
            >
                <div class="w-full pt-3 pb-4">
                    <div class="flex justify-center mb-5">
                        <img class="h-[1.8rem]" :src="heavenland" alt="Heavenland" />
                    </div>

                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import heavenland from '@/assets/logo/heavensign.png';
</script>

<style scoped></style>
