import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class User {
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    return await prisma.user.create({
      data,
    });
  }

  async update(condition: Prisma.UserUpdateArgs) {
    return await prisma.user.update(condition);
  }
}

export default User;
