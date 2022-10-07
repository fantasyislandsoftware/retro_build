var path = require("path");
import { execSync } from "child_process";
import { paths } from "../constants/paths";

export const compileWithZ88DK = (app: any) => {
  app.post("/compileWithZ88DK", async (req: any, res: any, next: any) => {
    const data = path.parse(req.body.path);
    const cmd = `cd ${paths.workspaces}/${data.dir} && zcc +zx -vn -startup=0 -clib=sdcc_iy ${data.base} -o ${data.name}`;
    try {
      const result = execSync(cmd).toString();
      res.json({ std: result, error: null });
    } catch (error: any) {
      res.json({ std: null, error: error.stderr.toString() });
    }
  });
};
