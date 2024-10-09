import { defineStore } from "pinia";
import router from "@/router";
import axiosInstance from "@/axios/axiosInstance";
import { jwtDecode } from "jwt-decode";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    customer: null,
    access_token: null,
    refreshToken: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.access_token,
    isAdmin: (state) => state.customer?.role_id === 1,
    isUser: (state) => state.customer?.role_id === 2,
  },
  actions: {
    // Gọi hàm restoreSession trong khởi tạo
    constructor() {
      this.restoreSession();
    },

    //===========function login===================
    async Login(email, password) {
      try {
        const response = await axiosInstance.post("/auth/login", {
          email: email,
          password: password,
        });

        // Kiểm tra cấu trúc của response.data
        // console.log("Response Data:", response.data);

        this.access_token = response.data.access_token;

        // Đảm bảo bạn truy cập đúng token từ response
        if (response.status === 200 && response.data.access_token) {
          this.access_token = response.data.access_token;
          // Lưu access_token và thông tin customer vào localStorage
          localStorage.setItem("access_token", this.access_token);

          //Decode JWT để lấy thông tin `sub`
          const decodedToken = jwtDecode(response.data.access_token);
          // console.log("objectdecodetoken", decodedToken);
          const customerInfo = await this.GetProfile();
          // console.log("objectinfo", customerInfo);
          this.customer = customerInfo;
          localStorage.setItem("customer", JSON.stringify(this.customer)); // Lưu thông tin customer vào localStorage


          // Điều hướng về trang Home sau khi đăng nhập thành công
          router.push({ name: "Home" });
          // alert("Đăng nhập thành công");
        } else {
          console.error("Error: access_token not found or invalid response");
        }
      } catch (error) {
        console.error("Lỗi khi đăng nhập", error);
      }
    },

    //===========function register================
    async Register(name,email,password){
      try{
        const response = await axiosInstance.post("/auth/register", {
          name: name,
          email: email,
          password: password,
        });
        if (response.status === 201) {
          router.push({ name: "Login" });
          alert("Đăng ký thành công");

          return { success: true };
        } else {
          console.log('status: ' + response.status);
          return { success: false, error: "Đăng ký thất bại" };
        }
        // this.Login(email, password);
 

      } catch (error) {
        console.error("Chi tiết lỗi:", error.response ? error.response.data : error.message);
        if (error.response && error.response.status === 500) {
          throw new Error('Email đã tồn tại.');
        } 
        // else if (error.response && error.response.status === 500) {
        //   throw new Error('Có lỗi xảy ra từ phía server.');
        // }
         else {
          throw new Error(error.response?.data?.message || 'Đăng ký thất bại.');
        }
      }
      
    },

    //========functon getProfile==================
    async GetProfile() {
      try {
        const response = await axiosInstance.get("/auth/profile");
        return response.data;
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng", error);
      }
    },

    //=============function logout================
    async Logout() {
      localStorage.removeItem("access_token", this.access_token);
      localStorage.removeItem('cartItems',)
      localStorage.removeItem("customer", this.customer); // Xóa thông tin khách hàng
      this.access_token = null;
      this.customer = null;
      router.push({ name: "Login" });
    },

    async HandleProfile() {
      // Kiểm tra nếu đã đăng nhập
      // Điều hướng đến trang Profile hoặc Login dựa trên trạng thái xác thực
      const routeName =this.access_token && this.customer ? "Profile" : "Login";
      router.push({ name: routeName });
    },


    //==========function refesh trang================================
    restoreSession() {
      try {
        const access_token = localStorage.getItem("access_token");
        const customer = JSON.parse(localStorage.getItem("customer")); // Khôi phục customer từ localStorage
 
        if (access_token && customer) {
          this.access_token = access_token;
          this.customer = customer; // Cập nhật thông tin khách hàng
        } else {
          this.access_token = null;
          this.customer = null; // Đặt customer về null nếu không có access_token
        }
      } catch (error) {
        console.error("Lỗi khi tải lại session", error);
        // Nếu có lỗi khi phân tích cú pháp JSON, bạn có thể xử lý ở đây
        this.access_token = null;
        this.customer = null;
      }
    },
  },
});
