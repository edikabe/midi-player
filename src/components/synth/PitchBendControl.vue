<script setup lang="ts">
import { useMidiStore } from '~/stores/midi'

const midiStore = useMidiStore()
const pitchbend = computed(() => midiStore.pitchbend)
const slider = ref(midiStore.pitchbend)
watch(pitchbend, val => slider.value = val)
function handlePitchbendValueChange() {
  midiStore.setPitchbendValue(slider.value)
}
</script>

<template>
  <div>
    <div>
      <input v-model="slider" type="range" orient="vertical" min="0" max="127" @input.prevent="handlePitchbendValueChange" @mouseup="midiStore.setPitchbendValue(64)">
    </div>
    <h1>PitchBend</h1>
    {{ pitchbend }}
  </div>
</template>

<style scoped lang="css">
input[type=range][orient=vertical] {
  -webkit-appearance: slider-vertical;
  width: 16px;
  height: 175px;
  padding: 0 5px;
}
</style>
