export default async function hello(ctx) {
  ctx.body = {
    message: "Hello, World!",
    timestamp: new Date().toISOString(),
  };
}
