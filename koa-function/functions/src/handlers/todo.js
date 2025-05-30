import { add, getAll, remove, update } from "../database/repository.js";

const getTodos = async (ctx) => {
  try {
    const todos = await getAll();
    ctx.body = todos;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: "Failed to fetch todos" };
  }
};
const addTodo = async (ctx) => {
  try {
    const todo = ctx.req.body;
    const newTodo = await add(todo);
    ctx.status = 201;
    ctx.body = newTodo;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: "Failed to add todo" };
    console.error("Error adding todo:", error);
  }
};

const deleteTodo = async (ctx) => {
  try {
    console.log("Deleting todo with ID:", ctx.params.id);
    const id = ctx.params.id;
    const deletedTodo = await remove(id);
    ctx.body = deletedTodo;
  } catch (error) {
    console.error("Error deleting todo:", error);
    ctx.status = 500;
    ctx.body = { error: "Failed to delete todo" };
  }
};

const updateTodo = async (ctx) => {
  try {
    console.log("Updating todo with ID:", ctx.params.id);
    console.log("Update data:", ctx.req.body);
    const id = ctx.params.id;
    const updateData = ctx.req.body;

    const updatedTodo = await update(id, updateData);
    ctx.body = updatedTodo;
  } catch (error) {
    console.error("Error updating todo:", error);
    ctx.status = error.message.includes("not found") ? 404 : 500;
    ctx.body = {
      error: error.message || "Failed to update todo",
    };
  }
};

export { getTodos, addTodo, deleteTodo, updateTodo };
