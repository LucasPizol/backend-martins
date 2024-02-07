import { Request, Response } from "express";
import { PermissionService } from "../services/permissionService";
import { AuthRequest } from "../middleware/auth";
import { FastifyReply } from "fastify/types/reply";

export abstract class PermissionController {
  static async addPermission(req: AuthRequest, res: FastifyReply) {
    const { data } = req.body as any;
    const { permission } = req.user!;

    if (!permission?.includes("Admin")) {
      return res.status(401).send({ error: "Não Autorizado" });
    }

    try {
      const permissions = await PermissionService.addPermission(data);
      return res.status(204).send(permissions);
    } catch (error: any) {
      return res.status(400).send({ error: error.message });
    }
  }
}
