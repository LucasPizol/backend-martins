import { Request, Response } from "express";
import { RoleService } from "../services/roleService";
import { AuthRequest } from "../middleware/auth";
import { FastifyReply } from "fastify/types/reply";

export abstract class RoleController {
  static async get(req: AuthRequest, res: FastifyReply) {
    try {
      const roles = await RoleService.get();
      return res.status(200).send(roles);
    } catch (error: any) {
      return res.status(400).send({ error: error.message });
    }
  }
}
