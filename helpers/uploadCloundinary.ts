import cloudinary from 'cloudinary';
import streamifier from 'streamifier';

cloudinary.v2.config({ 
    cloud_name: process.env.CLOUD_NAME!, 
    api_key: process.env.CLOUD_KEY!, 
    api_secret: process.env.CLOUD_SECRET!
});

const streamUpload = (buffer: Buffer): Promise<cloudinary.UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.v2.uploader.upload_stream(
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

const uploadToCloudinary = async (buffer: Buffer): Promise<string> => {
  const result = await streamUpload(buffer);
  return result.url;
};

export default uploadToCloudinary;
