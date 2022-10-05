import request from "sync-request";

export const compile = () => {
    const res = request("GET", "http://localhost:4321/compile");
    return JSON.parse(res.getBody("utf8"));
};