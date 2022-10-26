import { paths } from "../constants/paths";
import { recursiveMakeDir } from "../functions/fileio";
import { getWorkspacePath } from "../functions/fileio";
var path = require("path");
var fs = require("fs");
import getUuid from "uuid-by-string";

const saveEnvVars = (name : string, vars: any) => {
  const projectWorkspacePath = getWorkspacePath(name);
  recursiveMakeDir(projectWorkspacePath);
  fs.writeFileSync(`${projectWorkspacePath}/env.json`, JSON.stringify(vars));
};

export const init = (app: any) => {
  app.post("/init", async (req: any, res: any, next: any) => {
    try {
      saveEnvVars(req.body.name, req.body.vars);
      res.json([]);
    } catch (error) {
      console.log(console.error());
      res.json({ status: "error", message: console.error() });
      next(error);
    }
  });
};
