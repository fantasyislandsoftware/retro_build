import request from "sync-request";
import { env } from "../rb_frontend/env.mjs";

export const handlePostRequest = (endpoint, json) => {
    try {
        const res = request("POST", `${env.apiBaseAddress}/${endpoint}`, {
            json: json,
        });
        if (res.statusCode === 200) {
            return JSON.parse(res.getBody("utf8"));
        } else {
            console.log(`error: ${res.statusCode}`);
            process.exit();
        }
    } catch (error) {
        console.log(error);
    }
};