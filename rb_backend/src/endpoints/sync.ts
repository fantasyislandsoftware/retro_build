import { paths } from "../constants/paths";
import { recursiveMakeDir } from "../functions/fileio";
var path = require("path");
var fs = require("fs");
import getUuid from "uuid-by-string";

const syncFiles = (name: string, files: any) => {
  let dirRef: any = {};
  const workspacePath = `${paths.workspaces}/${getUuid(name)}`;
  files.map((item: any) => {
    if (item.type === "file") {
      /* Seperate fullPath into dir & filename, Add to dirRef file */
      const fileName = path.basename(item.fullPath);
      let fileDir = item.fullPath.slice(0, -(fileName.length + 1));
      dirRef[item.relativePath.slice(0, -(fileName.length + 1))] = fileDir;

      /* Create directory structure */
      recursiveMakeDir(`${workspacePath}/${fileDir}`);

      /* Write file */
      fs.writeFileSync(
        `${workspacePath}/${fileDir}/${fileName}`,
        item.fileData,
        "base64"
      );
    } else {
      recursiveMakeDir(`${workspacePath}/${item.fullPath}`);
      dirRef[item.relativePath] = item.fullPath;
    }
  });
  fs.writeFileSync(`${workspacePath}/dir.json`, JSON.stringify(dirRef));
};

export const sync = (app: any) => {
  app.post("/sync", async (req: any, res: any, next: any) => {
    try {
      syncFiles(req.body.name, req.body.files);
      res.json([]);
    } catch (error) {
      console.log(console.error());
      res.json({ status: "error", message: console.error() });
      next(error);
    }
  });
};
