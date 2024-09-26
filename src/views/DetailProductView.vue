<template>
    <div class="container DetailProduct" v-if="selectedProduct">
      <div class="ImgProduct">
        <a href="">
          <img
            src="https://bulma.io/assets/images/placeholders/1280x960.png"
            alt="ProductImage"
          />
          
        </a>
      </div>
      <div class="InfoProduct" >
        <p>Tên:{{ selectedProduct.name }}</p>
        <p>Mô tả:{{ selectedProduct.description}}</p>
        <p>Giá: {{ formatCurrency(selectedProduct.price*0.7) }}</p>
        <p>Tổng Số lượng: {{ selectedProduct.quantity }}</p>
        <div class="quantity-control">
          <!-- Btn giảm -->
          <button @click="decreaseQuantity" 
          :disabled="selectedQuantity===1" > - </button>
          <input type="number"  v-model="selectedQuantity"  :min="1" :max="selectedProduct.quantity" readonly   />
          <!-- Btn tăng -->
          <button @click="increaseQuantity" :disabled="selectedProduct===selectedProduct.quantity"> + </button>
        </div>
        <div  >
            <button class="confirm-btn">Xác nhận</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
import { useProductStore } from "@/stores/productStore/productStore";
import { storeToRefs } from "pinia";
import { onMounted,ref } from "vue";
import { useRoute } from "vue-router";
import { getProductImage } from "@/helpers/getImage"; // Import hàm getProductImage


  const route = useRoute();
  const productStore = useProductStore();
  const { selectedProduct} = storeToRefs(productStore)

  onMounted(()=>{
    const id = route.params.id
    productStore.getProductById(id)
  })

  //Đổi dạng tiền
  const formatCurrency = (value) => {
  return `${parseInt(value).toLocaleString("vi-VN")} VND`;
};
  //Hàm tăng số lượng
  const selectedQuantity = ref(1)
  const increaseQuantity = ()=>{
    if(selectedQuantity.value < selectedProduct.value.quantity){
      selectedQuantity.value++
    }
  }
  //Hàm giảm số lượng
  const decreaseQuantity =()=>{
    if(selectedQuantity.value>1){
      selectedQuantity.value--;
    }
  }
</script>
  
  <style scoped>
  .DetailProduct {
    display: flex;
    justify-content: space-between; /* Chia đều khoảng trống giữa hình và thông tin */
    align-items: flex-start; /* Căn chỉnh phần đầu của sản phẩm */
    gap: 20px; /* Khoảng cách giữa hình ảnh và thông tin */
   
    padding: 10px;
  }
  
  .ImgProduct {
    flex: 1; /* Hình ảnh chiếm 50% */
  }
  
  .ImgProduct img {
    width: 100%;
    height: auto;
    border-radius: 10px; /* Bo góc hình ảnh */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Hiệu ứng đổ bóng cho ảnh */
  }
  
  .InfoProduct {
    flex: 1; /* Thông tin sản phẩm chiếm 50% */
    display: flex;
    flex-direction: column; /* Hiển thị thông tin theo chiều dọc */
    justify-content: center;
    gap: 15px; /* Khoảng cách giữa các phần thông tin */
  }
  
  .InfoProduct p {
    font-size: 18px;
    color: #333;
    margin: 5px 0;
  }
  
  .quantity-control {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .quantity-control button {
    background-color: #007bff;
    border: none;
    color: white;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
  }
  
  .quantity-control button:hover {
    background-color: #0056b3;
  }
  
  .quantity-control input {
    width: 60px;
    text-align: center;
    font-size: 16px;
    padding: 5px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  
  .confirm-btn {
    background-color: #28a745;
    color: white;
    padding: 10px 36px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
  }
  
  .confirm-btn:hover {
    background-color: #218838;
  }
  </style>
  