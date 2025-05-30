import Router from "koa-router";
import hello from "../handlers/hello.js";

const router = new Router({
  prefix: "/api",
});

router.get("/", hello);

export default router;
