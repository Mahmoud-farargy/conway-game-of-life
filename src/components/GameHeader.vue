<template>
    <header class="relative flex items-center justify-center mb-5">
        <!-- Card Title -->
        <h1 class="text-xl sm:text-2xl md:text-3xl tracking-tight font-bold text-center flex-1">
            <span class="text-[var(--text-muted)]">
                {{ $t('game_title_pt1') }}
            </span>
            {{ $t('game_title_pt2') }}
        </h1>
        <!-- Options Dropdown -->
        <AppDropdownMenu class="md:absolute md:right-0" :isOpen="isDropdownOpen"
            :changeState="(newVal) => toggleModalState('optionsDropdown', newVal)" :optionsMenu="optionsMenu" />

        <!-- Settings Modal -->
        <SettingsModal :isOpen="isSettingsModalOpen"
            :changeState="(newVal) => toggleModalState('settingsModal', newVal)" :modalTitle="$t('game_settings')" />
        <!-- Instructions Modal -->
        <InstructionsModal :isOpen="isGameInstructionsModalOpen"
            :changeState="(newVal) => toggleModalState('instructionsModal', newVal)"
            :modalTitle="$t('game_instructions')" />
    </header>
</template>
<script lang="ts" setup>
import { computed, ref } from "vue";
import { AppDropdownMenu, CogIcon, QuizIcon, SettingsModal, InstructionsModal } from "@/components";
import { useI18n } from 'vue-i18n'
// refs
const isDropdownOpen = ref(false);
const isSettingsModalOpen = ref(false);
const isGameInstructionsModalOpen = ref(false);
// composables
const { t } = useI18n();

// Functions
const toggleModalState = (modalKey: string, newState: boolean) => {
    const getNewState = (oldState: boolean) => typeof newState === 'boolean' ? newState : !oldState;
    switch (modalKey) {
        case 'optionsDropdown':
            isDropdownOpen.value = getNewState(isDropdownOpen.value);
            break;
        case 'settingsModal':
            isSettingsModalOpen.value = getNewState(isSettingsModalOpen.value);
            break;
        case 'instructionsModal':
            isGameInstructionsModalOpen.value = getNewState(isGameInstructionsModalOpen.value);
            break;
        default: { };
    }
}
// Computed Properties
const optionsMenu = computed(() => [
    { title: t('settings'), callback: () => toggleModalState('settingsModal', true), icon: CogIcon },
    { title: t('game_rules'), callback: () => toggleModalState('instructionsModal', true), icon: QuizIcon }
]);

</script>
