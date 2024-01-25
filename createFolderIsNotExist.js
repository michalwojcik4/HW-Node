import { promises as fsPromises } from "fs";

const isAccessible = (path) => {
  return fsPromises
    .access(path)
    .then(() => true)
    .catch(() => false);
};

const createFolderIsNotExist = async (folderPath) => {
  if (!(await isAccessible(folderPath))) {
    await fsPromises.mkdir(folderPath);
  }
};

export { createFolderIsNotExist };
