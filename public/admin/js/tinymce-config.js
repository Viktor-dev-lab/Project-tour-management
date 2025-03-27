const listTextareaMCE = document.querySelectorAll(".textarea-mce");

console.log(listTextareaMCE)
if (listTextareaMCE.length > 0){
  listTextareaMCE.forEach((textarea) => {
    const id = textarea.id;
    tinymce.init({
      selector: `#${id}`,
      plugins: 'image code', // Bật tính năng chèn ảnh và chỉnh sửa code
      image_title: true, // Cho phép đặt tiêu đề cho ảnh
      images_upload_url: '/admin/upload', // API xử lý upload ảnh
      automatic_uploads: true, // Tự động tải lên ngay khi chọn ảnh
      file_piker_types: "image", // Chỉ cho phép chọn ảnh
    });
  })
}

