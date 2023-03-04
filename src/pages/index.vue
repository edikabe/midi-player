<script setup lang="ts">
import { useMidiStore } from '~/stores/midi'

const midiStore = useMidiStore()

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
        <div>
          Current notes played:
          <template v-if="midiStore.currentNotesPressedArray.length">
            <span
              v-for="note in midiStore.currentNotesPressedArray"
              :key="note"
              class="font-bold dark:text-black dark:bg-white text-black bg-white mr-1 p-1 rounded-1"
            >{{ note }}</span>
          </template>
          <span v-else>- play a note -</span>
        </div>
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
