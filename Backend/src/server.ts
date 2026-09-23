import { app } from "./app/app.js";
import { env } from "./config/env.js";

app.listen(env.port, () => {
  console.log(
    `KicksHub API running on http://localhost:${env.port}`
  );
});