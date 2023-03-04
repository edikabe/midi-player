<script setup lang="ts">
import { useMidiStore } from '~/stores/midi'

const midiStore = useMidiStore()

const selectedDeviceId = ref()
watch(selectedDeviceId, deviceId => midiStore.selectCurrentInputDevice(deviceId))
</script>

<template>
  <div class="absolute top-0 left-0 w-full h-screen z-40 dark:bg-gray-900 bg-green-600">
    <div class="container mx-auto">
      <h1 class="text-3xl mt-6">
        settings
      </h1>
      <div v-if="midiStore.isMidiEnabled" class="mt-3">
        <label for="device-selector">Select you midi input device</label>
        <select id="device-selector" v-model="selectedDeviceId" class="ml-2 text-black">
          <template v-for="device in midiStore.allInputMidiDevices" :key="device.name">
            <option :value="device.id">
              {{ device.name }}
            </option>
          </template>
        </select>
      </div>
    </div>
  </div>
</template>
