import { diskStorage } from 'multer';
import fs from 'fs'
import path from 'path'
import {fileURLToPath} from 'url';
import multerFilter from '@app/common/config/multerConfig';
// import { MulterOptions } from '@nestjs/common';

export const FileOptions = (destination: string) => {
  return {
    storage: diskStorage({
      destination,
      filename: function (req, file, callback) {
        callback(null, Date.now() + '--' + file.originalname);
      },
    }),
    fileFilter: multerFilter,
  };
};


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fsPromise = fs.promises

const deleteItem = async(destination:string,item:string)=>{
    if(fs.existsSync(path.join(__dirname, destination, item))){
        await fsPromise.unlink(path.join(__dirname, destination, item));
    }
}

export default deleteItem