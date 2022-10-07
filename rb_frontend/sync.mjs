import request from "sync-request";
import fs from "fs";
import { execSync } from "child_process";
import { env } from './env.mjs';

export const syncFunc = (paths) => {
    console.log("Syncing...");
    let files = [];
    paths.map((path) => {
        const list = execSync(`find ${path} -type f`).toString().split('\n');
        list.map((item) => {
            if (item !== '' && item !== path) {
                const realPath = execSync(`realpath ${item}`).toString().trimEnd();
                const file = fs.readFileSync(realPath, "base64");
                files.push({ path: realPath, file: file, modified: fs.statSync(realPath).mtime });
            }
        })
    });
    const res = request("POST", `${env.apiBaseAddress}/sync`, {
        json: { files },
    });
    return JSON.parse(res.getBody("utf8"));
};