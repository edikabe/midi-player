import { defineStore } from 'pinia'
import type { Input } from 'webmidi'

export const useUserSettingsStore = defineStore('user-settings', () => {
  const currentMidiInputDeviceId = useLocalStorage<string>('mls-settings-current-midi-input-device', '')

  function setCurrentMidiInputDevice(inputMidiDeviceName: Input) {
    currentMidiInputDeviceId.value = inputMidiDeviceName.id
  }

  return {
    currentMidiInputDeviceId,
    setCurrentMidiInputDevice,
  }
})
