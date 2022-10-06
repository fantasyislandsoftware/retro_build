import request from "sync-request";
import { execSync } from "child_process";
import { env } from './env.mjs';

export const func_compile = (path) => {
    console.log("Compiling...");
    const res = request("POST", `${env.apiBaseAddress}/compile`, {
        json: { path: execSync(`realpath ${path}`).toString().trimEnd() },
    });
    return JSON.parse(res.getBody("utf8"));
};