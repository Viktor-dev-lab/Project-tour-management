// Slider Tour Detail Page
var swiper = new Swiper(".mySwiper", {
  loop: true,
  spaceBetween: 10,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true,
});
var swiper2 = new Swiper(".mySwiper2", {
  loop: true,
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  thumbs: {
    swiper: swiper,
  },
});
// End Slider Tour Detail Page

// Show count cart
const showMiniCart = () => {
  const miniCart = document.querySelector("[mini-cart]");
  if (miniCart){
    const cart = JSON.parse(localStorage.getItem("cart"));
    const totalQuantity = cart.reduce((sum,item) => sum + item.quantity, 0);
    miniCart.innerHTML = totalQuantity;
  }
}
showMiniCart();
// End Show count cart

// Carts
// Kiểm tra giỏ hàng trong localStorage
let cart = localStorage.getItem("cart");
// Nếu chưa có, tạo mới giỏ hàng rỗng
if (!cart) {
  localStorage.setItem("cart", JSON.stringify([]));
} else {
  cart = JSON.parse(cart); // Chuyển về mảng để thao tác
}
// Lấy form giỏ hàng
const formCart = document.getElementById('cartForm');
if (formCart) {
  formCart.addEventListener("submit", (event) => {
    event.preventDefault(); // Ngăn chặn reload trang

    const quantity = parseInt(event.target.elements.quantity.value, 10);
    const tourID = parseInt(event.target.elements.tour_id.value, 10);

    if (!tourID || quantity <= 0) {
      Swal.fire({
        icon: "warning",
        title: "Lỗi!",
        text: "Vui lòng chọn số lượng hợp lệ!",
      });
      return;
    }

    // Lấy giỏ hàng từ localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const indexExistTour = cart.findIndex(item => item.tourID === tourID);

    if (indexExistTour === -1) {
      cart.push({ tourID, quantity });
    } else {
      cart[indexExistTour].quantity += quantity;
    }

    // Cập nhật localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Hiển thị thông báo với Swal
    Swal.fire({
      icon: "success",
      title: "Thành công!",
      text: "Sản phẩm đã được thêm vào giỏ hàng!",
      showConfirmButton: false,
      timer: 1500
    });
    showMiniCart();
  });
}
// End Carts