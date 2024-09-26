<template>
  <!-- Navbar -->
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
      <!-- Logo bên trái -->
      <a class="navbar-brand" href="/">
        <img
          src="https://media.routine.vn/prod/media/3a5190d5-6bc5-4dd1-b8a9-3b143556822a.webp"
          alt="Logo"
          width="40"
          height="40"
        />
      </a>

      <!-- Nút toggle cho di động -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Danh sách các sản phẩm nằm giữa -->
      <div
        class="collapse navbar-collapse justify-content-center"
        id="navbarNav"
      >
        <ul class="navbar-nav">
          <li
            class="nav-item"
            v-for="category in categories"
            :key="category.id"
          >
            <router-link
              :to="{ name: 'ProductByCategory', params: { id: category.id } }"
              class="nav-link"
              >{{ category.name }}</router-link
            >
          </li>
        </ul>
      </div>

      <!-- Icon Cart, User, Logout nằm bên phải -->

      <!-- Icon giỏ hàng -->
      <div class="d-flex">
        <router-link to="/cart" class="nav-link">
          <i class="bi bi-cart"></i>
        </router-link>

        <!-- Icon người dùng -->
        <!-- Kiểm tra nếu đã đăng nhập hiển thị tên người dùng -->
        <a
          class="nav-link"
          v-if="authStore.isAuthenticated"
          @click="authStore.HandleProfile()"
        >
          <i>
            <i class="bi bi-person">{{ authStore.customer?.name }}</i>
          </i>
        </a>

        <!-- Hiển thị nút đăng nhập nếu chưa có token -->
        <a v-else class="nav-link" @click="authStore.HandleProfile()">
          <i class="bi bi-person"> Đăng nhập</i>
        </a>

        <!-- Nút đăng xuất chỉ hiển thị khi đã đăng nhập -->
        <a
          v-if="authStore.isAuthenticated"
          class="nav-link"
          @click="authStore.Logout"
        >
          <i class="bi bi-box-arrow-right"></i> Đăng xuất
        </a>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from "@/stores/authStore/authStore";
import { useCategoryStore } from "@/stores/categoryStore/categoryStore";
import { useProductStore } from "@/stores/productStore/productStore";
import { storeToRefs } from "pinia";

import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const authStore = useAuthStore();

const categoryStore = useCategoryStore();

const productStore = useProductStore();

const { categories } = storeToRefs(categoryStore);
// const { selectedCategory } = storeToRefs(productStore);

onMounted(() => {
  categoryStore.getAllCategories();
});

 
</script>

<!-- css -->
<style scoped>
/* Custom style for navbar */
.navbar {
  position: fixed; /* Đặt vị trí cố định */
  top: 0; /* Gắn trên cùng */
  left: 0; /* Gắn bên trái */
  right: 0; /* Gắn bên phải */
  z-index: 1000; /* Đảm bảo navbar nằm trên các thành phần khác */
}

.navbar-nav {
  flex-direction: row; /* Inline các mục menu */
}

.nav-item {
  margin-right: 20px; /* Khoảng cách giữa các mục */
}

.nav-link {
  color: black; /* Màu chữ mặc định */
  cursor: pointer;
}

.nav-link:hover {
  color: #007bff; /* Màu khi hover */
}

.d-flex a {
  margin-left: 15px; /* Khoảng cách giữa các icon */
}

.navbar-brand img {
  height: 40px;
  width: auto; /* Kích thước logo */
}
</style>
