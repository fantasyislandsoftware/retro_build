import express from "express";
import { compileWithZ88DK } from "./endpoints/compileWithZ88DK";
import { compileWithZXBC } from "./endpoints/compileWithZXBC";
import { compileWithZXBASM } from "./endpoints/compileWithZXBASM";
import { init } from "./endpoints/init";
import { sync } from "./endpoints/sync";
import { compileTape } from "./endpoints/compileTape";
import { download } from "./endpoints/download";
import bodyParser from "body-parser";

var cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

init(app);
sync(app);
compileWithZ88DK(app);
compileWithZXBC(app);
compileWithZXBASM(app);
compileTape(app);
download(app);

const port = 4321;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
