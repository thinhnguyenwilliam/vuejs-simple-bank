<!-- simple-bank-2/src/components/LoginUser.vue -->
<script setup lang="ts">
import { ref, computed } from 'vue'

import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'

const email = ref('')
const password = ref('')
const username = ref('')
const loading = ref(false)

const isLoginDisabled = computed(() => {
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)

  return !username.value.trim() || !password.value.trim() || !emailValid
})

const handleLogin = async () => {
  console.log('Email:', email.value)
  console.log('Password:', password.value)
  console.log('Username:', username.value)
  loading.value = true
  console.log('Loading:', loading.value)
  try {
    // call API ở đây
  } catch (err) {
    console.error('Login failed:', err)
  } finally {
    loading.value = false
    console.log('Loading:', loading.value)
  }
}
</script>

<template>
  <div class="flex justify-content-center align-items-center h-screen">
    <div class="card w-25rem">
      <h2 class="text-center mb-3">Login</h2>

      <InputGroup class="mb-3">
        <InputGroupAddon>
          <i class="pi pi-user"></i>
        </InputGroupAddon>
        <InputText v-model="username" placeholder="Username" />
      </InputGroup>

      <InputGroup class="mb-3">
        <InputGroupAddon>
          <i class="pi pi-envelope"></i>
        </InputGroupAddon>
        <InputText v-model="email" placeholder="Email" />
      </InputGroup>

      <InputGroup class="mb-3">
        <InputGroupAddon>
          <i class="pi pi-lock"></i>
        </InputGroupAddon>
        <Password v-model="password" placeholder="Password" toggleMask />
      </InputGroup>

      <Button
        label="Login"
        class="w-full"
        :disabled="isLoginDisabled || loading"
        :loading="loading"
        @click="handleLogin"
      />
    </div>
  </div>
</template>
