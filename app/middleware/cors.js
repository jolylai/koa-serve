function cors() {
  return function(ctx, next) {
    // ctx.set("Access-Control-Allow-Methods", "GET,POST");
    next();
    ctx.set("Access-Control-Allow-Origin", "*");
  };
}

module.exports = cors;
