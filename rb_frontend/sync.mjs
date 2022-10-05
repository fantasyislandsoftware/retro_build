import request from "sync-request";
import fs from "fs";
import { execFileSync, execSync } from "child_process";

export const sync = (paths) => {
    console.log("Syncing folders...");
    let files = [];
    paths.map((path) => {
        const list = execSync(`find ${path} -type f`).toString().split('\n');
        list.map((item) => {
            if (item !== '' && item !== path) {
                const realPath = execSync(`realpath ${item}`).toString().trimEnd();
                const file = fs.readFileSync(realPath, "utf8");
                files.push({ path: realPath.trimEnd(), file: file });
            }
        })
    });
    //console.log(files);
    const res = request("POST", "http://localhost:4321/sync", {
        json: { files },
    });
    return JSON.parse(res.getBody("utf8"));
};