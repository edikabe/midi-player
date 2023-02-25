<script setup lang="ts">
import { useMidiStore } from "~/stores/midi";

const midiStore = useMidiStore();
/*
const devicesOptions = computed(() => midiStore.allInputMidiDevices.map(dev => {
    return {
        name: `${dev.manufacturer} - ${dev.name}`,
        device: dev 
    }   
}));
*/
const inputDevices = computed(() => midiStore.allInputMidiDevices);

onMounted(async () => {
    await midiStore.enableMidi();
});

const selectedDevice = ref();

watch(selectedDevice, (device) => midiStore.selectCurrentInputDevice(device));

const currentSelectedDevice = computed(() => midiStore.currentInputDevice);

const lastNotePlayed = ref<string>();

midiStore.eventBus.notePlayed.on((note) => {
    lastNotePlayed.value = note
});

</script>

<template>
    <div class="container mx-auto">
        
        <h1>Your Midi devices list :)</h1>
        <div>
            <label for="device-selector">Select one</label>
            <select id="device-selector" v-model="selectedDevice">
                <template v-for="device in inputDevices">
                    <option :value="device">{{ device.name }}</option>
                </template>
            </select>
            <div v-if="currentSelectedDevice">
                <div>Note: {{ lastNotePlayed || '-' }}</div>
                <div>Pitchbend value: {{ midiStore.pitchbend || '-' }}</div>
            </div>
        </div>
    </div>
</template>
<style>

</style>