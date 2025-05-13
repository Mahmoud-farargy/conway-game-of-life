<template>
    <Transition name="slide">
        <!-- Main modal -->
        <div to="body" @click="onClose" id="authentication-modal" v-if="!!isOpen" tabindex="-1" :aria-modal="true"
            :aria-hidden="!isOpen"
            class="overflow-y-auto overflow-x-hidden bg-gray-900/50 dark:bg-gray-900/80 fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-lvh min:h-[100vh] max-h-full flex">
            <!-- Modal content -->
            <div id="modalContent" class="relative p-4 w-full max-w-xl max-h-full">
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <!-- Modal header -->
                    <div class="flex items-center justify-between p-4 md:p-3 rounded-t">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                            {{ modalTitle }}
                        </h3>
                        <button type="button" @click="() => changeState(false)"
                            class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                            data-modal-hide="authentication-modal">
                            <CloseIcon />
                            <span class="sr-only"> {{$t('close_modal')}} </span>
                        </button>
                    </div>
                    <!-- Modal body -->
                    <div class="overflow-x-hidden overflow-y-auto">
                        <slot />
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script lang="ts" setup>
import { CloseIcon } from "@/components";
import { watch } from "vue";
// interfaces
interface AppMenuProps {
    changeState: (e: boolean) => void
    isOpen: boolean
    modalTitle: string
}
// props
const props = defineProps<AppMenuProps>();
// functions
const onClose = (event: MouseEvent) => {
    const modalElement = document.getElementById("modalContent");
    if (!modalElement?.contains(event.target as Node)) {
        props.changeState?.(false);
    }
}
// watch
watch(() => props.isOpen, (val) => {
    if (typeof val === 'boolean') {
        if (val) {
            document.body.style.overflowY = "hidden";
        } else {
            document.body.style.overflowY = "visible";
        }
    }
})
</script>
