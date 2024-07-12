import * as dotenv from "dotenv";

import "reflect-metadata";

import app from "./app";
import { AppDataSource } from "./database/data-source";

dotenv.config();

const port = process.env.APP_PORT || 3000;

AppDataSource.initialize()
  .then(async () => {
    console.log("connect success");
  })
  .catch((error) => console.log(error));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
