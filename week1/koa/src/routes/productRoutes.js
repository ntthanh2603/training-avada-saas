import Router from "koa-router";
import * as productHandler from "../handlers/products/productHandlers.js";
import productInputMiddleware from "../middleware/productInputMiddleware.js";

const productRouter = new Router({
  prefix: "/products",
});

productRouter.post("/", productInputMiddleware, productHandler.save);
productRouter.get("/all", productHandler.getProducts);
productRouter.get("/", productHandler.getFilterProducts);
productRouter.get("/:id", productHandler.getProduct);
productRouter.put("/:id", productInputMiddleware, productHandler.updateProduct);
productRouter.delete("/:id", productHandler.deleteProduct);

export default productRouter;
