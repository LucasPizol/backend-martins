import { Request, Response } from "express";
import { CompanyService } from "../services/companyService";
import { AuthRequest } from "../middleware/auth";
import { FastifyReply } from "fastify/types/reply";
import { FastifyRequest } from "fastify/types/request";

export abstract class CompanyController {
  static async get(req: FastifyRequest, res: FastifyReply) {
    try {
      const companies = await CompanyService.get();
      return res.status(200).send(companies);
    } catch (error: any) {
      return res.status(400).send({ error: error.message });
    }
  }

  static async update(req: AuthRequest, res: FastifyReply) {
    const { name } = req.body as any;
    const { id } = req.params as any;
    const { permission } = req.user!;

    if (!permission?.includes("Admin") && !permission?.includes("Financeiro")) {
      return res.status(401).send({ error: "Não Autorizado" });
    }

    try {
      await CompanyService.update(Number(id), name);
      return res.status(204).send();
    } catch (error: any) {
      return res.status(400).send({ error: error.message });
    }
  }
}
