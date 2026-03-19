<!-- simple-bank-2/src/components/LoginUser.vue -->
<script setup lang="ts">
import { ref, computed, watch } from 'vue'

import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import axios from 'axios'
import { api } from '../services/api'

const email = ref('')
const password = ref('')
const username = ref('')
const loading = ref(false)
const errorMessage = ref('')

// 👇 đặt ở đây (ngoài function)
watch([username, password, email], () => {
  if (errorMessage.value) {
    errorMessage.value = ''
  }
})

const isLoginDisabled = computed(() => {
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)

  return !username.value.trim() || !password.value.trim() || !emailValid
})

type LoginResponse = {
  user: {
    username: string
    email: string
  }
  access_token: string
  refresh_token: string
}

const handleLogin = async () => {
  console.log('Email:', email.value)
  console.log('Password:', password.value)
  console.log('Username:', username.value)
  loading.value = true
  console.log('Loading:', loading.value)
  try {
    const res = await api.post<LoginResponse>('/users/login', {
      username: username.value,
      password: password.value,
    })

    console.log('Response:', res.data)

    // 👉 lưu token
    localStorage.setItem('access_token', res.data.access_token)
    localStorage.setItem('refresh_token', res.data.refresh_token)

    // 👉 optional: lưu user
    localStorage.setItem('user', JSON.stringify(res.data.user))

    // 👉 redirect (nếu có router)
    // router.push('/dashboard')
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      errorMessage.value = err.response?.data?.message || 'Login failed'
    } else {
      errorMessage.value = 'Something went wrong'
    }
  } finally {
    loading.value = false
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

      <!-- 👇 ERROR MESSAGE ĐÚNG CHỖ -->
      <p v-if="errorMessage" class="text-red-500 text-sm mb-3">
        {{ errorMessage }}
      </p>

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
