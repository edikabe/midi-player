<script setup lang="ts">
import { useMidiStore } from '~/stores/midi'

const midiStore = useMidiStore()

const lastNotePlayed = ref<string>()
midiStore.eventBus.notePressed.on((note) => {
  lastNotePlayed.value = note
})

onMounted(async () => {
  await midiStore.enableMidi()
})
</script>

<template>
  <div class="container mx-auto">
    <h1 class="text-2xl">
      My Little Synth (beta)
    </h1>
    <div class="mt-3">
      <div v-if=" midiStore.currentInputDevice" class="mt-3">
        <div>Current Midi input device: {{ midiStore.currentInputDevice.name }}</div>
        <div>Last note played: {{ lastNotePlayed || '- play a note -' }}</div>
        <!--
        <div>Pitchbend val: {{ midiStore.pitchbend || '0' }}</div>
        -->
      </div>
    </div>

    <div class="mt-6">
      <MyLittleSynth />
    </div>
  </div>
</template>
