import request from "sync-request";
import { env } from "./env.mjs";
import { execSync } from "child_process";

export const compileTapeFunc = (pathBasicFile, pathTapeBlocksFile) => {
    console.log("Compiling tape ...");
    const res = request("POST", `${env.apiBaseAddress}/compileTape`, {

        json: {
            pathBasicFile: execSync(`realpath ${pathBasicFile}`).toString().trimEnd(),
            pathTapeBlocksFile: execSync(`realpath ${pathTapeBlocksFile}`).toString().trimEnd(),
        },
    });

    /*const result = JSON.parse(res.getBody("utf8"));
          if (result.error) {
              console.log(result.error);
              process.exit();
          } else {
              console.log(result.std);
          }*/
};