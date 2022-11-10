var fs = require("fs");
import { execSync } from "child_process";
import { getWorkspacePath, splitDirAndFile } from "../functions/fileio";

export const compileWithZXBC = (app: any) => {
  app.post("/compileWithZXBC", async (req: any, res: any, next: any) => {
    /* Get params */
    let { name, srcPath, dstpath } = req.body;

    /* Get workspace folder by name */
    const workspacePath = getWorkspacePath(name);

    /* Split path into filename and path */
    const fileInfo = {
      src: {
        path: splitDirAndFile(req.body.srcPath).path,
        fileName: splitDirAndFile(req.body.srcPath).fileName,
      },
      dst: {
        path: splitDirAndFile(req.body.dstPath).path,
        fileName: splitDirAndFile(req.body.dstPath).fileName,
      },
    };

    /* Load env and dirList files  */
    const env = JSON.parse(
      fs.readFileSync(`${workspacePath}/env.json`).toString()
    );
    const dirList = JSON.parse(
      fs.readFileSync(`${workspacePath}/dir.json`).toString()
    );

    //-taB

    const cmd = `/home/node/app/bin/linux/compilers/zxbasic/./zxbc.py -A --org ${
      env.org
    } ${workspacePath}/${dirList[fileInfo.src.path]}/${
      fileInfo.src.fileName
    } -o ${workspacePath}/${dirList[fileInfo.dst.path]}/${
      fileInfo.dst.fileName
    }`;

    /* Compile */
    try {
      const result = execSync(cmd).toString();
      res.json({ std: result, error: null });
    } catch (error: any) {
      res.json({ std: null, error: error.stderr.toString() });
    }
  });
};
