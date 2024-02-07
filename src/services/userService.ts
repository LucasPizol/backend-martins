import { prisma } from "../prisma";

export abstract class UserService {
  static async getByUsername(username: string) {
    const user = await prisma.user.findFirst({
      where: {
        username,
      },
      include: {
        permission: {
          include: {
            role: true,
          },
        },
      },
    });

    const formattedUsers = user?.permission.map(
      (permission) => permission.role.name
    );

    return {
      ...user,
      permission: formattedUsers,
    };
  }

  static async login(username: string, password: string) {

  }
}
