<template>
    <AppModal v-bind="props">
        <div class="space-y-4 text-start p-4 md:p-5 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            <p>{{ $t('game_description_text') }} </p>
            <strong class="mb-2">{{ $t('rules') }}</strong>
            <ul class="list-disc list-inside space-y-1">
                <li>{{ $t('game_rule_1') }}</li>
                <li>{{ $t('game_rule_2') }}</li>
                <li>{{ $t('game_rule_3') }}</li>
            </ul>
            <p>
                {{ $t("wiki_link_label") }}
                <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life" target="_blank"
                    class="text-primary hover:underline font-medium">
                    {{ $t("wikipedia") }}
                </a>.
            </p>

            <div class="flex justify-center w-full">
                <button @click="changeState(false)" type="button" :aria-label="$t('ok')"
                    class="text-dark bg-primary text-white hover:brightness-95 transition-[filter] duration-150 font-medium rounded-lg text-sm px-5 py-2 text-center cursor-pointer">
                    {{ $t("ok") }}
                </button>
            </div>
        </div>
    </AppModal>
</template>

<script lang="ts" setup>
import { AppModal } from "@/components";

interface InstructionsModalProps {
    isOpen: boolean
    changeState: (e: boolean) => void
    modalTitle: string
}
const props = defineProps<InstructionsModalProps>();
</script>
