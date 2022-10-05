import { paths } from "../constants/paths";
import { recursiveMakeDir } from "../functions/fileio";
var path = require('path');
var fs = require('fs');

export const sync = (app: any) => {
  app.post("/sync", async (req: any, res: any, next: any) => {
    try {
      //console.log(req.body);
      req.body.files.map((item : any) => {
        const fileName = path.basename(item.path);
        let _path = item.path.slice(0,-fileName.length);
        if (_path.substring(_path.length-1) === '/') {
          _path = _path.slice(0,-1);
        }
        recursiveMakeDir(_path);
        const buffer : Buffer = item.file;
        fs.writeFileSync(`${paths.workspaces}/${_path}/${fileName}`, buffer);
      })
      res.json([]);
    } catch (error) {
      console.log(console.error());
      res.json({ status: "error", message: console.error() });
      next(error);
    }
  });
};
