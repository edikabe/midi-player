<script setup lang="ts">
import { useMidiStore } from '~/stores/midi'

const midiStore = useMidiStore()
const slider = ref(midiStore.modwheel * 100)
const modwheelPct = computed(() => midiStore.modwheel * 100)
watch(modwheelPct, val => slider.value = val)

function handleModwheelValueChange() {
  midiStore.setModwheelValue(slider.value !== 0 ? slider.value / 100 : 0)
}
</script>

<template>
  <div>
    <div>
      <input v-model="slider" type="range" orient="vertical" min="0" max="100" @input.prevent="handleModwheelValueChange">
    </div>
    <h1>ModWheel</h1>
    {{ Math.floor(midiStore.modwheel * 100) }}%
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
