<script setup lang="ts">
import { useMidiStore } from '~/stores/midi'
import { useAudioBusStore } from '~/stores/audio-bus'
import { useNoteEventsBusStore } from '~/stores/note-event-bus'

const midiStore = useMidiStore()
const audioBusStore = useAudioBusStore()
const noteEventBusStore = useNoteEventsBusStore()

onMounted(async () => {
  await midiStore.enableMidi()
  audioBusStore.registerHandlers()
})
</script>

<template>
  <div class="container mx-auto">
    <h1 class="text-2xl">
      My Little Synth (beta)
    </h1>
    <div class="mt-3">
      <div class="mt-3">
        <div v-if=" midiStore.currentInputDevice">
          Current Midi input device: {{ midiStore.currentInputDevice.name }}
        </div>
        <div>
          Current notes played:
          <template v-if="noteEventBusStore.currentNotesPressedArray.length">
            <span
              v-for="note in noteEventBusStore.currentNotesPressedArray"
              :key="note"
              class="font-bold dark:text-black dark:bg-white text-white bg-black mr-1 p-1 rounded-1"
            >{{ note }}</span>
          </template>
          <span v-else>- play a note -</span>
        </div>
      </div>
    </div>

    <div class="mt-6">
      <MyLittleSynth />
    </div>
  </div>
</template>
