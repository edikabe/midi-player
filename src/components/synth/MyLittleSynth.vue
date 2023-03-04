<script setup lang="ts">
// import { useKeyBoardLayoutStore } from '~/stores/keyboard-layout'

// const keyboardLayoutStore = useKeyBoardLayoutStore()
</script>

<template>
  <div class="flex p-6 dark:border-white border-black border-2 rounded-lg">
    <div class="mr-4 w-1/5 flex justify-around">
      <PitchBendControl class="mr-2" />
      <ModWheelControl />
    </div>
    <div class="w-full">
      <Keyboard />
    </div>
  </div>
</template>
