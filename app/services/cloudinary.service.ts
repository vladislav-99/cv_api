import cloudinary from 'cloudinary';
import HttpException from '../exceptions/http.exception';

class CloudinaryService {
  cloudinary = cloudinary.v2;
  constructor() {
    this.cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true
    });
  }
  async uploadImage(imagePath: string) {
    return await this.cloudinary.uploader
      .upload(imagePath)
      .then(result => {
        if (!result.url) {
          throw new HttpException(400, 'Cannot save image file');
        }
        return {
          url: result.url
        };
      });
  }

  async deleteImage(imageName: string) {
    return await this.cloudinary.uploader
      .destroy(imageName)
      .catch(error => {
        return new HttpException(400, error.message);
      });
  }

  async deleteImages(imageNames: string[]) {
    return await this.cloudinary.api
      .delete_resources(imageNames)
      .catch(error => {
        return new HttpException(400, error.message);
      });
  }
}

export default new CloudinaryService();

