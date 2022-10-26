const fs = require("fs");
const path = require("path");
import getUuid from "uuid-by-string";
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

export const getWorkspacePath = (name: string) => {
  return `${paths.workspaces}/${getUuid(name)}`;
};

export const splitDirAndFile = (_path: string) => {
  const fileName = path.basename(_path);
  return { fileName: fileName, path: _path.slice(0, -(fileName.length + 1)) };
};

export const getPathInfo = (name: string, path: string, dirList: any) => {
  const split = splitDirAndFile(path);
  return {
    relativeDir: split.path,
    fileName: split.fileName,
    fullPath: `${getWorkspacePath(name)}${dirList[split.path]}`,
  };
};

export const loadPathResolver = (workspacePath: string) => {
  return JSON.parse(fs.readFileSync(`${workspacePath}/dir.json`).toString());
};

export const loadEnv = (workspacePath: string) => {
  return JSON.parse(fs.readFileSync(`${workspacePath}/env.json`).toString());
};

export const loadJsonWithConverterdVars = (env: any, path: string) => {
  const json = JSON.parse(fs.readFileSync(path).toString());
  json.map((jsonItem: any) => {
    Object.keys(jsonItem).forEach(function (key, index) {
      if (jsonItem[key].toString().substring(0,2) === '${') {
        const envKey = jsonItem[key].replaceAll("${","").replaceAll("}","");
        jsonItem[key] = env[envKey];
      }
    });
  });
  return json;
};

module.exports = {
  recursiveMakeDir,
  getWorkspacePath,
  splitDirAndFile,
  getPathInfo,
  loadPathResolver,
  loadEnv,
  loadJsonWithConverterdVars,
};
