<script setup>
import { useProductStore } from "@/stores/productStore/productStore";
import { onMounted, reactive, ref } from "vue";
import { storeToRefs } from "pinia";
import { getProductImage } from "@/helpers/getImage"; // getProductImage
import { useCategoryStore } from "@/stores/categoryStore/categoryStore";
import { useCustomerStore } from "@/stores/customerStore/customerStore";
import { useRoleStore } from "@/stores/roleStore/roleStore"; //B2 Import
// Khởi tạo store
const productStore = useProductStore();
const categoryStore = useCategoryStore();
const customerStore = useCustomerStore();
const roleStore = useRoleStore(); //B1:Khởi tạo store

// Lấy dữ liệu từ store
const { categories } = storeToRefs(categoryStore);
const { products } = storeToRefs(productStore);
const { customers } = storeToRefs(customerStore);
const { roles } = storeToRefs(roleStore); // B3 StoretoRefs

// Show form--------------------------------------
const isShowManageProd = ref(false);
const isShowManageUser = ref(true);
const isShowManageRevenue = ref(false);

// Khởi tạo biến trạng thái cho modal
const isModalVisible = ref(false);
const isEditMode = ref(false); // Biến trạng thái để biết đang ở chế độ sửa hay thêm sản phẩm

// ===================Product================================
//Hàm Create product-------------------------------
const newProduct = ref({
  name: " ",
  image: "",
  description: " ",
  quantity: 0,
  price: 0,
  color: " ",
  cate_id: 0,
});

// Hàm xử lý khi người dùng chọn ảnh----------------
const selectedImage = ref(null);
const onImageSelected = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedImage.value = file;
  }
};

// --------------reset form--------------------------------
const Reset = () => {
  newProduct.value = {
    name: "",
    image: "",
    description: "",
    quantity: 1,
    price: 0,
    color: "",
    cate_id: 0,
  };
  selectedImage.value = null;
  isEditMode.value = false;
};

// Hàm  tạo và lưu sản phẩm-------------------------------------------
const saveProduct = async () => {
  await productStore.createProduct(newProduct.value, selectedImage.value);
  await productStore.getAllProducts();

  Reset(); // Reset form sau khi tạo thành công
};
// Hàm hiển thị thông tin sản phẩm cần sửa------------------
const editProduct = (prod) => {
  isEditMode.value = true;
  isModalVisible.value = false;
  newProduct.value = { ...prod };
};
// --------------Update-------------------------------------
const updateProduct = async () => {
  newProduct.value.selectedImage = selectedImage.value; // Thêm selectedImage vào newProduct
  await productStore.updateProduct(newProduct.value);
  await productStore.getAllProducts();
  isModalVisible.value = false;
  Reset(); // Reset form sau khi tạo thành công
};
// --------------Delete-------------------------------------

const handleDeleteProduct = async (id) => {
  const isConfirmed = confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");
  if (!isConfirmed) return;
  await productStore.deleteProduct(id);
  await productStore.getAllProducts();
};
// ====================User================================
// hàm resetCustomer
const resetCustomer = () => {
  newCustomer.value = {
    name: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    role_id: 0,
  
  };
  isShowEditCustomer.value = false;
};
//  tạo ra biến để ẩn hiện form
const isShowAddCustomer = ref(false);
const isShowEditCustomer = ref(false);

