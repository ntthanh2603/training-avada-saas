import {
  getAll,
  getOne,
  add,
  update,
  del,
} from "../../database/productRepository.js";

async function getProducts(ctx) {
  try {
    const products = getAll();

    ctx.body = {
      data: products,
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

async function getProduct(ctx) {
  try {
    const { id } = ctx.params;
    const getCurrentProduct = getOne(id);
    if (getCurrentProduct) {
      return (ctx.body = {
        data: getCurrentProduct,
      });
    }

    throw new Error("Product Not Found with that id!");
  } catch (e) {
    ctx.status = 404;
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

async function save(ctx) {
  try {
    const postData = ctx.request.body;
    add(postData);

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

async function deleteProduct(ctx) {
  try {
    const { id } = ctx.params;

    const result = del(id);

    ctx.status = 200;
    return (ctx.body = {
      success: true,
      message: result,
    });
  } catch (e) {
    ctx.status = 500;
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

async function updateProduct(ctx) {
  try {
    const { id } = ctx.params;
    const data = ctx.request.body;

    const result = update(parseInt(id), data);

    ctx.status = 200;
    return (ctx.body = {
      success: true,
      data: result,
    });
  } catch (e) {
    ctx.status = 500;
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

function getFilterProducts(ctx) {
  const { limit, sort } = ctx.query;
  try {
    const products = getAll();
    let result = [];

    if (sort) {
      result = products.data.sort((a, b) => {
        if (sort === "asc") {
          return new Date(a.createdAt) - new Date(b.createdAt);
        } else {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
      });
    } else {
      result = products.data;
    }
    if (limit) result = result.slice(0, limit);
    else result = result.slice(0, 10);

    ctx.status = 200;
    return (ctx.body = {
      data: result.length ? result : result,
      limit: limit || 10,
      sort: sort || "default",
      success: true,
    });
  } catch (e) {
    ctx.status = 500;
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

export {
  getProducts,
  getProduct,
  save,
  updateProduct,
  deleteProduct,
  getFilterProducts,
};
