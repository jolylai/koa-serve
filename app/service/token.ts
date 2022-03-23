import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class Token {
  async create(data: Prisma.TokenCreateInput) {
    return await prisma.token.create({ data });
  }
}
