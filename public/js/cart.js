// Vẽ ra danh sách Tour
const drawListTour = () => {
  fetch("http://localhost:3000/cart/list-json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: localStorage.getItem("cart")
  })
    .then(res => res.json())
    .then(data => {
      const listTour = document.querySelector("[list-tour]");
      if (!listTour) {
        console.error("Không tìm thấy phần tử [list-tour]");
        return;
      }

      if (!data.tours || data.tours.length === 0) {
        listTour.innerHTML = `<tr><td colspan="7" class="text-center text-muted">Giỏ hàng trống</td></tr>`;
        document.querySelector(".total-price-h4 .total-price").innerHTML = "0";
        return;
      }

      const htmlArray = data.tours.map((item, index) => {
        return `
          <tr>
            <td>${index + 1}</td>
            <td>
              <img src="${item.image}" alt="${item.info.title}" class="rounded shadow-sm" width="80px">
            </td>
            <td>
              <a href="/tours/detail/${item.info.slug}" class="fw-bold text-decoration-none text-primary">
                ${item.info.title}
              </a>
            </td>
            <td>
              <span class="price">${item.price_special.toLocaleString("vi-VN")}</span>
              <span class="text-muted"> đ</span>
            </td>
            <td>
              <input 
                type="number" 
                name="quantity" 
                class="form-control text-center quantity-input"
                value="${item.quantity}"
                min="1"
                data-tour-id="${item.tourID}"
                style="max-width: 60px;"
              >
            </td>
            <td>
              <span class="total-price">${(item.price_special * item.quantity).toLocaleString("vi-VN")}</span>
              <span class="text-muted"> đ</span>
            </td>
            <td>
              <button 
                class="btn btn-sm btn-danger d-flex align-items-center gap-1 btn-delete"
                data-tour-id="${item.tourID}"
              >
                <i class="bi bi-trash"></i> Xóa
              </button>
            </td>
          </tr>
        `;
      });

      listTour.innerHTML = htmlArray.join("");

      // Tính tổng đơn hàng
      const totalPrice = data.tours.reduce((sum, item) => sum + (item.price_special * item.quantity), 0);
      document.querySelector(".total-price-h4 .total-price").innerHTML = totalPrice.toLocaleString("vi-VN") + " đ";

      // Gán sự kiện các chức nang
      deleteIteminCart();
      updateIteminCart();
    })
    .catch(error => console.error("Lỗi khi lấy danh sách tour:", error));
};

// Xóa sản phẩm trong giỏ hàng
const deleteIteminCart = () => {
  const listBtnDelete = document.querySelectorAll(".btn-delete");
  listBtnDelete.forEach(btn => {
    btn.addEventListener("click", () => {
      const tourID = Number(btn.getAttribute("data-tour-id")); // Chuyển thành số

      // Lấy dữ liệu giỏ hàng từ localStorage
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      // Lọc ra những tour KHÔNG phải tour cần xóa
      cart = cart.filter(item => Number(item.tourID) !== tourID);

      // Lưu lại giỏ hàng mới
      localStorage.setItem("cart", JSON.stringify(cart));

      // Cập nhật giao diện mà không cần reload trang
      drawListTour();
    });
  });
};

// Cập nhật sản phẩm trong giỏ hàng
const updateIteminCart = () => {
  const listBtnDelete = document.querySelectorAll("[list-tour] input[data-tour-id]");
  listBtnDelete.forEach(input => {
    input.addEventListener("change", () => {
      const tourID = Number(input.getAttribute("data-tour-id")); // Chuyển thành số
      const newQuantity = parseInt(input.value)

      // Lấy dữ liệu giỏ hàng từ localStorage
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      // Tìm quantity theo tourID
      const oldQuantity = cart.find(item => item.tourID == tourID);
      oldQuantity.quantity = newQuantity

      // Lưu lại giỏ hàng mới
      localStorage.setItem("cart", JSON.stringify(cart));

      // Cập nhật giao diện mà không cần reload trang
      drawListTour();
    });
  });
};

// Lấy data ra giao diện
drawListTour();
