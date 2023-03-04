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
  if (note === props.note)
    isPressed.value = true
})

midiStore.eventBus.noteReleased.on((note) => {
  if (note === props.note)
    isPressed.value = false
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
    class="key flex justify-center content-end" :class="classObject"
    @mousedown.prevent="() => keydown()"
    @mouseup="() => midiStore.eventBus.noteReleased(props.note)"
  >
    <div class="bottom-0">
      {{ props.note }}
    </div>
  </button>
</template>

<style scoped lang="postcss">
.key {
  @apply w-1/12 rounded-b-sm transition-colors duration-100
}
.black {
  @apply bg-black h-full border-white border-1 text-white;
}

.white {
  @apply bg-white h-full border-black border-1 text-black;
}

.pressed {
  @apply bg-red-400
}
</style>
