import axiosInstance from "@/axios/axiosInstance";
import { defineStore } from "pinia";

export const useProductStore = defineStore("productStore", {
  state: () => ({
    products: [],
    searchResults: [],
    selectedCategory: [],
    selectedProduct: {},
    currentPage:1,
    totalPage:0
  }),
  getters: {},
  actions: {
    //getall============================================================
    async getAllProducts() {
      try {
        const response = await axiosInstance.get("/product/getall");

        this.products = response.data; // gắn dữ liệu vào products
        console.log("response: ", response.data);
      } catch (error) {
        console.error("Có lỗi khi lấy dữ liệu toàn bộ sản phẩm", error);
      }
    },

    //getproductbycate=================================================
    async getProductByCategory(id) {
      try {
        const response = await axiosInstance.get(`/product/getbyidcate/${id}`);
        this.selectedCategory = response.data; // gắn dữ liệu vào selectedCategory
        console.log("Object Selected:", this.selectedCategory);
      } catch (error) {
        console.error("Có lỗi khi lấy dữ liệu sản phẩm theo danh mục", error);
      }
    },

    //getproductbyid==============================================
    async getProductById(id) {
      try {
        const response = await axiosInstance.get(`/product/getbyid/${id}`);
        this.selectedProduct = response.data.product; // gắn dữ liệu vào selectedProductById
        console.log("object selectedProductbyId", this.selectedProduct);
      } catch (error) {
        console.error("Có lỗi khi lấy dữ liệu sản phẩm theo id", error);
      }
    },
    //create product==============================================
    async createProduct(newProduct, selectedImage) {
      try {
        const formData = new FormData();
        formData.append("name", newProduct.name);
        formData.append("description", newProduct.description);
        formData.append("quantity", newProduct.quantity);
        formData.append("price", newProduct.price);
        formData.append("color", newProduct.color);
        formData.append("cate_id", newProduct.cate_id);

        if (selectedImage) {
          formData.append("image", selectedImage);
        }
        //Gữi yêu cầu qua Api
        const response = await axiosInstance.post("/product/create", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        this.products.push(response.data);
        alert("Đã thêm sản phẩm mới");
        console.log("Sản phẩm mới đã được tạo thành công:", response.data);
      } catch (error) {
        console.log("Error", error);
      }
    },
    //update product==============================================
    async updateProduct(newProduct) {
      try {
        const formData = new FormData();
        formData.append("name", newProduct.name);
        formData.append("description", newProduct.description);
        formData.append("quantity", newProduct.quantity);
        formData.append("price", newProduct.price);
        formData.append("color", newProduct.color);
        formData.append("cate_id", newProduct.cate_id);
       // Sử dụng selectedImage từ updatedProduct
    if (newProduct.selectedImage) {
      formData.append("image", newProduct.selectedImage);
    } else if (newProduct.image) {
      formData.append("image", newProduct.image); // Sử dụng ảnh cũ
    }
        // Gửi yêu cầu PUT qua API để cập nhật sản phẩm
        const response = await axiosInstance.put(
          `/product/update/${newProduct.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Response từ server:", response.data); // Thêm dòng này

        //Tìm sản phẩm trong state products và cập nhật
        const index = this.products.findIndex(
          (product) => product.id === newProduct.id
        );
        if (index !== -1) {
          this.products[index] = response.data;
        }
          // Kiểm tra xem sản phẩm đã được cập nhật hay chưa
  console.log("Dữ liệu sản phẩm sau khi cập nhật:", this.products[index]);

    alert("Sản phẩm đã được cập nhật thành công");
    console.log('Sản phẩm đã được cập nhật:', response.data);
      } catch (error) {
        console.log("Có lỗi khi chỉnh sửa sản phẩm", error);
      }
    },
    //delete product==============================================
    async deleteProduct(id){
      try{
        const response = await axiosInstance.delete(`/product/remove/${id}`)
        alert("Đã xóa sản phẩm thành công")
 

      }catch(error){
        console.log("Có lỗi khi xóa sản phẩm", error);
      }
    },
    //phân trang product==============================================
    async getProductsByPage(page) {
      try {
        const response = await axiosInstance.get(`/product/paginate/3?page=${page}`);
        this.products = response.data.data; // gắn dữ liệu và o products
        
        this.totalPage = response.data.last_page; // Cập nhật totalPage
        this.currentPage = response.data.current_page; // Cập nhật trang hiện tại
        // console.log("response: ", response.data);
        // console.log("Total pages set to:", this.totalPage);

      } catch (error) {
        console.error("Có lỗi khi lấy dữ liệu phân trang sản phẩm", error);
      }
    },
    // Reset về trang 1
     async resetProductPage() {
      try {
        this.currentPage = 1;
        await this.getProductsByPage(this.currentPage);
      } catch (error) {
        console.error("Có l��i khi reset trang sản phẩm", error);
      }
    },
    //tìm kiếm sản phẩm==============================================
    async searchProduct(keyword) {
      try {
        const response = await axiosInstance.get(`/product/search?search=${keyword}`);
        this.searchResults = response.data; // gắn dữ liệu vào searchProducts
        console.log("response: ", response.data);
      } catch (error) {
        console.log("Lỗi khi tìm kiếm",error)
        }
   },
 

  }
});
