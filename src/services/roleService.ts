import { prisma } from "../prisma";

export abstract class RoleService {
  static async get() {
    const roles = await prisma.role.findMany();
    return roles;
  }
}
