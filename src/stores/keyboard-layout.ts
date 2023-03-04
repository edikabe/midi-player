import { defineStore } from 'pinia'

export const useKeyBoardLayoutStore = defineStore('keyboard-layout', () => {
  const minOctave = -1
  const maxOctave = 8

  const numberOfOctavesDisplayed = useLocalStorage('mls-settings-octaves-displayed', 2)

  return {
    numberOfOctavesDisplayed,
  }
})
