import { Context, Next } from "koa";

/**
 *
 * @param {Object} options
 * @param {Number} options.maxage 缓存时间
 * @param {Number} options.immutable https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control
 */

interface ISendOptions {
  maxage: number;
  immutable: boolean;
}

function send(options: ISendOptions) {
  const { maxage = 0, immutable = false } = options;

  return async function (ctx: Context, next: Next) {
    // 缓存
    if (!ctx.response.get("Last-Modified"))
      ctx.set("Last-Modified", stats.mtime.toUTCString());

    if (!ctx.response.get("Cache-Control")) {
      const directives = [`max-age=${(maxage / 1000) | 0}`];
      if (immutable) {
        directives.push("immutable");
      }
      ctx.set("Cache-Control", directives.join(","));
    }
    if (!ctx.type) ctx.type = type(path, encodingExt);
  };
}

module.exports = send;
