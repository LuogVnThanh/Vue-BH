<script setup>
import { useAuthStore } from "@/stores/authStore/authStore";
import { useCategoryStore } from "@/stores/categoryStore/categoryStore";
import { useProductStore } from "@/stores/productStore/productStore";
import { storeToRefs } from "pinia";
import { ref, onMounted,watch  } from "vue";
import { useRouter,onBeforeRouteUpdate  } from "vue-router";

const router = useRouter();

const authStore = useAuthStore();

const categoryStore = useCategoryStore();
const { categories } = storeToRefs(categoryStore);
// const { selectedCategory } = storeToRefs(productStore);
const productStore = useProductStore();
const { currentPage, searchResults } = storeToRefs(productStore); // Thêm dòng này để lấy currentPage từ productStore

// ===============================Search===================================
const showSearch = ref(false); // State để kiểm soát hiển thị input tìm kiếm
const showSearchResults = ref(false); // Biến để kiểm soát việc hiển thị kết quả tìm kiếm
const searchQuery = ref("");


const toggleSearch = () => {
  showSearch.value = !showSearch.value; // Hàm toggle hiển thị input tìm kiếm
  if (!showSearch.value) {
    showSearchResults.value = false; // Tắt hiển thị kết quả khi ẩn input
    searchQuery.value = ""; // Xóa nội dung tìm kiếm
  }
};
// Thêm debounce cho tìm kiếm==================================

const searchProd = async (searchQuery) => {
  if (searchQuery.trim()) {
    await productStore.searchProduct(searchQuery);
    showSearchResults.value = true;
  } else {
    showSearchResults.value = false;
  }
};

// Hàm debounce nhận vào một hàm và một thời gian trì hoãn
const debounce = (func, delay) => {
  let timeout; // Khai báo biến để lưu trữ timer

  return function(...args) {
    clearTimeout(timeout); // Xóa timer trước đó nếu có
    // Thiết lập lại timer
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
};
// Sử dụng debounce cho hàm tìm kiếm
const debouncedSearchProd = debounce(searchProd, 300);
// ===================Hàm tìm kiếm=========================

//  ====================reset số trang=========================
const resetPage = async () => {
  await productStore.resetProductPage();
  currentPage.value = 1; // Đặt lại giá trị trang hiện tại về 1
  localStorage.setItem("currentPage", currentPage.value);
  router.push({ name: "Home" });
};
const formatCurrency = (value) => {
  return `${parseInt(value).toLocaleString("vi-VN")} VND`;
};

// ==============================================
 const hideSearch = () => {
  showSearch.value = false; // Ẩn input tìm kiếm
  showSearchResults.value = false; // Ẩn danh sách kết quả tìm kiếm
    searchQuery.value = ""; // Xóa nội dung tìm kiếm

};
// ==============================================
onMounted(() => {
  categoryStore.getAllCategories();
});
</script>

<template>
  <!-- Navbar -->
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container container-fluid">
      <!-- Logo bên trái -->
      <a class="navbar-brand" href="/" @click.prevent="resetPage()">
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
      <div class="d-flex">
        <!-- Icon tìm kiếm -->
        <div class="search-container">
          <i class="bi bi-search" @click="toggleSearch"></i>
          <input
            v-if="showSearch"
            type="text"
            class="search-input"
            placeholder="Tìm kiếm..."
            v-model="searchQuery"
            
             @keyup.enter="debouncedSearchProd(searchQuery)"
          />
          <div v-if="showSearchResults" class="search-results">
         
         <p v-if="searchResults.length > 0" >
          Có tổng {{ searchResults.length }} kết quả 
           </p>  
         <p v-else> 
          Không có kết quả 
          </p>

            <router-link
              class="search-item"
              v-for="product in searchResults"
              :key="product.id"
              :to="{ name: 'DetailProduct', params: { id: product.id } }"
                @click="hideSearch" 
            >
              <img
                :src="product.images?.[0].image"
                alt="Product Image"
                class="search-product-image"
              />
              <div class="search-product-name">{{ product.name }}</div>
            </router-link>
          </div>
        </div>

        <!-- Icon giỏ hàng -->
        <router-link to="/cart" class="nav-link">
          <i class="bi bi-cart"></i>
        </router-link>

        <!-- Icon người dùng -->
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

.d-flex {
  margin-right: 50px;
}
.d-flex a {
  margin-left: 15px; /* Khoảng cách giữa các icon */
}

.navbar-brand img {
  height: 40px;
  width: auto; /* Kích thước logo */
}

/* Style cho input tìm kiếm */
.search-container {
  position: relative; /* Để có thể định vị input */
}

.search-input {
  display: block;
  position: absolute; /* Đặt input ra ngoài */
  right: -270px !important; /* Di chuyển input ra ngoài khung nhìn */
  padding-left: 20px !important;
  top: 50%;
  transform: translateY(-50%);
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: right 0.5s ease; /* Hiệu ứng di chuyển */
}

.search-container .bi-search {
  cursor: pointer;
}

/* Hiện input khi showSearch là true */
.search-container .search-input {
  right: 0; /* Về lại vị trí ban đầu */
}

/* Ẩn input khi showSearch là false */
.search-container .search-input {
  right: -250px; /* Ẩn input */
}
/* Div chứa kết quả tìm kiếm */
.search-results {
  position: absolute;
  background-color: white;
  border: 1px solid #ddd;
  width: 300px;
  max-height: 300px; /* Thay đổi chiều cao tối đa */
  overflow-y: auto;
  margin-top: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  border-radius: 4px; /* Bo góc */
  z-index: 100; /* Đảm bảo nó ở trên */
}

/* Sản phẩm trong danh sách tìm kiếm */
.search-item {
  display: flex;
  align-items: center;
  padding: 10px; /* Tăng khoảng cách padding */
  border-bottom: 1px solid #eee;
  transition: background-color 0.3s; /* Hiệu ứng chuyển màu nền */
  text-decoration: none; /* Bỏ gạch chân cho router-link */
  color: inherit; /* Đảm bảo màu chữ kế thừa */
}

.search-item:hover {
  background-color: #f0f8ff; /* Màu nền khi hover */
}

.search-product-image {
  width: 50px;
  height: 50px;
  margin-right: 10px;
  border-radius: 4px; /* Bo góc ảnh */
}

.search-product-name {
  flex: 1;
  font-weight: bold; /* Làm cho tên sản phẩm nổi bật hơn */
  color: #333; /* Màu chữ */
}
/* Custom style cho thẻ p trong kết quả tìm kiếm */
.search-results p {
  margin: 0; /* Xóa khoảng cách mặc định */
  padding: 10px; /* Thêm padding cho thẻ p */
  font-size: 14px; /* Thay đổi kích thước chữ */
  color: #333; /* Màu chữ */
  font-weight: bold; /* Làm chữ đậm hơn */
  text-align: center; /* Căn giữa văn bản */
  background-color: #f8f9fa; /* Màu nền cho thẻ p */
  border-radius: 4px; /* Bo góc cho thẻ p */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); /* Thêm bóng cho thẻ p */
  margin-bottom: 5px; /* Khoảng cách dưới giữa các thẻ p */
}
</style>
