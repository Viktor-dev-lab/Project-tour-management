// Slider Tour Detail Page
const tourThumbs = new Swiper(".mySwiper", {
  loop: true,
  spaceBetween: 10,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true,
});

const tourSlider = new Swiper(".mySwiper2", {
  loop: true,
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  thumbs: {
    swiper: tourThumbs,
  },
});
// End Slider Tour Detail Page

// Start Slider Dashboard
const dashboardSlider = new Swiper(".mySwiperDashboard", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  pagination: {
    el: ".swiper-pagination",
  },
  autoplay: {
    delay: 3000, // Thời gian giữa các lần lướt (3 giây)
    disableOnInteraction: false, // Tiếp tục lướt ngay cả khi người dùng tương tác
  },
});

const dashboardInfoSlider = new Swiper(".mySwiperDashboardInfo", {
  speed: 600,
  parallax: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});


var swiper = new Swiper(".mySwiperTourInfo", {
  slidesPerView: 3,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  autoplay: {
    delay: 3000, // Thời gian giữa các lần lướt (3 giây)
    disableOnInteraction: false, // Tiếp tục lướt ngay cả khi người dùng tương tác
  },
});
// End Slider Dashboard




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