<script setup lang="ts">
// import { useKeyBoardLayoutStore } from '~/stores/keyboard-layout'

// const keyboardLayoutStore = useKeyBoardLayoutStore()
</script>

<template>
  <div class="flex p-6 dark:border-white border-black border-2 rounded-lg">
    <div class="mr-4 w-1/4 h-full justify-around content-end">
      <!--
      <div class="flex">
        <button>octave +</button>
        <button>octave -</button>
      </div>
      -->
      <div class="flex">
        <PitchBendControl />
        <ModWheelControl />
      </div>
    </div>
    <div class="w-full">
      <Keyboard />
    </div>
  </div>
</template>
