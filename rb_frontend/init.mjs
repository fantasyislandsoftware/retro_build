import { handlePostRequest } from "./requestHandler.mjs";

export const initFunc = (name, vars) => {
    console.log("initialising...");
    handlePostRequest("init", { name: name, vars: vars });
};