<template>
  <div class="container">
    <!-- title -->
    <p class="title" style="  background-color: #bdbdbd;
  font-size: 24px;
  padding: 10px;">Thông tin giỏ hàng của bạn</p>
    <div class="row">
      <div class="col-12 mb-2">
        <!-- Freeship title -->
        <div
          class="border border-danger rounded mb-2 text-danger"
          style="padding: 0 10px"
        >
          Miễn phí vận chuyển với đơn hàng từ 300K.
        </div>

        <!-- Start Cart -->
      </div>
      <!-- Chi tiết đơn hàng -->
      <!-- 
        max-height: 400px;: Đặt chiều cao tối đa của vùng cuộn. Bạn có thể thay đổi giá trị 400px theo nhu cầu của bạn.
        overflow-y: auto;: Thiết lập thanh cuộn dọc (scroll bar) tự động xuất hiện khi nội dung vượt quá chiều cao của div.
        width: 100%: Đảm bảo bảng chiếm toàn bộ chiều rộng của div bọc bên ngoài. -->
      <div
        class="col-sm-12 col-md-6"
        style="max-height: 400px; overflow-y: auto"
      >
        <h4 style="text-transform: uppercase">Chi tiết đơn hàng</h4>
        <!-- Danh sách hàng -->
        <h6>Có tổng {{ totalItems }} sản phẩm:</h6>
        <table class="table" style="color: #111; width: 100%">
          <tbody>
            <!-- Sản phẩm 1 -->
            <tr v-for=" cartItem in cartItems" :key="cartItem.id">
              <td style="width: 100px; ">
                <!-- Ảnh sản phẩm 1 -->
                <img
                  class="img-fluid" style="height:100px;width: 100px;"
                  :src="getProductImage(cartItem.images?.[0].image)"
                  alt="Product 1"  
                />
                <!-- Nút xóa sản phẩm 1 -->
                <div>
                  <a href="#" style="color: #000; text-decoration: none" @click="removeItem(cartItem.id)">
                    <i class="bi bi-trash3" style="padding: 5px"></i>Xóa
                  </a>
                </div>
              </td>
              <!-- style="padding-left: 0; padding-right: 0" -->
              <td >
                <p class="mb-1">
                  <a
                    href="#"
                    style="font-size: 20px; color: #000; text-decoration: none"
                  >
                    {{ cartItem.description }}
                  </a>
                </p>
                <p class="mb-0">
                  <span>Số lượng:{{ cartItem.quantity }} <b></b></span> *
                  <span class="text-black">{{ formatCurrency(cartItem.price*0.7) }}</span>
                </p>
                <p class="mb-0"><b>= {{ formatCurrency(cartItem.price*0.7* cartItem.quantity) }}</b></p>
              </td>
            </tr>


            <!--   giao hàng -->
            <tr>
              <td class="text-right" style="padding-left: 0; padding-right: 0">
                Giao hàng:
              </td>
              <td>
                <div v-if="isFreeShipping" style="font-size: 16px; color: #28a745">Miễn phí (-19,000đ)</div>
                <div v-else style="font-size: 16px; color: #f00">19,000 đ</div>
                <div style="font-size: 16px; color: #111">
                  * Miễn phí với đơn hàng từ <b>300,000 đ</b>.
                </div>
              </td>
            </tr>

            <!--   tổng tiền -->
            <tr>
              <td class="text-right" style="padding-left: 0; padding-right: 0">
                Tổng cộng:
              </td>
              <td>
                <div id="grandTotal" style="font-size: 20px; color: #f00;  ">
                  <b>{{ formatCurrency(grandTotal) }} </b>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Chi tiết người mua, nhận -->
      <div class="col-sm-12 col-md-6">
        <!-- title -->
        <h4 style="text-transform: uppercase">Người mua/nhận hàng</h4>
        <form id="formPlaceOrder" action=" ">
          <!-- Tên -->
          <div class="form-group">
            <label style="margin-bottom: 10px">Tên</label>
            <input
              type="text"
              class="required form-control"
              id=""
              name=""
              placeholder="Tên người nhận"
            />
          </div>

          <!-- SDT -->
          <div class="form-group" style="margin-top: 20px">
            <label style="margin-bottom: 10px">Điện thoại liên lạc</label>
            <input
              type="text"
              class="required form-control"
              id=" "
              name=" "
              placeholder="Số điện thoại"
            />
            <input type="hidden" name=" " value="" id=" " />
          </div>

          <!-- Nơi nhận -->
          <div>
            <div class="radio" style="margin-top: 20px">
              <label style="margin-bottom: 10px">
                <input type="radio" name=" " checked=" " value=" " /> Nhận hàng
                tại nhà/công ty/bưu điện
              </label>
            </div>
          </div>
          <!-- Địa chỉ -->
          <div class="form-group" id=" ">
            <input
              type="text"
              class="required form-control"
              id=" "
              name=" "
              placeholder="Địa chỉ nhận hàng"
            />
          </div>

          <!-- Ghi chú -->
          <div class="form-group" style="margin-top: 20px; margin-bottom: 20px">
            <label style="margin-bottom: 10px">Ghi chú</label>
            <textarea
              rows="2"
              class="form-control"
              id="txtNote"
              name="txtNote"
            ></textarea>
          </div>

          <!-- Form đặt hàng -->
        </form>
        <button class="btn btn-info fw" style="width: 100%">Đặt hàng</button>
        <hr />
        <a href="/" class="btn btn-warning fw" style="width: 100%">
          Cần sản phẩm khác? Chọn thêm...
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from "@/stores/cartStore/cartStore";
import { storeToRefs } from "pinia";
import { getProductImage } from "@/helpers/getImage"; // Import hàm getProductImage
import { computed,onMounted,ref } from "vue";



const cartStore = useCartStore();
const {cartItems, totalPrice,totalItems} = storeToRefs(cartStore)

  //Đổi dạng tiền
  const formatCurrency = (value) => {
  return `${parseInt(value).toLocaleString("vi-VN")} VND`;
};


//Nút xóa
const removeItem =(id)=>{
  cartStore.removeItem(id)
  console.log("object,id",id);
}

//Kiểm tra xem nếu tổng lớn hơn 300.000k
const isFreeShipping= computed(()=>{
  return totalPrice.value > 300000
})
//Tính tổng tiền với phí giao hàng
const shippingFee = computed(()=>{
  return isFreeShipping.value? 0 : 19000

})  
const grandTotal = computed(()=>{
  return totalPrice.value +  shippingFee.value
})

//lấy thông tin người nhận

onMounted(()=>{
   cartStore.loadCartFromLocalStorage()
})
</script>

 
