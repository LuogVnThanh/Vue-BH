<template>
  <div class="container">
    <div>
    <h1>Thông tin người dùng</h1>
    <div v-if="customer">
      <p><strong>Tên:</strong> {{ customer.name }}</p>
      <p><strong>SDT:</strong> {{ customer.phone }}</p>
      <p><strong>Email:</strong> {{ customer.email }}</p>
      <!-- Thêm các trường khác nếu cần -->
    </div>
    <div v-else>
      <p>Đang tải thông tin...</p>
    </div>
  </div>
  </div>

</template>
  
  <script setup>
  import { useAuthStore } from '@/stores/authStore/authStore';
import { onMounted,ref } from 'vue';
  
  const authStore = useAuthStore();
  const customer = ref(null);

  onMounted(()=>{
    customer.value = authStore.customer
  })
  
  
  </script>
  