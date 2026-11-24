import { app } from "./app/app.js";
import { env } from "./config/env.js";

const PORT = Number(process.env.PORT) || env.port;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`KicksHub API running on port ${PORT}`);
});
