import { paths } from "../constants/paths";
import {
  getPathInfo,
  loadPathResolver,
  recursiveMakeDir,
} from "../functions/fileio";
import { getWorkspacePath } from "../functions/fileio";
var path = require("path");
var fs = require("fs");
import getUuid from "uuid-by-string";

export const download = (app: any) => {
  app.post("/download", async (req: any, res: any, next: any) => {
    try {
      /* Get params */
      const { name, paths } = req.body;

      /* Resolve workspace path */
      const workspacePath = getWorkspacePath(name);

      /* Load env and path resolver  */
      const pathResolver = loadPathResolver(workspacePath);

      let result: any = [];

      paths.map((path: string) => {
        const pathInfo = getPathInfo(name, path, pathResolver);
        const y = fs.readFileSync(
          `${pathInfo.fullPath}/${pathInfo.fileName}`,
          "base64"
        );
        result.push({
          fileName: pathInfo.fileName,
          data: fs.readFileSync(
            `${pathInfo.fullPath}/${pathInfo.fileName}`,
            "base64"
          ),
        });
      });

      res.json(result);
    } catch (error) {
      console.log(console.error());
      res.json({ status: "error", message: console.error() });
      next(error);
    }
  });
};
