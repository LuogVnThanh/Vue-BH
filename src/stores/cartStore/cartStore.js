import axiosInstance from "@/axios/axiosInstance";
import { defineStore } from "pinia";

export const useCartStore = defineStore("cartStore", {
  state: () => {
    return {
      // Sử dụng localstorage thì phải GetItem để lấy dữ liệu
      products: JSON.parse(localStorage.getItem("products")) || [], // Mảng chứa các sản phẩm trong giỏ
      cartProduct: [],
      isLoggedIn: false,
    };
  },
  getters: {
    totalItems(state) {
      return state.products.reduce((sum, item) => sum + item.quantity, 0);
    },
    totalPrice(state) {
      return state.products.reduce(
        (sum, item) => sum + item.price * item.quantity * 0.7,
        0
      );
    },
  },
  actions: {
    setLoggedIn(status) {
      this.isLoggedIn = status;
      if (status) {
        this.createCart();
      } else {
        this.loadCartFromLocalStorage();
      }
    },

    //Kiểm tra đăng nhập xem chọn nơi lấy sản phẩm
    initializeCart() {
      if (this.isLoggedIn) {
        this.fetchCartFromServer();
      } else {
        this.loadCartFromLocalStorage();
      }
    },
    // Khi chưa đăng nhập
    loadCartFromLocalStorage() {
      this.products = JSON.parse(localStorage.getItem("products")) || [];
    },
    //Luu sản phẩm vào local
    saveToLocalStorage() {
      localStorage.setItem("products", JSON.stringify(this.products));
    },
    // Khi đã đăng nhập
    async fetchCartFromServer() {
      try {
        const response = await axiosInstance.get("/cartinfor/create");
        this.cartProduct = response.data;
      } catch (error) {
        console.log("Có lỗi khi lấy sản phẩm", error);
      }
    },

    // Khi đăng nhập tạo ra 1 mảng
    async createCart() {
      try {
        // Lấy sản phẩm từ localStorage
        const products = JSON.parse(localStorage.getItem("products")) || [];
        // console.log("Sản phẩm trong localStorage:", products); // Kiểm tra sản phẩm
        //  Nếu mảng rỗng
         if (products.length === 0) {
          const response = await axiosInstance.post("/cartinfor/create", {products:[]} );
          this.cartProduct = response.data; // Cập nhật giỏ hàng sau khi tạo
          console.log("Giỏ hàng trống đã được tạo.");
         }

        //  Nếu mảng khác rỗng
         else  {
          // Định dạng lại dữ liệu nếu cần thiết
          const productList = products.map((item) => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
          }));
          // Gửi sản phẩm từ localStorage lên server khi tạo giỏ hàng
          const response = await axiosInstance.post("/cartinfor/create",{products: productList} );

          if (response.status === 201) {
            this.cartProduct = response.data;  // Cập nhật giỏ hàng sau khi thêm
            this.products = [];  // Xóa giỏ hàng local sau khi đồng bộ
    
            // Xóa dữ liệu trong localStorage sau khi đã chuyển thành công
            localStorage.removeItem("products");
            console.log("Dữ liệu đã được chuyển và localStorage đã được xóa.");
          } else {
            console.log("Không có sản phẩm trong localStorage.");
          }
 
        } 
      } catch (error) {
        console.log("Error", error);
      }
    },

    //  kiểm tra đăng nhập
    addToCart(product, quantity) {
      if (this.isLoggedIn) {
        this.addToServerCart(product, quantity);
      } else {
        this.addToLocalCart(product, quantity);
      }
    },

    // Nếu chưa đăng nhập
    addToLocalCart(product, quantity) {
      const existingItem = this.products.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.products.push({ ...product, quantity });
      }
      this.saveToLocalStorage();
      console.log("Đã thêm sản phẩm vào giỏ hàng local:", this.products);
    },
    // Nếu đã đăng nhập
    async addToServerCart(product, quantity) {
      try {
        await axiosInstance.post("/cartinfor/create", { product, quantity });
        await this.fetchCartFromServer();
      } catch (error) {
        console.error("Lỗi khi thêm sản phẩm vào giỏ hàng server:", error);
      }
    },

    // add
    // addToCart(product, quantity) {
    //   const existingItem = this.products.findIndex(
    //     (item) => item.id === product.id
    //   );
    //   if (existingItem !== -1) {
    //     // Cập nhật số lượng nếu sản phẩm đã có trong giỏ hàng
    //     this.products[existingItem].quantity += quantity;
    //   } else {
    //     // Thêm sản phẩm mới vào giỏ hàng
    //     this.products.push({ ...product, quantity });
    //   }
    //   console.log("Giỏ hàng sau khi thêm:", this.products); // Thêm log để xem giỏ hàng
    //   localStorage.setItem("products", JSON.stringify(this.products)); // Thêm sản phẩm cart vào LocalSrorage
    // },

    // Remove--------------------------------------------------------
    removeItem(id) {
      if (this.isLoggedIn) {
        this.removeServerItem(id);
      } else {
        this.removeLocalItem(id);
      }
    },

    // Xóa trên local
    removeLocalItem(id) {
      this.products = this.products.filter((item) => item.id !== id);
      this.saveToLocalStorage();
      console.log("Đã xóa sản phẩm khỏi giỏ hàng local");
    },
    // Xóa trên  Store
    async removeServerItem(id) {
      try {
        await axiosInstance.delete(`/cartinfor/remove/${id}`);
        await this.fetchCartFromServer();
      } catch (error) {
        console.error("Lỗi khi xóa sản phẩm khỏi giỏ hàng server:", error);
      }
    },
    // sau khi thanh toán
    clearCart() {
      if (this.isLoggedIn) {
        this.clearServerCart();
      } else {
        this.clearLocalCart();
      }
    },

    clearLocalCart() {
      this.products = [];
      localStorage.removeItem("products");
    },

    async clearServerCart() {
      try {
        await axiosInstance.delete("/cartinfor/clear");
        this.cartProduct = [];
      } catch (error) {
        console.error("Lỗi khi xóa giỏ hàng trên server:", error);
      }
    },
  },
});
