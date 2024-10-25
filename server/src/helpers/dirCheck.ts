import fs from 'fs';
import path from 'path';

const createImageDirectory = () => {
  const imagePath = path.join(process.cwd(), '..', 'images');
  if (!fs.existsSync(imagePath)) {
    fs.mkdirSync(imagePath, { recursive: true });
  }
};

export default createImageDirectory;