// tạo biến lưu trữ dữ liệu customer
const newCustomer = ref({
  name: " ",
  username: " ",
  email: "  ",
  phone: " ",
  password: " ",
  role_id: 0,
});
// Hàm tạo và lưu user
const saveCustomer = async () => {
  if (
    !newCustomer.value.name ||
    !newCustomer.value.email ||
    !newCustomer.value.role_id
  ) {
    alert("Vui lòng điền đầy đủ thông tin bắt buộc!"); // Kiểm tra dữ liệu đầu vào
    return;
  }

   // Kiểm tra mật khẩu phải có ít nhất 6 ký tự
     if (newCustomer.value.password.length < 6) {
    alert("Mật khẩu phải có ít nhất 6 ký tự!");
    return;
  }
  // Kiểm tra định dạng số điện thoại
  const phoneRegex = /^[0-9]{10}$/;
     if (!phoneRegex.test(newCustomer.value.phone)) {
    alert("Số điện thoại không đúng định dạng! Số điện thoại phải có 10 chữ số.");
    return;
  }
 
  try {
    console.log("Dữ liệu customer:", newCustomer.value);
    await customerStore.createCustomer(newCustomer.value);
    await customerStore.getAllCustomers();
    resetCustomer(); // Reset sau khi thành công
    isShowAddCustomer.value = false; // Đóng modal
  }catch (error) {
    console.log("Err", error);
    // Kiểm tra nếu lỗi là do email đã tồn tại
    alert("email đã tồn tại trong hệ thống")
  }
};

// Hàm format tiền tệ----------------------------------
const formatCurrency = (value) => {
  return `${parseInt(value).toLocaleString("vi-VN")} VND`;
};

// Lấy danh sách sản phẩm khi component được mounted
onMounted(() => {
  productStore.getAllProducts();
  customerStore.getAllCustomers();
  roleStore.getAllRoles(); // B1: Lấy danh sách quyền
});
</script>

