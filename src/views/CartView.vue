<template>
  <div class="container">
    <!-- title -->
    <p class="title">Thông tin giỏ hàng của bạn</p>
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
        <h6>Có tổng 2 sản phẩm:</h6>
        <table class="table" style="color: #111; width: 100%">
          <tbody>
            <!-- Sản phẩm 1 -->
            <tr>
              <td style="width: 100px; padding-left: 0; padding-right: 0">
                <!-- Ảnh sản phẩm 1 -->
                <img
                  class="img-fluid"
                  src="https://cdn2.yame.vn/pimg/cart-thumb/8e5304f3-11d1-3300-b16a-001b810e8341.jpg?w=70&amp;h=100&amp;c=true"
                  alt="Product 1"
                />
                <!-- Nút xóa sản phẩm 1 -->
                <div>
                  <a href="#" style="color: #000; text-decoration: none">
                    <i class="bi bi-trash3" style="padding: 5px"></i>Xóa
                  </a>
                </div>
              </td>
              <td style="padding-left: 0; padding-right: 0">
                <p class="mb-1">
                  <a
                    href="#"
                    style="font-size: 14px; color: #000; text-decoration: none"
                  >
                    Áo Thun Cổ Tròn Tay Ngắn Sợi Nhân Tạo Co Giãn Biểu Tượng
                    Dáng Vừa Giá Tốt Seventy Seven 41 Vol 24 - Xám, S
                  </a>
                </p>
                <p class="mb-0">
                  <span>Số lượng: <b>1</b></span> *
                  <span class="text-black">177,000 đ</span>
                </p>
                <p class="mb-0"><b>= 177,000 đ</b></p>
              </td>
            </tr>

            <!-- Sản phẩm 2 -->
            <tr>
              <td style="width: 100px; padding-left: 0; padding-right: 0">
                <!-- Ảnh sản phẩm 2 -->
                <img
                  class="img-fluid"
                  src="https://cdn2.yame.vn/pimg/cart-thumb/8e5304f3-11d1-3300-b16a-001b810e8341.jpg?w=70&amp;h=100&amp;c=true"
                  alt="Product 2"
                />
                <!-- Nút xóa sản phẩm 2 -->
                <div>
                  <a href="#" style="color: #000; text-decoration: none">
                    <i class="bi bi-trash3" style="padding: 5px"></i>Xóa
                  </a>
                </div>
              </td>
              <td style="padding-left: 0; padding-right: 0">
                <p class="mb-1">
                  <a
                    href="#"
                    style="font-size: 14px; color: #000; text-decoration: none"
                  >
                    Áo Polo Cotton Nam Thoáng Mát Phối Chỉ Tinh Tế - Xanh, M
                  </a>
                </p>
                <p class="mb-0">
                  <span>Số lượng: <b>1</b></span> *
                  <span class="text-black">230,000 đ</span>
                </p>
                <p class="mb-0"><b>= 230,000 đ</b></p>
              </td>
            </tr>
            <!-- Sản phẩm 3  -->
            <tr>
              <td style="width: 100px; padding-left: 0; padding-right: 0">
                <!-- Ảnh sản phẩm 2 -->
                <img
                  class="img-fluid"
                  src="https://cdn2.yame.vn/pimg/cart-thumb/8e5304f3-11d1-3300-b16a-001b810e8341.jpg?w=70&amp;h=100&amp;c=true"
                  alt="Product 2"
                />
                <!-- Nút xóa sản phẩm 2 -->
                <div>
                  <a href="#" style="color: #000; text-decoration: none">
                    <i class="bi bi-trash3" style="padding: 5px"></i>Xóa
                  </a>
                </div>
              </td>
              <td style="padding-left: 0; padding-right: 0">
                <p class="mb-1">
                  <a
                    href="#"
                    style="font-size: 14px; color: #000; text-decoration: none"
                  >
                    Áo Polo Cotton Nam Thoáng Mát Phối Chỉ Tinh Tế - Xanh, M
                  </a>
                </p>
                <p class="mb-0">
                  <span>Số lượng: <b>1</b></span> *
                  <span class="text-black">230,000 đ</span>
                </p>
                <p class="mb-0"><b>= 230,000 đ</b></p>
              </td>
            </tr>
            <!-- Sản phẩm 4  -->
            <tr>
              <td style="width: 100px; padding-left: 0; padding-right: 0">
                <!-- Ảnh sản phẩm 2 -->
                <img
                  class="img-fluid"
                  src="https://cdn2.yame.vn/pimg/cart-thumb/8e5304f3-11d1-3300-b16a-001b810e8341.jpg?w=70&amp;h=100&amp;c=true"
                  alt="Product 2"
                />
                <!-- Nút xóa sản phẩm 2 -->
                <div>
                  <a href="#" style="color: #000; text-decoration: none">
                    <i class="bi bi-trash3" style="padding: 5px"></i>Xóa
                  </a>
                </div>
              </td>
              <td style="padding-left: 0; padding-right: 0">
                <p class="mb-1">
                  <a
                    href="#"
                    style="font-size: 14px; color: #000; text-decoration: none"
                  >
                    Áo Polo Cotton Nam Thoáng Mát Phối Chỉ Tinh Tế - Xanh, M
                  </a>
                </p>
                <p class="mb-0">
                  <span>Số lượng: <b>1</b></span> *
                  <span class="text-black">230,000 đ</span>
                </p>
                <p class="mb-0"><b>= 230,000 đ</b></p>
              </td>
            </tr>

            <!--   giao hàng -->
            <tr>
              <td class="text-right" style="padding-left: 0; padding-right: 0">
                Giao hàng:
              </td>
              <td>
                <div style="font-size: 16px; color: #f00">19,000 đ</div>
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
                <div id="grandTotal" style="font-size: 16px; color: #f00">
                  <b>426,000 đ</b>
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

<script setup></script>

<style scoped>
.title {
  background-color: #bdbdbd;
  font-size: 24px;
  padding: 10px;
}
</style>
