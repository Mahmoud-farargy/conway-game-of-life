<template>
    <Transition name="slide">
        <div v-if="isLoading"
            class="fixed top-0 left-0 z-10 p-3 flex items-center justify-center w-full h-screen bg-gray-100 dark:bg-gray-900 select-none">
            <div class="font-['Press_Start_2P','system-ui'] mx-auto text-2xl md:text-3xl lg:text-4xl text-gray-900 dark:text-white text-center">
                <span class="primay-text-gradient">
                    {{ $t('game_title_pt1') }}
                </span>
                {{ $t('game_title_pt2') }}
            </div>
        </div>
    </Transition>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue";
const interventionDurationMS = 600;
let timeoutId: number;

const isLoading = ref(true);
onMounted(() => {
    timeoutId = setTimeout(() => {
        isLoading.value = false;
    }, interventionDurationMS);
})
onUnmounted(() => {
    clearTimeout(timeoutId);
});
</script>