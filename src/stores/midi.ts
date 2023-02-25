import { defineStore } from "pinia";
import { WebMidi, Input } from "webmidi";
import { createEventBus, slot } from "ts-event-bus";

export const useMidiStore = defineStore('midi', () => {

    const eventBus = createEventBus({
        events: {
            notePlayed: slot<string>(),
        }
    })

    const error = ref(false);
    const allInputMidiDevices = ref<Input[]>([]);
    const currentInputDevice = ref<Input>();

    const pitchbend = ref<number>();

    async function enableMidi() {
        try {
            await WebMidi.enable();
            allInputMidiDevices.value = WebMidi.inputs;
        } catch {
            error.value = true;
        }
    }

    function selectCurrentInputDevice(input: Input) {
        if (currentInputDevice.value) {
            currentInputDevice.value.removeListener();
        }

        // set current input Midi device
        currentInputDevice.value = input;

        // add listeners and bind them to store models
        currentInputDevice.value.addListener("pitchbend", e => {
            console.log(e.message.data);
            pitchbend.value = e.message.data[2];
        });

        currentInputDevice.value.addListener("noteon", e => {
            console.log(e.note);
            eventBus.notePlayed(e.note.identifier);
        });
    }

    return {
        allInputMidiDevices,
        currentInputDevice,
        selectCurrentInputDevice,
        enableMidi,
        eventBus,
        pitchbend
    }

})