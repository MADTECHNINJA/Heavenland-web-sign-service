<template>
    <button
        type="button"
        @click.prevent="onClick"
        class="transition text-indigo-300 min-h-[36px] hover:brightness-125 inline-flex disabled:opacity-60 disabled:brightness-100 tracking-tight items-center justify-center py-2 text-sm font-medium rounded-md focus:outline-none"
        :disabled="loading"
    >
        <template v-if="!loading">
            <slot v-if="$slots.before" name="before" />

            <slot />

            <FontAwesomeIcon v-if="!$slots.before" icon="chevron-right" class="ml-1" />
        </template>

        <AppSpinner v-else />
    </button>
</template>

<script lang="ts" setup>
    const emits = defineEmits<{
        (e: 'click', p: any): void;
    }>();

    const props = defineProps<{
        loading?: boolean;
    }>();

    const onClick = (p) => {
        if (!props.loading) {
            emits('click', p);
        }
    };
</script>

<style scoped></style>
