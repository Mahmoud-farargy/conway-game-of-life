<template>
    <div ref="dropdownRef" class="inline-block">
        <button type="button" @click="toggleState"
            class="flex items-center cursor-pointer space-x-2 p-2 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700">
            <VerticalDotsIcon class="text-gray-400 dark:text-gray-300 w-5 md:w-[1.3rem]" />
        </button>

        <!-- Dropdown Menu -->
        <Transition name="slide">
            <div v-if="isOpen"
                class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg z-10">
                <ul class="py-2">
                    <li v-for="(optionItem, index) in optionsMenu" :key="index"
                        @click="() => handleItemClick(optionItem, index)"
                        class="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 w-full text-left cursor-pointer">
                        <button type="button" :aria-label="optionItem.title"
                            class="flex items-center gap-1 cursor-pointer w-full text-start">
                            <component :is="optionItem.icon"
                                class="w-4 h-4 md:w-5 md:h-5 text-gray-500 dark:text-gray-400" />
                            <span>{{ optionItem.title }}</span>
                        </button>
                    </li>
                </ul>
            </div>
        </Transition>
    </div>

</template>

<script lang="ts" setup>
import { ref, toRefs } from "vue";
import { useClickOutside } from "@/composables";
import { VerticalDotsIcon } from "@/components";
import type { Component } from "vue";

// Interfaces
interface Option {
    title: string
    callback: (e: number) => void
    icon: Component
}

interface AppDropdownMenu {
    changeState: (e: boolean) => void
    isOpen: boolean
    optionsMenu: Option[],
}
// Props
const props = defineProps<AppDropdownMenu>();
const { isOpen, changeState, optionsMenu } = toRefs(props);
// emits - in case if it will be used more widely later
const emits = defineEmits(['click:menuClose', 'click:outside', 'click:item']);
// Refs
const dropdownRef = ref<HTMLElement | null>(null);

// Composables
useClickOutside(dropdownRef, () => {
    emits('click:outside');
    changeState.value(false);
}, isOpen)

// Functions
const toggleState = () => {
    changeState.value(!isOpen.value);
    emits('click:menuClose');
}
const handleItemClick = (optionItem: Option, index: number) => {
    optionItem?.callback(index);
    toggleState();
    emits('click:item', optionItem);
}
</script>
