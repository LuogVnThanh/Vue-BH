import axios from "axios";
import { defineStore } from "pinia";

export const useCategoryStore = defineStore("categoryStore", {
  state: () => ({
    categories: [],
  }),
  getters: {},
  actions: {
    async getAllCategories() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/cate/getall"
        );

        console.log("response: ", response);

        this.categories = response.data; // gắn dữ liệu vào cate
      } catch (error) {
        console.log("Có lỗi khi lấy dữ liệu cate", error);
      }
    },
  },
});
