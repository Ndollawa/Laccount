import { diskStorage } from 'multer';
import fs from 'fs';
import path from 'path';
import multerFilter from '@app/common/config/multerConfig';

// File storage options with basic filename handling (adds timestamp to original filename)
export const FileOptions = (destination: string) => {
  return {
    storage: diskStorage({
      destination,
      filename: (req, file, callback) => {
        callback(null, `${Date.now()}--${file.originalname}`);
      },
    }),
    fileFilter: multerFilter,
  };
};

const fsPromise = fs.promises;

// Delete a file from the filesystem
export const deleteItem = async (destination: string, item: string) => {
  try {
    const filePath = path.join(__dirname, destination, item);
    if (fs.existsSync(filePath)) {
      await fsPromise.unlink(filePath);
      console.log(`Deleted file: ${item}`);
    }
  } catch (error) {
    console.error(`Error deleting file: ${error}`);
  }
};

// File storage options with random filename generation and custom file size and filter logic
export const FileOptions2 = (destination: string) => {
  return {
    storage: diskStorage({
      destination: destination,
      filename: (req, file, callback) => {
        const fileExtName = path.extname(file.originalname);
        const randomName = Array(32)
          .fill(null)
          .map(() => Math.round(Math.random() * 16).toString(16))
          .join('');
        callback(null, `${randomName}${fileExtName}`);
      },
    }),
    limits: { fileSize: 1024 * 1024 * 5 }, // 5 MB file size limit
    fileFilter: (req, file, callback) => {
      if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
        return callback(
          new Error('Only image files (JPG, JPEG, PNG) are allowed!'),
          false,
        );
      }
      callback(null, true);
    },
  };
};
