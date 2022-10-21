const fs = require("fs");
import { paths } from "../constants/paths";

export const recursiveMakeDir = (path: string) => {
  const folders = path.split("/");
  let createPath = "";
  folders.map((folder) => {
    if (folder !== "") {
      createPath = createPath + "/" + folder;
      if (!fs.existsSync(createPath)) {
        fs.mkdirSync(createPath);
      }
    }
  });
};

module.exports = {
  recursiveMakeDir,
};
