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
    <div class="-rotate-90 origin-center mt-20">
      <input v-model="slider" class="stylish" type="range" min="0" max="100" @input.prevent="handleModwheelValueChange">
    </div>
    <h1 class="mt-20">
      ModWheel <br> {{ Math.floor(midiStore.modwheel * 100) }}%
    </h1>
  </div>
</template>
