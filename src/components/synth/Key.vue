<script setup lang="ts">
import type { NotePressedEvent, NoteReleasedEvent } from '~/stores/note-event-bus'
import { useNoteEventsBusStore } from '~/stores/note-event-bus'

type Note = 'C3' | 'C#3' | 'D3' | 'D#3' | 'E3' | 'F3' | 'F#3' | 'G3' | 'G#3' | 'A3' | 'A#3' | 'B3' | 'B#3' | 'C4'

const props = defineProps<{
  black?: boolean
  note: Note
}>()

const isPressed = ref(false)

const { fireNotePressed, fireNoteReleased, onNotePressed, onNoteReleased } = useNoteEventsBusStore().bus

const classObject = computed(() => ({
  pressed: isPressed.value,
  black: props.black,
  white: !props.black,
}))

const removeOnNotePressedListener = ref<Function>()
const removeOnNoteReleasedListener = ref<Function>()

onMounted(() => {
  // eslint-disable-next-line no-console
  console.log(props.note)
  removeOnNotePressedListener.value = onNotePressed((e: NotePressedEvent) => {
    if (e.note === props.note)
      isPressed.value = true
  })

  removeOnNoteReleasedListener.value = onNoteReleased((e: NoteReleasedEvent) => {
    if (e.note === props.note)
      isPressed.value = false
  })
})

onUnmounted(() => {
  removeOnNotePressedListener.value?.call(this)
  removeOnNoteReleasedListener.value?.call(this)
})
</script>

<template>
  <button
    class="key w-full rounded-b-md transition-colors duration-100 border-l-1 border-r-1 border-b-1" :class="classObject"
    @mousedown="() => fireNotePressed({ note: props.note })"
    @mouseup="() => fireNoteReleased({ note: props.note })"
    @mouseleave="() => fireNoteReleased({ note: props.note })"
    @touchstart="() => fireNotePressed({ note: props.note })"
    @touchend="() => fireNoteReleased({ note: props.note })"
    @touchcancel="() => fireNoteReleased({ note: props.note })"
  >
    <div class="bottom-0">
      {{ props.note }}
    </div>
  </button>
</template>

<style scoped lang="postcss">
.key {
  margin-right: 2px;
  @apply w-1/12 rounded-b-md transition-colors duration-100 border-l-1 border-r-1 border-b-1;
}

.key:last-child {
  margin-right: 0;
}

.white {
  @apply bg-white h-full border-black text-black;
}

.black {
  @apply bg-black h-full border-black text-white;
}

.pressed {
  @apply bg-gray-200
}

.black.pressed {
  @apply bg-gray-800
}
</style>
