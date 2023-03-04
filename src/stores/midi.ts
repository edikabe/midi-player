import { acceptHMRUpdate, defineStore } from 'pinia'
import type { Input } from 'webmidi'
import { WebMidi } from 'webmidi'
import { createEventBus, slot } from 'ts-event-bus'
import { useUserSettingsStore } from './user-settings'

export const useMidiStore = defineStore('midi', () => {
  const eventBus = createEventBus({
    events: {
      notePressed: slot<string>(),
      noteReleased: slot<string>(),
    },
  })

  const currentNotesPressed = ref<Set<string>>(new Set())
  const currentNotesPressedArray = computed(() => Array.from(currentNotesPressed.value))

  eventBus.notePressed.on((note) => {
    currentNotesPressed.value.add(note)
  })

  eventBus.noteReleased.on((note) => {
    currentNotesPressed.value.delete(note)
  })

  const isMidiEnabled = ref(false)
  const allInputMidiDevices = ref<Input[]>()
  const currentInputDevice = ref<Input>()

  const pitchbend = ref<number>(64)
  const modwheel = useLocalStorage('mls-modwheel-value', 0.1) // by default modwheel will be set at 10%

  async function enableMidi() {
    try {
      await WebMidi.enable()
      allInputMidiDevices.value = WebMidi.inputs

      const userSettingsStore = useUserSettingsStore()
      if (userSettingsStore.currentMidiInputDeviceId && userSettingsStore.currentMidiInputDeviceId.length)
        selectCurrentInputDevice(userSettingsStore.currentMidiInputDeviceId)

      isMidiEnabled.value = true
    }
    catch (e: any) {
      console.error(e)
      isMidiEnabled.value = false
    }
  }

  function selectCurrentInputDevice(inputDeviceId: string) {
    const input = WebMidi.getInputById(inputDeviceId)
    if (currentInputDevice.value)
      currentInputDevice.value.removeListener() // removes all listeners

    // set current input Midi device
    currentInputDevice.value = input
    useUserSettingsStore().setCurrentMidiInputDevice(currentInputDevice.value)

    // add listeners and bind them to store models
    currentInputDevice.value.addListener('pitchbend', (e) => {
      pitchbend.value = e.message.data[2]
    })
    currentInputDevice.value.addListener('controlchange', (e) => {
      if (e.type === 'controlchange' && e.subtype && e.subtype === 'modulationwheelcoarse')
        modwheel.value = (typeof e.value === 'number') ? e.value : 0
    })
    currentInputDevice.value.addListener('noteon', (e) => {
      eventBus.notePressed(e.note.identifier)
    })
    currentInputDevice.value.addListener('noteoff', (e) => {
      eventBus.noteReleased(e.note.identifier)
    })
  }

  function setPitchbendValue(val: number) {
    pitchbend.value = val
  }

  function setModwheelValue(val: number) {
    modwheel.value = val
  }

  return {
    allInputMidiDevices,
    currentInputDevice,
    selectCurrentInputDevice,
    setPitchbendValue,
    setModwheelValue,
    enableMidi,
    eventBus,
    pitchbend,
    modwheel,
    isMidiEnabled,
    currentNotesPressedArray,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useMidiStore, import.meta.hot))
