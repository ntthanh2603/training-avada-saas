import * as yup from "yup";

async function bookInputMiddleware(ctx, next) {
  try {
    const postData = ctx.request.body;
    let schema = yup.object().shape({
      id: yup.number().positive().integer().required(),
      name: yup.string().required(),
      author: yup.string().required(),
    });

    await schema.validate(postData);
    await next();
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      errors: e.errors,
      errorName: e.name,
    };
  }
}

export default bookInputMiddleware;
