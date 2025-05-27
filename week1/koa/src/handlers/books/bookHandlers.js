import {
  getAllBooks,
  getOneBook,
  addBook,
} from "../../database/bookRepository.js";

/**
 *
 * @param ctx
 * @returns {Promise<void>}
 */
async function getBooks(ctx) {
  try {
    const books = getAllBooks();

    ctx.body = {
      data: books,
    };
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      data: [],
      error: e.message,
    };
  }
}

/**
 *
 * @param ctx
 * @returns {Promise<{data: {author: string, name: string, id: number}}|{success: boolean, error: *}|{message: string, status: string}>}
 */
async function getBook(ctx) {
  try {
    const { id } = ctx.params;
    const getCurrentBook = getOneBook(id);
    if (getCurrentBook) {
      return (ctx.body = {
        data: getCurrentBook,
      });
    }

    throw new Error("Book Not Found with that id!");
  } catch (e) {
    ctx.status = 404;
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

/**
 *
 * @param ctx
 * @returns {Promise<{success: boolean, error: *}|{success: boolean}>}
 */
async function save(ctx) {
  try {
    const postData = ctx.request.body;
    addBook(postData);

    ctx.status = 201;
    return (ctx.body = {
      success: true,
    });
  } catch (e) {
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

export { getBooks, getBook, save };
