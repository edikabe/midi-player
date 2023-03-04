<script setup lang="ts">
const displaySettings = ref(false)
</script>

<template>
  <main font-sans p="x-4 y-10" text="center gray-700 dark:gray-200">
    <RouterView />
    <Footer />
    <UserSettings v-if="displaySettings" />
    <div v-if="!displaySettings" class="fixed top-2 right-3 z-50">
      <button icon-btn @click="displaySettings = true">
        <div class="i-carbon-settings text-3xl" />
      </button>
    </div>
    <div v-else class="fixed top-2 right-3 z-50">
      <button icon-btn @click="displaySettings = false">
        <div class="i-carbon-close text-3xl" />
      </button>
    </div>
  </main>
</template>
