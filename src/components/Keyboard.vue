<script setup lang="ts">
import { useKeyBoardLayoutStore } from '~/stores/keyboard-layout'

const keyboardLayoutStore = useKeyBoardLayoutStore()
</script>

<template>
  <div class="flex h-xl w-full border-2 border-white rounded-md bg-gray-100">
    <Key note="C3" />
    <Key note="C#3" :black="true" />
    <Key note="D3" />
    <Key note="D#3" :black="true" />
    <Key note="E3" />
    <Key note="F3" />
    <Key note="F#3" :black="true" />
    <Key note="G3" />
    <Key note="G#3" :black="true" />
    <Key note="A3" />
    <Key note="A#3" :black="true" />
    <Key note="B3" />
    <Key note="C4" />
  </div>
</template>
