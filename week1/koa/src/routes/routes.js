import Router from "koa-router";
import bookRouter from "./bookRoutes.js";
import productRouter from "./productRoutes.js";

const router = new Router({
  prefix: "/api",
});

router.use(bookRouter.routes(), bookRouter.allowedMethods());
router.use(productRouter.routes(), productRouter.allowedMethods());

export default router;
