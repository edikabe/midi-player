<script setup lang="ts">
import { useMidiStore } from '~/stores/midi'

const midiStore = useMidiStore()
const pitchbend = computed(() => midiStore.pitchbend)
</script>

<template>
  <div>
    <h1>Pitchbend</h1>
    {{ pitchbend }}
  </div>
</template>
