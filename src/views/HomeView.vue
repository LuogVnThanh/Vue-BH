  <script setup>
  import { useProductStore } from "@/stores/productStore/productStore";
  import { storeToRefs } from "pinia";
  import { onMounted } from "vue";
  import { useRouter } from "vue-router";
  import { useCartStore } from "@/stores/cartStore/cartStore"; // Đảm bảo rằng bạn đã nhập cartStore
  import { getProductImage } from "@/helpers/getImage"; // Import hàm getProductImage

  const productStore = useProductStore();
  const cartStore = useCartStore(); // Khai báo cartStore
  const router = useRouter()
  const  {products, currentPage, totalPage} = storeToRefs(productStore)

  //-------------Hàm Mua Ngay---------------
  const buyNow = (product) => {
    // Thêm sản phẩm vào giỏ hàng với số lượng 1
    
    cartStore.addToCart(product, 1);
    
    // Chuyển đến trang Cart
    router.push({ name: 'Cart' });

    // Thông báo đã thêm sản phẩm vào giỏ hàng
    alert("Đã thêm sản phẩm vào giỏ hàng!");
  };

  //---------Hàm format tiền-----
  const formatCurrency = (value) => {
    return `${parseInt(value).toLocaleString('vi-VN')} VND`;
  };
  // =============Phân trang===============
  const fetchProduct = async()=>{
    //  console.log("Fetching products for page:", currentPage.value);
    currentPage.value= localStorage.getItem("currentPage")
    await productStore.getProductsByPage(currentPage.value)
  }

  // Hàm chuyển trang về trước
  const prevPage = ()=>{
    if( currentPage.value > 1){
      productStore.getProductsByPage( currentPage.value - 1);
      localStorage.setItem("currentPage",currentPage.value -1 )
    }
  }
  const nextPage = ()=>{
    if( currentPage.value   <  totalPage.value){
      productStore.getProductsByPage( currentPage.value + 1);
      localStorage.setItem("currentPage",currentPage.value +1 )
    }
  }
  //----------OnMounted-----------------------
  onMounted(() => {
    // productStore.getAllProducts();
    // console.log("Component mounted"); // Kiểm tra xem component có được mount không
    fetchProduct();
    
  });


  </script>

  <template>
      <div class="container" >
          <!-- Div chính chứa tất cả sản phẩm -->
      <div class="product-list">
        <!-- Div tổng chứa sản phẩm -->
        <div class="product-container" v-for="prod in products" :key="prod.id">
          <!-- Div chứa hình ảnh sản phẩm -->
          <div class="product-image"  >
            <!-- Cụ thể, bạn đang cố gắng truy cập thuộc tính prod.images?.[0].image), nhưng prod.images là một mảng các đối tượng hình ảnh, nên bạn cần truy cập vào đối tượng đầu tiên trong mảng. -->
            <img :src="getProductImage(prod.images?.[0].image)" alt="Product Image" />
            <!-- <div>Id: {{ prod.id }}</div> --> 
            
            <!-- Nút Mua ngay và Chi tiết khi hover vào ảnh -->
            <div class="product-buttons">
              <button @click="buyNow(prod)">Mua Ngay</button>
              <RouterLink :to="{name:'DetailProduct',params: { id: prod.id }}"><button>Chi Tiết</button></RouterLink>
            </div>
          </div>

          <!-- Thông tin sản phẩm: tên và giá -->
          <div class="product-info">
            <div class="product-name">{{ prod.name }}</div>
            <div class="product-price">
              <!-- Giá gốc (gạch ngang) -->
              <span class="original-price">{{formatCurrency( prod.price )}}  </span>
              <!-- Giá đã giảm (giảm 30%) -->
              <span class="discounted-price" style="color: rgb(67, 67, 67);">{{ formatCurrency(prod.price * 0.7) }} </span>
            </div>
          </div>
        </div>
      </div>
          <!-- Phân trang -->
      <div class="pagination">
  <button @click="prevPage" :disabled="currentPage <= 1">Trước</button>
  <button @click="nextPage" :disabled="currentPage >= totalPage">Sau</button>
      </div>

      </div>

  </template>

<style scoped>
/* Div chính chứa tất cả sản phẩm */
.product-list {
  display: flex;
  flex-wrap: wrap; /* Cho phép các sản phẩm xuống hàng khi không đủ chỗ */
   justify-content: space-between; /*Giãn đều các sản phẩm */
  
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
  object-fit: cover;
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
.pagination button {
  margin: 0 10px;
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100px;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
 
</style>