<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useAuthStore } from "@/stores/authStore/authStore";
 

const router = useRouter();
const authStore = useAuthStore();

const email = ref("admin@gmail.com");
const password = ref("12345");
const errorMessage = ref("");

const handleLogin = async () => {
  try {
    await authStore.Login(email.value, password.value);
    console.log(email.value, password.value);
  } catch (error) {
    console.log("Err", error);
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
          <label for="email">Email:</label>
          <input v-model="email" type="email" required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input
            v-model="password"
            type="password"
            id="password"
            name="password"
            required
          />
        </div>
        <button type="submit">Login</button>
        <!-- Hiển thị thông báo lỗi nếu có -->
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </form>
      <div class="form-register">
        <p>Do you have an account yet?</p>
        <!-- <router-link to="register">Register</router-link> -->
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
  height: 100vh;
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
}
.form-group {
  margin-bottom: 15px;
}
label {
  display: block;
  margin-bottom: 5px;
}
input[type="string"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
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
  /* display: flex; */
  cursor: pointer;
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
