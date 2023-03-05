import { acceptHMRUpdate, defineStore } from 'pinia'
import type { Input } from 'webmidi'
import { WebMidi } from 'webmidi'
import { useNoteEventsBusStore } from './note-event-bus'

import { useUserSettingsStore } from './user-settings'

export const useMidiStore = defineStore('midi', () => {
  const isMidiEnabled = ref(false)
  const allInputMidiDevices = ref<Input[]>()
  const currentInputDevice = ref<Input>()

  const pitchbend = ref<number>(64)
  const modwheel = useLocalStorage('mls-modwheel-value', 0) // by default modwheel will be set at 0%

  const { fireNotePressed, fireNoteReleased } = useNoteEventsBusStore().bus

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
    if (!input) { // dont trust WebMidi.getInputById() which can actually return undefined...
      // eslint-disable-next-line no-console
      console.log(`couldn't find midi input device with id: ${inputDeviceId}, skipping...`)
      return
    }
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
      fireNotePressed({ note: e.note.identifier })
    })
    currentInputDevice.value.addListener('noteoff', (e) => {
      fireNoteReleased({ note: e.note.identifier })
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
    pitchbend,
    modwheel,
    isMidiEnabled,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useMidiStore, import.meta.hot))
