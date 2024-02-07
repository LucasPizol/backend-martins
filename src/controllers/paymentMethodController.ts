import { Request, Response } from "express";
import { paymentMethodService } from "../services/paymentMethodService";
import { AuthRequest } from "../middleware/auth";
import { FastifyReply } from "fastify/types/reply";

export abstract class PaymentMethodController {
  static async get(req: AuthRequest, res: FastifyReply) {
    try {
      const paymentMethods = await paymentMethodService.get();
      return res.status(200).send(paymentMethods);
    } catch (error: any) {
      return res.status(400).send({ error: error.message });
    }
  }

  static async create(req: Request, res: Response) {

  }
}
