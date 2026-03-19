// main.ts
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'

// ✅ theme (JS)
import Aura from '@primeuix/themes/aura'

// ✅ icons (CSS)
import 'primeicons/primeicons.css'

import 'primeflex/primeflex.css'

const app = createApp(App)

app.use(router)

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.dark',
    },
  },
})

app.mount('#app')
