<template>
    <div class="flex items-center mt-3 mb-6 text-inherit">
        <div v-if="placeInMiddle" class="flex-grow border-t border-gray-300 dark:border-gray-800" />
        <span :class="`${ placeInMiddle ? 'mx-4' : 'me-4'}  text-gray-700 dark:text-white font-semibold`.trim()">{{ title }}</span>
        <div class="flex-grow border-t border-gray-300 dark:border-gray-800" />
    </div>
</template>

<script lang="ts" setup>
// Interfaces
interface FormDividerProps {
    title: string
    placeInMiddle?: boolean
}
const { title, placeInMiddle } = defineProps<FormDividerProps>();
</script>