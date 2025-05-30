import Router from "koa-router";
import { getTodos, addTodo, deleteTodo, updateTodo } from "../handlers/todo.js";

const router = new Router({
  prefix: "/api",
});

router.get("/", getTodos);
router.post("/", addTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;
