import request from "sync-request";
import { execSync } from "child_process";
import { env } from "./env.mjs";

export const compileWithZ88DKFunc = (path) => {
    console.log("Compiling...");
    const res = request("POST", `${env.apiBaseAddress}/compileWithZ88DK`, {
        json: { path: execSync(`realpath ${path}`).toString().trimEnd() },
    });
    const result = JSON.parse(res.getBody("utf8"));
    if (result.error) {
        console.log(result.error);
        process.exit();
    } else {
        console.log(result.std);
    }
};