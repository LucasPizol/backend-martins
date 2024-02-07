import { prisma } from "../prisma";

type PermissionArray = {
  roleId: number;
  userId: number;
}[];

export abstract class PermissionService {
  static async addPermission(array: PermissionArray) {
    const permissions = await prisma.permission.createMany({
      data: array,
    });

    return permissions;
  }
}
