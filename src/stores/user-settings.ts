import { defineStore } from 'pinia'
import type { Input } from 'webmidi'

export const useUserSettingsStore = defineStore('user-settings', () => {
  const currentMidiInputDevice = useLocalStorage<string | undefined>('mls-settings-current-midi-input-device', undefined)

  function setCurrentMidiInputDevice(inputMidiDeviceName: Input) {
    currentMidiInputDevice.value = inputMidiDeviceName.name
  }

  return {
    currentMidiInputDevice,
    setCurrentMidiInputDevice,
  }
})
