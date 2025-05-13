import { onBeforeUnmount, watch } from 'vue'
import type { Ref } from 'vue'

export function useClickOutside(
  targetElement: Ref<HTMLElement | null>,
  callback: () => void,
  isActive: Ref<boolean>,
) {
  function handleClick(event: MouseEvent) {
    if (targetElement.value && !targetElement.value.contains(event.target as Node)) {
      callback();
    }
  }
  watch(isActive, (val) => {
    if (val) {
      document.addEventListener('click', handleClick);
    } else {
      document.removeEventListener('click', handleClick);
    }
  })

  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClick);
  })
}
