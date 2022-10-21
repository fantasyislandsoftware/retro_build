import request from "sync-request";
import fs from "fs";
import { execSync } from "child_process";
import { env } from "./env.mjs";
import { handlePostRequest } from "./requestHandler.mjs";

export const syncFunc = (name, paths) => {
    console.log("syncing...");
    let files = [];
    paths.map((path) => {
        //console.log(path);

        /* Get recursive list of paths */
        const dirList = execSync(`find ${path} -type f`).toString().split("\n");

        /* Build up payload */
        dirList.map((path) => {
            if (path !== "") {
                files.push({
                    relativePath: path,
                    fullPath: execSync(`realpath ${path}`).toString().trimEnd(),
                    fileData: fs.readFileSync(path, "base64"),
                    modified: fs.statSync(path).mtime,
                });
            }
        });
        //console.log(files);
    });
    handlePostRequest("sync", { name: name, files: files });
};