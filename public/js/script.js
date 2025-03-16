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

    const quantity = parseInt(event.target.elements.quantity.value);
    const tourID = parseInt(event.target.elements.tour_id.value);

    if (!tourID || quantity <= 0) {
      alert("Vui lòng chọn số lượng hợp lệ!");
      return;
    }

    // Thêm sản phẩm vào giỏ hàng
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const indexExistTour = cart.findIndex(item => item.tourID == tourID);

    if(indexExistTour == -1){
      cart.push({ 
        tourID: tourID, 
        quantity: quantity
      });
    } else {
      cart[indexExistTour].quantity = cart[indexExistTour].quantity + quantity;
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    console.log("Thêm vào giỏ hàng:", { tourID, quantity });
    alert("Đã thêm vào giỏ hàng!");

  });
}
// End Carts