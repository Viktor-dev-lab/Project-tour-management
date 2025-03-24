fetch("http://localhost:3000/cart/list-json", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: localStorage.getItem('cart')
})
  .then(res => res.json())
  .then(data => {
    const listTour = document.querySelector("[list-tour]");

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
    const totalPrice = data.tours.reduce((sum, item) => sum + item.total, 0);
    const elementTotalPrice = document.querySelector(".total-price-h4 .total-price");
    elementTotalPrice.innerHTML = totalPrice.toLocaleString("vi-VN");
  })
  .catch(error => console.error("Lỗi khi lấy danh sách tour:", error));
