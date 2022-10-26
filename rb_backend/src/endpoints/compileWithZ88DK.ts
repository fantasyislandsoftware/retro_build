var fs = require("fs");
import { execSync } from "child_process";
import { getWorkspacePath, splitDirAndFile } from "../functions/fileio";


export const compileWithZ88DK = (app: any) => {
  app.post("/compileWithZ88DK", async (req: any, res: any, next: any) => {

    const name = req.body.name;

    /* Get workspace folder by name */
    const workspacePath = getWorkspacePath(name);

    /* Split path into filename and path */
    let {fileName, path} = splitDirAndFile(req.body.path);

    /* Load env and dirList files  */
    const env = JSON.parse(fs.readFileSync(`${workspacePath}/env.json`).toString());
    const dirList = JSON.parse(fs.readFileSync(`${workspacePath}/dir.json`).toString());
    
    /* Assemble the cmd for zcc */
    path = dirList[path];
    const cmd = `cd ${workspacePath}/${path} && zcc +zx -vn -zorg=50000 -startup=31 -clib=sdcc_iy ${fileName} -o ${name}.bin`;
    
    /* Compile */
    try {
      const result = execSync(cmd).toString();
      res.json({ std: result, error: null });
    } catch (error: any) {
      res.json({ std: null, error: error.stderr.toString() });
    }
  });
};
