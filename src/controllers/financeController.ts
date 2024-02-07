import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { FinanceService, FinanceType } from "../services/financeService";
import { FastifyReply } from "fastify/types/reply";

export abstract class FinanceController {
  static async create(req: AuthRequest, res: FastifyReply) {
    const { id, permission } = req.user!;

    if (!permission?.includes("Admin") && !permission?.includes("Financeiro")) {
      return res.status(401).send({ error: "Não Autorizado" });
    }

    const { array } = req.body as any;

    const data = array.map((item: FinanceType) => {
      return {
        ...item,
        payment_date: new Date(item.payment_date),
        userId: id,
      };
    });

    try {
      const newFinance = await FinanceService.create(data);
      return res.status(200).send(newFinance);
    } catch (error: any) {
      return res.status(400).send({ error: error.message });
    }
  }

  static async get(req: AuthRequest, res: FastifyReply) {
    const { permission } = req.user!;

    if (!permission?.includes("Admin") && !permission?.includes("Financeiro")) {
      return res.status(401).send({ error: "Não autorizado" });
    }

    try {
      const financies = await FinanceService.get();
      return res.status(200).send(financies);
    } catch (error: any) {
      return res.status(400).send({ error: error.message });
    }
  }
}
