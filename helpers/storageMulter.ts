import multer, { StorageEngine } from 'multer';

const storage = (): StorageEngine => {
    return multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './public/uploads'); // Thư mục lưu file
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now(); // Thêm timestamp để tránh trùng tên file
            cb(null, `${uniqueSuffix}-${file.originalname}`); // Định dạng tên file
        }
    });
};

export default storage;