<template>
  <div class="container">
    <!------------------------- Nav ------------------------>
    <nav class="navbar navbar-light bg-light">
      <form class="form-inline">
        <button
          class="btn btn-sm btn-outline-secondary"
          type="button"
          @click="
            isShowManageProd = true;
            isShowManageRevenue = false;
            isShowManageUser = false;
          "
        >
          Quản lý sản phẩm
        </button>
        <button
          class="btn btn-sm btn-outline-secondary"
          type="button"
          @click="
            isShowManageProd = false;
            isShowManageRevenue = false;
            isShowManageUser = true;
          "
        >
          Quản lý tài khoản
        </button>
        <button
          class="btn btn-sm btn-outline-secondary"
          type="button"
          @click="
            isShowManageProd = false;
            isShowManageRevenue = true;
            isShowManageUser = false;
          "
        >
          Quản lý doanh thu
        </button>
      </form>
    </nav>
    <!------------------- Quản lý người dùng ------------------------>
    <div v-if="isShowManageUser" class="management-user">
      <h4 style="text-align: center">Thông tin tất cả User</h4>
      <div class="d-inline-flex p-2 bd-highlight btncreate">
        <h5>Chức năng:</h5>
      </div>

      <!-- Nút để mở Modal -->
      <button
        type="button"
        class="btn btn-primary"
        @click="
          isShowAddCustomer = true;
          isShowEditCustomer = false;
          resetCustomer();
        "
      >
        Thêm Customer
      </button>
      <!-- Modal thêm/sửa Customer-->
      <div
        v-if="isShowAddCustomer"
        class="modal fade show"
        tabindex="-1"
        role="dialog"
        style="display: block"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">
                {{ isShowEditCustomer ? "Sửa Customer" : "Thêm Customer" }}
              </h5>
              <button
                style="border: none"
                class="close close-button"
                type="button"
                @click="
                  isShowAddCustomer = false;
                  resetCustomer();
                "
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div
                class="form-group"
                style="display: flex; justify-content: space-between"
              >
                <label for="CustomerName" style="margin-top: 8px">Tên</label>
                <input
                  v-model="newCustomer.name"
                  type="text"
                  class="form-control mb-3"
                  placeholder="Tên Customer"
                  style="width: 30%"
                />
                <label for="CustomerName" style="margin-top: 8px"
                  >UserName</label
                >
                <input
                  v-model="newCustomer.username"
                  type="text"
                  class="form-control mb-3"
                  placeholder="Tên Customer"
                  style="width: 30%"
                />
              </div>

              <div class="form-group">
                <label for="CustomerEmail">Email</label>
                <input
                  v-model="newCustomer.email"
                  type="email"
                  class="form-control mb-3"
                  placeholder="Email address"
                />
              </div>
              <div class="form-group">
                <label for="CustomerEmail">Mật khẩu</label>
                <input
                  v-model="newCustomer.password"
                  type="password"
                  class="form-control mb-3"
                  placeholder="Password"
                />
              </div>
              <div class="form-group">
                <label for="CustomerSDT" style="width: 90%">SĐT</label>
                <input
                  v-model="newCustomer.phone"
                  type="phone"
                  class="form-control mb-3"
                  placeholder="Phone number"
                />
              </div>

              <div class="form-group">
                <label for="customerRole">Loại Tài khoản</label>
                <select
                  v-model="newCustomer.role_id"
                  id="customerRole"
                  class="form-control mb-3"
                >
                  <option disabled value="0">Chọn loại Tài khoản</option>
                  <option v-for="role in roles" :key="role.id" :value="role.id">
                    {{ role.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                @click="
                  isShowAddCustomer = false;
                  resetCustomer();
                "
              >
                Đóng
              </button>
              <button
                type="button"
                class="btn btn-success"
                @click="isShowEditCustomer ? updateCustomer() : saveCustomer()"
              >
                {{ isShowEditCustomer ? "Cập nhật" : "Lưu người dùng" }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <table class="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Email</th>
            <th>SĐT</th>
            <th>Loại</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          <!-- Nội dung người dùng sẽ được điền vào đây sau -->
          <tr v-for="cus in customers" :key="cus.id">
            <td>{{ cus.id }}</td>
            <td>{{ cus.name }}</td>
            <td>{{ cus.email }}</td>
            <td>{{ cus.phone || "NULL" }}</td>
            <td>{{ cus.role?.name }}</td>
            <td style="text-align:center">
              <a href="" v-if="cus.status === 'enable'" class="icon-lock">
                <i class="fa-solid fa-lock-open"></i>
              </a>
              <a href="" v-else class="icon-lock-closed">
                <i class="fa-solid fa-lock"></i>
              </a>
            </td>
            <td class="btnCus">
              <button class="btn btn-primary">Sửa</button>
              <button class="btn btn-danger">Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-------------------------- Quản lý sản phẩm ------------------------>
    <div v-if="isShowManageProd" class="management-product">
      <h4 style="text-align: center">Thông tin tất cả sản phẩm</h4>
      <div class="d-inline-flex p-2 bd-highlight">
        <h5>Chức năng:</h5>
      </div>

      <!-- Nút để mở Modal -->
      <button
        type="button"
        class="btn btn-primary"
        @click="
          isModalVisible = true;
          isEditMode = false;
          Reset();
        "
      >
        Thêm sản phẩm
      </button>

      <!-- Modal thêm/sửa sản phẩm -->
      <div
        v-if="isModalVisible"
        class="modal fade show"
        tabindex="-1"
        role="dialog"
        style="display: block"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">
                {{ isEditMode ? "Sửa sản phẩm" : "Thêm sản phẩm" }}
              </h5>
              <button
                style="border: none"
                class="close close-button"
                type="button"
                @click="
                  isModalVisible = false;
                  Reset();
                "
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label for="productName">Tên sản phẩm</label>
                <input
                  v-model="newProduct.name"
                  type="text"
                  class="form-control mb-3"
                  placeholder="Tên sản phẩm"
                />
              </div>
              <div class="form-group">
                <label for="productDescription">Mô tả sản phẩm</label>
                <input
                  v-model="newProduct.description"
                  type="text"
                  class="form-control mb-3"
                  placeholder="Mô tả sản phẩm"
                />
              </div>
              <div class="form-group sl-price">
                <label for="productQuantity" style="width: 70%">Số lượng</label>
                <input
                  v-model="newProduct.quantity"
                  type="number"
                  class="form-control mb-3"
                  min="1"
                  style="width: 100px"
                />
                <label for="productPrice" style="width: 30%; margin-left: 50px"
                  >Giá</label
                >
                <input
                  v-model="newProduct.price"
                  type="text"
                  class="form-control mb-3"
                  placeholder="Giá sản phẩm"
                  min="0"
                />
              </div>

              <div class="form-group">
                <label for="productColor">Màu sắc</label>
                <input
                  v-model="newProduct.color"
                  type="text"
                  class="form-control mb-3"
                  placeholder="Màu sản phẩm"
                />
              </div>
              <div class="form-group">
                <label for="productCategory">Loại sản phẩm</label>
                <select
                  v-model="newProduct.cate_id"
                  id="productCategory"
                  class="form-control mb-3"
                >
                  <option disabled value="0">Chọn loại sản phẩm</option>
                  <option
                    v-for="category in categories"
                    :key="category.id"
                    :value="category.id"
                  >
                    {{ category.name }}
                  </option>
                </select>
              </div>
              <div class="form-group">
                <label for="productImage">Ảnh sản phẩm</label>
                <input
                  type="file"
                  @change="onImageSelected"
                  class="form-control mb-3"
                />
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                @click="
                  isModalVisible = false;
                  Reset();
                "
              >
                Đóng
              </button>
              <button
                type="button"
                class="btn btn-success"
                @click="isEditMode ? updateProduct() : saveProduct()"
              >
                {{ isEditMode ? "Cập nhật" : "Lưu sản phẩm" }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Danh sách sản phẩm -->
      <table class="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Ảnh</th>
            <th>Mô tả</th>
            <th>SL</th>
            <th>Giá</th>
            <th>Màu</th>
            <th>Loại</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="prod in products" :key="prod.id">
            <td>{{ prod.id }}</td>
            <td>{{ prod.name }}</td>
            <td>
              <img
                :src="getProductImage(prod.images?.[0].image)"
                alt="Ảnh sản phẩm"
                style="width: 50px; height: 50px"
              />
            </td>
            <td>{{ prod.description }}</td>
            <td>{{ prod.quantity }}</td>
            <td>{{ formatCurrency(prod.price) }}</td>
            <td>{{ prod.color }}</td>
            <td>{{ prod.category?.name || "Không có loại sản phẩm" }}</td>
            <td class="btntd">
              <button
                class="btn btn-primary"
                @click="
                  editProduct(prod);
                  isModalVisible = true;
                "
              >
                Sửa
              </button>
              <button
                class="btn btn-danger"
                @click="handleDeleteProduct(prod.id)"
              >
                Xóa
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
/* Bạn có thể thêm CSS để điều chỉnh giao diện nếu cần */
.container {
  padding: 20px;
}
.table img {
  width: 50px;
  height: 50px;
  object-fit: cover;
}
.btn {
  margin: 0 5px;
}
.container h4 {
  margin-top: 80px;
  margin-bottom: 50px;
  text-transform: uppercase;
}
.btntd {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 25px;
}
.btncreate {
  align-items: center;
}
.add-product-form input {
  margin-right: 10px;
  margin-bottom: 10px;
}
.add-product-form select {
  padding: 2px;
  margin-right: 5px;
}
.close-button {
  transition: background-color 0.3s; /* Thêm hiệu ứng chuyển đổi */
}

.close-button:hover {
  background-color: red; /* Màu nền khi hover */
  color: white; /* Đổi màu chữ cho dễ nhìn */
  border: none;
}
.modal-title {
  text-transform: uppercase;
  text-align: center;
}
.sl-price {
  display: flex;
}
.icon-lock {
  font-size: 24px; /* Kích thước của icon */
  color: #007bff; /* Màu sắc của icon khi trạng thái 'enable' */
  transition: color 0.3s; /* Hiệu ứng chuyển màu */
}

.icon-lock:hover {
  color: #0056b3; /* Màu sắc khi hover */
}

.icon-lock-closed {
  font-size: 24px; /* Kích thước của icon */
  color: #dc3545; /* Màu sắc của icon khi trạng thái 'disable' */
  transition: color 0.3s; /* Hiệu ứng chuyển màu */
}

.icon-lock-closed:hover {
  color: #c82333; /* Màu sắc khi hover */
}
</style>
