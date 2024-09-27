import axiosInstance from "@/axios/axiosInstance";
import { defineStore } from "pinia";

export const useCartStore = defineStore("cartStore", {
  state: () => {
    return {
      cartItems: [], // Mảng chứa các sản phẩm trong giỏ
    };
  },
  getters: {
    totalItems(state) {
      return state.cartItems.reduce((sum, item) => sum + item.quantity, 0);
    },
    totalPrice(state) {
      return state.cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity * 0.7,
        0
      );
    },
  },
  actions: {
    // lay list item sau khi add
    async getCartItems() {
      let cartItems = JSON.parse(localStorage.getItem("cartItems"));
      if (!cartItems) {
        cartItems = [];
      }
      this.cartItems = cartItems;
    },
    // add
    addToCart(product, quantity) {
      const existingItem = this.cartItems.find((item) => item.id == product.id);
      if (existingItem) {
        existingItem.quantity += quantity; // nếu có sản phẩm trong giỏ hàng, cộng số lượng
        localStorage.setItem("cartItems", JSON.stringify(existingItem));
      } else {
        this.cartItems.push({ ...product, quantity }); // Nếu chưa có trong giỏ hàng, thêm sản phẩm vào giỏ hàng
        localStorage.setItem("cartItems", JSON.stringify(this.cartItems)); // Thêm sản phẩm cart vào LocalSrorage
      }
    },
    // sau khi thanh toán
    clearCart() {
      this.cartItems = []; // Xóa tất cả sản phẩm trong gi�� hàng
      localStorage.setItem("cartItems", JSON.stringify(this.cartItems)); // Cập nhật lại LocalStorage
    },

    // Remove
    removeItem(id) {
      this.cartItems = this.cartItems.filter((item) => item.id !== id);
      // Cập nhật lại LocalStorage sau khi xóa sản phẩm
      localStorage.setItem("cartItems", JSON.stringify(this.cartItems));

      console.log("object", this.cartItems);
      alert("Xóa sản phẩm thành công");
    },
  },
});
