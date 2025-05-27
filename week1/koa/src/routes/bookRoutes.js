import Router from "koa-router";
import * as bookHandler from "../handlers/books/bookHandlers.js";
import bookInputMiddleware from "../middleware/bookInputMiddleware.js";

const bookRouter = new Router({
  prefix: "/books",
});

bookRouter.post("/", bookInputMiddleware, bookHandler.save);
bookRouter.get("/", bookHandler.getBooks);
bookRouter.get("/:id", bookHandler.getBook);

export default bookRouter;
