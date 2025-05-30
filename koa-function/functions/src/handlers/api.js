import Koa from "koa";
import cors from "@koa/cors";
import router from "../routes/routes.js";

const app = new Koa();

app.use(
  cors({
    origin: "http://localhost:3000",
    allowMethods: ["GET", "POST", "PUT", "DELETE"],
    allowHeaders: ["Content-Type"],
  })
);

app.use(router.routes());
app.use(router.allowedMethods());

export default app;
