import express from 'express';
import { compile } from "./endpoints/compile";
import { sync } from "./endpoints/sync";

const bodyParser = require("body-parser");
var cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

compile(app);
sync(app);

const port = 4321;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});