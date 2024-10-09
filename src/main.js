

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/authStore/authStore'


const app = createApp(App)

app.use(createPinia())
app.use(router)

const authStore = useAuthStore()
authStore.restoreSession()

app.mount('#app')
