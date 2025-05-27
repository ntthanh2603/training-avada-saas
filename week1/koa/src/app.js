import Koa from "koa";
import bodyParser from "@koa/bodyparser";
import router from "./routes/routes.js";

const app = new Koa();

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
