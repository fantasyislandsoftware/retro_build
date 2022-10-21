import { paths } from "../constants/paths";

var fs = require('fs');

export const compileTape = (app: any) => {
  app.post("/compileTape", async (req: any, res: any, next: any) => {
    try {
      const path = `${paths.workspaces}/${req.body.pathTapeBlocksFile}`;
      let x = JSON.parse(fs.readFileSync(path));
      console.log(x);
      res.json([]);
    } catch (error) {
      console.log(console.error());
      res.json({ status: "error", message: console.error() });
      next(error);
    }
  });
};
