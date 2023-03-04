<script setup lang="ts">
import { useMidiStore } from '~/stores/midi'

type Note = 'C3' | 'C#3' | 'D3' | 'D#3' | 'E3' | 'F3' | 'F#3' | 'G3' | 'G#3' | 'A3' | 'A#3' | 'B3' | 'B#3' | 'C4'

const props = defineProps<{
  black?: boolean
  note: Note
}>()

const isPressed = ref(false)

const midiStore = useMidiStore()

midiStore.eventBus.notePressed.on((note) => {
  if (note === props.note) {
    // eslint-disable-next-line no-console
    console.log(`note ${note} pressed`)
    isPressed.value = true
  }
})

midiStore.eventBus.noteReleased.on((note) => {
  if (note === props.note) {
    // eslint-disable-next-line no-console
    console.log(`note ${note} released`)
    isPressed.value = false
  }
})

const classObject = computed(() => ({
  pressed: isPressed.value,
  black: props.black,
  white: !props.black,
}))
function keydown() {
  midiStore.eventBus.notePressed(props.note)
}
</script>

<template>
  <button
    class="key" :class="classObject"
    @mousedown.prevent="() => keydown()"
    @mouseup="() => midiStore.eventBus.noteReleased(props.note)"
  >
    {{ props.note }}
  </button>
</template>

<style scoped lang="postcss">
.key {
  @apply w-1/12 rounded-b-sm transition-colors duration-75
}
.black {
  @apply bg-black h-2/3 border-white border-1;
}

.white {
  @apply bg-white h-full border-black border-1;
}

.pressed {
  @apply bg-red-400
}
</style>
