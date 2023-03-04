import { defineStore } from 'pinia'
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

  const isMidiEnabled = ref(false)
  const allInputMidiDevices = ref<Input[]>([])
  const currentInputDevice = ref<Input>()

  const pitchbend = ref<number>()

  async function enableMidi() {
    try {
      await WebMidi.enable()
      allInputMidiDevices.value = WebMidi.inputs
      isMidiEnabled.value = true

      const userSettingsStore = useUserSettingsStore()
      if (userSettingsStore.currentMidiInputDevice) {
        const devFoundInList = allInputMidiDevices.value.find(dev => dev.name === userSettingsStore.currentMidiInputDevice)
        if (devFoundInList)
          selectCurrentInputDevice(devFoundInList as Input)
      }
    }
    catch {
      isMidiEnabled.value = false
    }
  }

  function selectCurrentInputDevice(input: Input) {
    // eslint-disable-next-line no-console
    console.log(input)
    if (currentInputDevice.value)
      currentInputDevice.value.removeListener()

    // set current input Midi device
    currentInputDevice.value = input
    useUserSettingsStore().setCurrentMidiInputDevice(currentInputDevice.value)

    // add listeners and bind them to store models
    currentInputDevice.value.addListener('pitchbend', (e) => {
      // console.log(e.message.data)
      pitchbend.value = e.message.data[2]
    })

    currentInputDevice.value.addListener('noteon', (e) => {
      // console.log(e.note)
      eventBus.notePressed(e.note.identifier)
    })

    currentInputDevice.value.addListener('noteoff', (e) => {
      // console.log(e.note)
      eventBus.noteReleased(e.note.identifier)
    })
  }

  return {
    allInputMidiDevices,
    currentInputDevice,
    selectCurrentInputDevice,
    enableMidi,
    eventBus,
    pitchbend,
    isMidiEnabled,
  }
})
