<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useAuthStore } from "@/stores/authStore/authStore";
import { useCartStore } from "@/stores/cartStore/cartStore"; // Nhập cartStore
 

const router = useRouter();
const authStore = useAuthStore();

const email = ref("admin@gmail.com");
const password = ref("12345");
const errorMessage = ref("");
const cartStore = useCartStore(); // Khởi tạo cartStore
const showPassword=ref(false); //Khởi tạo ẩn hiện password


const handleLogin = async () => {
  try {
    await authStore.Login(email.value, password.value);
    // console.log("Đăng nhập thành công.");

    // Cập nhật trạng thái đăng nhập trong cartStore
    cartStore.setLoggedIn(true);

     

    // Gọi hàm tạo giỏ hàng sau khi đăng nhập thành công
    await cartStore.createCart();
    
 
       // Chuyển hướng đến trang chủ hoặc trang khác
    router.push("/");
  } catch (error) {
   
     errorMessage.value = "Đăng nhập không thành công, vui lòng kiểm tra lại!"; // Hiển thị thông báo lỗi
  }
};
</script>

<template>
  <div class="LGF">
    <div class="login-container">
      <h2>Login</h2>
      
      <!-- @submit.prevent="login": Khi người dùng gửi form, sự kiện submit sẽ gọi hàm login mà không làm reload trang. -->
      <form id="loginForm" @submit.prevent="handleLogin">
        <div class="form-group">
          <i class="fas fa-envelope icon-right"></i>
          <input v-model="email" type="email" placeholder="Email" required />
        </div>
        <div class="form-group">
          <i class="fas fa-lock icon-right"></i>
          <input 
          v-model="password" 
          :type="showPassword ? 'text' : 'password'"
          id="password" 
          placeholder="Password" required />
                  <i
            :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
            @click="showPassword = !showPassword"
            class="toggle-password "
          ></i> 
        </div>

        <button type="submit">Đăng nhập</button>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </form>
      <div class="form-register">
        <p>Chưa có tài khoản?</p>
        <router-link to="register">Đăng ký</router-link>
      </div>
    </div>
  </div>
</template>
 
<style scoped>
 .LGF {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  margin: 0;
}

.login-container {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 300px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 28px; /* Tăng kích thước chữ để nổi bật hơn */
  font-weight: bold; /* Làm chữ đậm */
  color: #bebfc0; /* Thay đổi màu chữ để thu hút sự chú ý */
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.9); /* Thêm hiệu ứng đổ bóng để tạo chiều sâu */
}

.form-group {
  position: relative; /* Để sử dụng định vị tương đối cho các phần tử con */
  margin-bottom: 15px;
}

.icon-right {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #888;
}

.toggle-password {
  position: absolute;
  right: 10px; /* Đặt icon ở bên phải của ô nhập liệu */
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #888;
}

input[type="email"],
input[type="password"],
input[type="text"] {
  width: 100%;
  padding: 10px 35px; /* Thêm khoảng trống bên trái để tránh icon */
  border: 1px solid #ccc;
  border-radius: 5px;
  
}
input{
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2); /* Thêm hiệu ứng đổ bóng để tạo chiều sâu */
}

button {
  width: 100%;
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}

.error-message {
  color: red;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
}

.form-register p {
  text-align: center;
}

.form-register a {
  display: block;
  text-align: center;
  color: #007bff;
  cursor: pointer;
  text-decoration: none;
}

.form-register a:hover {
  text-decoration: underline;
}
</style>
