<script setup lang="ts">
import { useMidiStore } from '~/stores/midi'

const midiStore = useMidiStore()

const selectedDevice = ref()
watch(selectedDevice, device => midiStore.selectCurrentInputDevice(device))

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
      <div class="border-1">
        <label for="device-selector">Select you midi input device</label>
        <select id="device-selector" v-model="selectedDevice" class="ml-2 text-black">
          <template v-for="device in midiStore.allInputMidiDevices" :key="device.name">
            <option :value="device">
              {{ device.name }}
            </option>
          </template>
        </select>
      </div>
      <div v-if=" midiStore.currentInputDevice" class="mt-3">
        <div>Note played: {{ lastNotePlayed || '- play a note -' }}</div>
        <div>Pitchbend val: {{ midiStore.pitchbend || '0' }}</div>
      </div>
    </div>

    <Keyboard />
  </div>
</template>
