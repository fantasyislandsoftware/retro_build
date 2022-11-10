import request from "sync-request";
import { env } from "../rb_frontend/env.mjs";

export const handlePostRequest = (endpoint, json) => {
    try {
        const res = request("POST", `${env.apiBaseAddress}/${endpoint}`, {
            json: json,
        });
        if (res.statusCode === 200) {
            let data = JSON.parse(res.getBody("utf8"));
            if (data.std) {
                console.log('');
                console.log(data.std);
            }
            if (data.error) {
                console.log('');
                console.log(data.error);
                process.exit();
            }
            return data;
        } else {
            console.log('');
            console.log(`error: ${res.statusCode}`);
            process.exit();
        }
    } catch (error) {
        console.log('');
        console.log(error);
    }
};