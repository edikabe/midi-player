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
    <div class="-rotate-90 origin-center mt-20">
      <input v-model="slider" class="stylish" type="range" min="0" max="127" @input.prevent="handlePitchbendValueChange" @mouseup="midiStore.setPitchbendValue(64)">
    </div>
    <h1 class="mt-20">
      PitchBend <br> {{ pitchbend }}
    </h1>
  </div>
</template>
