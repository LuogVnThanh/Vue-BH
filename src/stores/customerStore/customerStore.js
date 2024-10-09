import { defineStore } from "pinia";
import axiosInstance from "@/axios/axiosInstance";

2;
export const useCustomerStore = defineStore("customerStore", {
  state: () => ({
    customers: [],
  }),
  getters: {},
  actions: {
    //==========function getall user================================
    async getAllCustomers() {
      try {
        const response = await axiosInstance.get("/customer/getall");
        this.customers = response.data;
        // console.log(error.response.data)
      } catch (error) {
        console.log(" Có lỗi khi Lấy thông tin customers", error);
      }
    },
    //==========function create user================================
    async createCustomer(newCustomer) {
      try {
        // bạn sử dụng multipart/form-data để gửi thông tin người dùng, tuy nhiên không có trường nào là file (ảnh, tài liệu). Nếu không cần upload file, bạn có thể thử gửi dữ liệu với content-type mặc định (application/json)
        const response = await axiosInstance.post("/customer/create", {
          name: newCustomer.name,
          username: newCustomer.username,
          email: newCustomer.email,
          password: newCustomer.password,
          phone: newCustomer.phone,
          role_id: newCustomer.role_id,
        });
        this.customers.push(response.data);
        console.log("Customer đã được tạo thành công", response.data);
        alert("Tạo thành công");
      } catch (error) {
        console.log("Có lỗi khi tạo customer", error.response.data);
        alert("Email đã tồn tại");
      }
    },
    //==========function edit user================================
    // async updateCustomer(newCustomer){
    //   const response = await axiosInstance.put(``)
    // }
    //==========function create user================================

  },
});
