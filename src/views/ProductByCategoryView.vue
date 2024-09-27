<script setup>
import { useProductStore } from "@/stores/productStore/productStore";
import { storeToRefs } from "pinia";
import { onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getProductImage } from "@/helpers/getImage"; // Import hàm getProductImage

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();

const { selectedCategory } = storeToRefs(productStore);


const formatCurrency = (value) => {
  return `${parseInt(value).toLocaleString("vi-VN")} VND`;
};
onMounted(() => {
  const id = route.params.id;
  productStore.getProductByCategory(id);
});

//Sử dụng watch để lắng nghe các thay đổi của route.params.id và thực hiện một hành động mỗi khi giá trị này thay đổi:
watch(
  () => route.params.id,
  (newId) => {
    productStore.getProductByCategory(newId);
  }
);
</script>
<template>
  <div>
    <div v-if="selectedCategory.length">
      <div class="container">
        <!-- Hiển thị ID danh mục từ URL -->
        <p>Có tổng {{ selectedCategory.length }} sản phẩm trong danh mục:</p>

        <!-- Kiểm tra nếu có sản phẩm trong selectedCategory -->
        <!-- Div chính chứa tất cả sản phẩm -->
        <div class="product-list">
          <!-- Div tổng chứa sản phẩm -->
          <div
            class="product-container"
            v-for="product in selectedCategory"
            :key="product.id"
          >
            <!-- Div chứa hình ảnh sản phẩm -->
            <div class="product-image">
              <img
                :src="
                  getProductImage(product.images?.[0].image) ||
                  'path/to/default/image.jpg'
                "
                alt="Product Image"
              />

              <!-- Nút Mua ngay và Chi tiết khi hover vào ảnh -->
              <div class="product-buttons">
                <button>Mua Ngay</button>
                <RouterLink
                  :to="{ name: 'DetailProduct', params: { id: product.id } }"
                  ><button>Chi Tiết</button></RouterLink
                >
              </div>
            </div>

            <!-- Thông tin sản phẩm: tên và giá -->
            <div class="product-info">
              <div class="product-name">{{ product.name }}</div>
              <div class="product-price">
                <!-- Giá gốc (gạch ngang) -->
                <span class="original-price"
                  >{{ formatCurrency(product.price) }}
                </span>
                <!-- Giá đã giảm (giảm 30%) -->
                <span class="discounted-price" style="color: rgb(67, 67, 67)"
                  >{{ formatCurrency(product.price * 0.7) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Hiển thị thông báo nếu không có sản phẩm -->
    <div v-else>
      <div class="container">
        <p>Không có sản phẩm trong danh mục này.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Div chính chứa tất cả sản phẩm */
.product-list {
  display: flex;
  flex-wrap: wrap; /* Cho phép các sản phẩm xuống hàng khi không đủ chỗ */
  /* justify-content: space-between; Giãn đều các sản phẩm */
  gap: 25px; /* Khoảng cách giữa các sản phẩm */
}

/* Tổng container chứa sản phẩm */
.product-container {
  flex: 0 1 calc(25% - 20px); /* Chiếm 25% chiều rộng mỗi sản phẩm trừ khoảng cách 20px */
  margin: 10px 0; /* Khoảng cách trên và dưới */
  text-align: center;
  border: 1px solid #ddd;
  padding: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  position: relative;
  overflow: hidden;
}

/* Khi hover sản phẩm sẽ có hiệu ứng */
.product-container:hover {
  transform: scale(1.05);
}

/* Div chứa hình ảnh sản phẩm */
.product-image {
  position: relative;
  width: 100%;
  height: 250px;
  overflow: hidden;
}

/* Style cho hình ảnh sản phẩm */
.product-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* Nút Mua Ngay và Chi Tiết chỉ hiển thị khi hover */
.product-buttons {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px 0;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.product-container:hover .product-buttons {
  transform: translateY(0);
}

/* Style cho tên sản phẩm và giá */
.product-info {
  margin-top: 15px;
}

.product-name {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
}

/* Style cho giá sản phẩm */
.product-price {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.original-price {
  font-size: 16px;
  color: #888;
  text-decoration: line-through;
}

.discounted-price {
  font-size: 16px;
  color: #007bff;
  font-weight: bold;
}

/* Style cho nút Mua Ngay và Chi Tiết */
.product-buttons button {
  background: #007bff;
  border: none;
  padding: 8px 15px;
  color: white;
  font-size: 14px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.product-buttons button:hover {
  background-color: #0056b3;
}
</style>
