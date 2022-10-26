import { handlePostRequest } from "./requestHandler.mjs";
import { execSync } from "child_process";
import fs from "fs";

export const init = (name, vars) => {
    process.stdout.write("initialising...");
    handlePostRequest("init", { name: name, vars: vars });
    console.log("ok");
};

export const sync = (name, paths) => {
    process.stdout.write("syncing...");
    let files = [];
    paths.map((path) => {
        /* Add base directory */
        files.push({
            relativePath: path,
            fullPath: execSync(`realpath ${path}`).toString().trimEnd(),
            fileData: null,
            type: "folder",
            modified: fs.statSync(path).mtime,
        });

        /* Get recursive list of paths */
        const dirList = execSync(`find ${path} -type f`).toString().split("\n");

        /* Build up payload */
        dirList.map((path) => {
            if (path !== "") {
                files.push({
                    relativePath: path,
                    fullPath: execSync(`realpath ${path}`).toString().trimEnd(),
                    fileData: fs.readFileSync(path, "base64"),
                    type: "file",
                    modified: fs.statSync(path).mtime,
                });
            }
        });
    });
    //console.log(files);
    handlePostRequest("sync", { name: name, files: files });
    console.log("ok");
};

export const compileWithZ88DK = (name, path) => {
    process.stdout.write("compiling...");
    handlePostRequest("compileWithZ88DK", { name: name, path: path });
    console.log("ok");
};

export const compileTape = (
    name,
    pathBasicFile,
    pathTapeBlocksFile,
    pathTapeFile
) => {
    process.stdout.write("compiling tape...");
    handlePostRequest("compileTape", {
        name: name,
        pathBasicFile: pathBasicFile,
        pathTapeBlocksFile: pathTapeBlocksFile,
        pathTapeFile: pathTapeFile,
    });
    console.log("ok");
};

export const download = (name, dstFolder, paths) => {
    process.stdout.write("downloading...");
    let res = handlePostRequest("download", { name: name, paths: paths });
    res.map((item) => {
        fs.writeFileSync(`${dstFolder}/${item.fileName}`, item.data, "base64");
    });
    console.log("ok");
};