import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;

export function sign(data: any) {
  return jwt.sign(data, JWT_SECRET!);
}

export function verify(data: any) {
  return jwt.verify(data, JWT_SECRET!);
}

export default { sign, verify };
