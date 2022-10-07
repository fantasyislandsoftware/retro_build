import express from 'express';
import { compileWithZ88DK } from "./endpoints/compileWithZ88DK";
import { sync } from "./endpoints/sync";

const bodyParser = require("body-parser");
var cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

compileWithZ88DK(app);
sync(app);

const port = 4321;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});