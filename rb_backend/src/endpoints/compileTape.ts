import { execSync } from "child_process";
import {
  getPathInfo,
  getWorkspacePath,
  loadEnv,
  loadJsonWithConverterdVars,
  loadPathResolver,
} from "../functions/fileio";
var fs = require("fs");

const bufferToArray = (buffer: any) => {
  let array: any = [];
  for (let n: number = 0; n < buffer.length; n++) {
    array.push(buffer[n]);
  }
  return array;
};

const addFilename = (array: any, str: any) => {
  for (let n in str) {
    array.push(str.charCodeAt(n));
  }
  for (let n = 0; n < 10 - str.length; n++) {
    array.push(32);
  }
  return array;
};

const addInt = (array: any, n: any) => {
  const lo = n & 0xff;
  const hi = (n >> 8) & 0xff;
  array.push(lo, hi);
  return array;
};

const xorall = (bytes: any, start: any) => {
  let r = 0;
  for (let n = start; n < bytes.length; n++) {
    r = r ^ bytes[n];
  }
  return r;
};

const bin2tapArray = (source: any, name: any, org: any) => {
  const stats = fs.statSync(source);
  const size = stats.size;

  /* header */
  let header = [];
  header.push(19);
  header.push(0);
  header.push(0);
  header.push(3);
  header = addFilename(header, name);
  header = addInt(header, size);
  header = addInt(header, org);
  header = addInt(header, 32768);
  header.push(xorall(header, 3));

  /* data */
  let data: any = [];
  data = addInt(data, size + 2);
  data.push(255);

  let fileData = fs.readFileSync(source);
  for (let n = 0; n < fileData.length; n++) {
    data.push(fileData[n]);
  }

  data.push(xorall(data, 2));

  let fileArray: any = [];
  fileArray = fileArray.concat(header);
  fileArray = fileArray.concat(data);

  return fileArray;
};

export const compileTape = (app: any) => {
  app.post("/compileTape", async (req: any, res: any, next: any) => {
    try {
      /* Get params */
      const { name, pathBasicFile, pathTapeBlocksFile, pathTapeFile } =
        req.body;

      /* Resolve workspace path */
      const workspacePath = getWorkspacePath(name);

      /* Load env and path resolver  */
      const env = loadEnv(workspacePath);
      const pathResolver = loadPathResolver(workspacePath);

      const basicFileInfo = getPathInfo(name, pathBasicFile, pathResolver);
      const tapeBlocksFileInfo = getPathInfo(
        name,
        pathTapeBlocksFile,
        pathResolver
      );
      const tapeFileInfo = getPathInfo(name, pathTapeFile, pathResolver);

      /* Replace org in basic file */
      /*const basicFileData = fs
        .readFileSync(`${basicFileInfo.fullPath}/${basicFileInfo.fileName}`)
        .toString();
      fs.writeFileSync(
        `${basicFileInfo.fullPath}/${basicFileInfo.fileName}`,
        basicFileData.replaceAll("${org}", env.org)
      );*/

      /* Create tape file with basic file */
      //const cmd = `cd ${basicFileInfo.fullPath} && DISPLAY=:0.0 wine /home/node/app/bin/x86/tools/bas2tap.exe -s${name} -a -w -c -q ${basicFileInfo.fileName} ${tapeFileInfo.fullPath}/${tapeFileInfo.fileName}`;
      //execSync(cmd);

      /* Add blocks to tape file */

      /* Convert tape file to array */
      //let tapeFileArray = bufferToArray(
      //  fs.readFileSync(`${tapeFileInfo.fullPath}/${tapeFileInfo.fileName}`)
      //);

      /* Loop through tape blocks */
      /*const tapeBlocksFileJson = loadJsonWithConverterdVars(
        env,
        `${tapeBlocksFileInfo.fullPath}/${tapeBlocksFileInfo.fileName}`
      );

      tapeBlocksFileJson.map((item: any) => {
        const arr = bin2tapArray(
          `${workspacePath}${pathResolver[item.path]}/${item.fileName}`,
          item.name,
          item.address
        );
        tapeFileArray = tapeFileArray.concat(arr);
      });
      const buffer = Buffer.from(tapeFileArray);
      fs.writeFileSync(
        `${tapeFileInfo.fullPath}/${tapeFileInfo.fileName}`,
        buffer
      );*/

      res.json([]);
    } catch (error) {
      console.log(console.error());
      res.json({ status: "error", message: console.error() });
      next(error);
    }
  });
};
