import { defineStore } from 'pinia'

export interface NotePressedEvent {
  note: string
}

export interface NoteReleasedEvent {
  note: string
}

type EventType = 'notePressed' | 'noteReleased'

export const useNoteEventsBusStore = defineStore('note-events-bus', () => {
  const listeners: Map<EventType, Function[]> = new Map()

  const currentNotesPressed = ref<Set<string>>(new Set())
  const currentNotesPressedArray = computed(() => Array.from(currentNotesPressed.value))

  function onNotePressed(cb: (event: NotePressedEvent) => void) {
    let functions = listeners.get('notePressed')
    if (!functions) {
      functions = []
      listeners.set('notePressed', [])
    }
    functions.push(cb)
    return () => {
      const index = functions?.indexOf(cb)
      if (index && index > -1)
        functions?.splice(index, 1)
    }
  }

  function fireNotePressed(event: NotePressedEvent) {
    currentNotesPressed.value.add(event.note)
    listeners.get('notePressed')?.forEach(cb => cb(event))
  }

  function onNoteReleased(cb: (event: NoteReleasedEvent) => void) {
    let functions = listeners.get('noteReleased')
    if (!functions) {
      functions = []
      listeners.set('noteReleased', [])
    }
    functions.push(cb)
    return () => {
      const index = functions?.indexOf(cb)
      if (index && index > -1)
        functions?.splice(index, 1)
    }
  }

  function fireNoteReleased(event: NoteReleasedEvent) {
    currentNotesPressed.value.delete(event.note)
    listeners.get('noteReleased')?.forEach(cb => cb(event))
  }

  return {

    currentNotesPressed,
    currentNotesPressedArray,
    bus: {
      onNotePressed,
      fireNotePressed,
      onNoteReleased,
      fireNoteReleased,
    },
  }
})
