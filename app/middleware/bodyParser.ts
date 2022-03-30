import { EventEmitter } from "stream";

import type { Context, Next } from "koa";
import { IncomingMessage } from "http";

class IncomingForm extends EventEmitter {
  // constructor(options){

  // }

  write(buffer: any) {}

  parse(req: IncomingMessage) {
    req.on("data", (chunk) => {});

    req.on("end", () => {});

    req.on("error", (err) => {});
  }
}

export default function bodyParser(options = {}) {
  const forms = new IncomingForm(options);

  return (ctx: Context, next: Next) => {
    forms.parse(ctx.req);
  };
}
