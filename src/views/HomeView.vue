<!-- simple-bank-2/src/views/HomeView.vue -->
<script setup lang="ts">
import { ref } from 'vue'

const message = ref('Welcome to Simple Bank 🚀')
</script>

<template>
  <main>
    <h1 class="green">{{ message }}</h1>

    <button @click="message = 'Clicked rồi 😎'">Click me</button>
  </main>
</template>

<style scoped>
main {
  padding: 20px;
}

button {
  margin-top: 10px;
}

h1.green {
  color: green;
}
</style>
