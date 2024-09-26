import axiosInstance from "@/axios/axiosInstance";
import { defineStore } from "pinia";

export const useProductStore = defineStore("productStore", {
  state: () => ({
    products: [],
    selectedCategory: [],
    selectedProduct: {},
  }),
  getters: {},
  actions: {
    //getall
    async getAllProducts() {
      try {
        const response = await axiosInstance.get("/product/getall");

        this.products = response.data ;// gắn dữ liệu vào products
        console.log("response: ", response.data.images?.[0]);
      } catch (error) {
        console.error("Có lỗi khi lấy dữ liệu toàn bộ sản phẩm", error);
      }
    },

    //getproductbycate
    async getProductByCategory(id) {
      try {
        const response = await axiosInstance.get(`/product/getbyidcate/${id}`);
        this.selectedCategory = response.data; // gắn dữ liệu vào selectedCategory
        console.log("Object Selected:", this.selectedCategory);
      } catch (error) {
        console.error("Có lỗi khi lấy dữ liệu sản phẩm theo danh mục", error);
      }
    },

    //getproductbyid
    async getProductById(id){
      try{
        const response = await axiosInstance.get(`/product/getbyid/${id}`)
        this.selectedProduct= response.data.product ; // gắn dữ liệu vào selectedProductById
        console.log("object selectedProductbyId", this.selectedProduct);

      }catch(error){
        console.error("Có lỗi khi lấy dữ liệu sản phẩm theo id", error);
      }
     
    }



  },
});
