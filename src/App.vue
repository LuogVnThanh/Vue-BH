<script setup>
import NavbarComponentVue from "./components/NavbarComponent.vue";
import { onMounted } from "vue";
import { useAuthStore } from "./stores/authStore/authStore";

const authStore = useAuthStore();
onMounted(() => {
  authStore.restoreSesstion();
});
</script>

<template>
  <NavbarComponentVue />
  <div class="routerview" style="margin-top: 100px;">
    <RouterView />

  </div>

</template>
