import { defineStore } from 'pinia'
import { useNoteEventsBusStore } from './note-event-bus'
import NOTE_FREQUENCIES from '~/models/notes-frequencies'

interface NotePlayedContext {
  oscillator: OscillatorNode
  audio: AudioContext
}

export const useAudioBusStore = defineStore('audio-bus', () => {
  const audioContextsByNote = ref(new Map<string, NotePlayedContext >())

  const { onNotePressed, onNoteReleased } = useNoteEventsBusStore().bus

  function registerHandlers() {
    onNotePressed((event) => {
      // eslint-disable-next-line no-console
      console.log(event.note)
      createAudioContext(event.note).oscillator.start()
    })

    onNoteReleased((event) => {
      stopAndRemoveContext(event.note)
    })
  }

  function createAudioContext(note: string) {
    // eslint-disable-next-line no-console
    console.log(`create audio context for note: ${note}`)
    const audioCtx = new (window.AudioContext)()
    const now = audioCtx.currentTime

    // create Oscillator node
    const oscillator = audioCtx.createOscillator()
    const gainNode = audioCtx.createGain()
    gainNode.gain.value = 1
    gainNode.gain.linearRampToValueAtTime(0, now + 3)
    oscillator.connect(gainNode)

    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(NOTE_FREQUENCIES[note], audioCtx.currentTime) // value in hertz
    oscillator.connect(audioCtx.destination)
    audioContextsByNote.value.set(note, { oscillator, audio: audioCtx })

    return {
      oscillator, audioCtx,
    }
  }

  function stopAndRemoveContext(note: string) {
    const notePlayedContext = audioContextsByNote.value.get(note)

    if (notePlayedContext) {
      if (notePlayedContext?.audio.state === 'suspended')
        notePlayedContext.audio.resume()
      notePlayedContext.oscillator.stop()
      audioContextsByNote.value.delete(note)
    }
  }

  return {
    registerHandlers,
  }
})
