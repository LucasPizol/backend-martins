import { Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { FinanceService } from "../services/financeService";
import { CompanyService } from "../services/companyService";
import { SumService } from "../services/sumService";
import { FastifyReply } from "fastify/types/reply";

export abstract class SumController {
  static async get(req: AuthRequest, res: FastifyReply) {
    const { permission } = req.user!;

    if (!permission?.includes("Admin") && !permission?.includes("Financeiro")) {
      return res.status(401).send({ error: "Não autorizado" });
    }

    try {
      const companies = await CompanyService.get();

      const sumValues = SumService.getSumCompanies(companies);

      const data = sumValues.reduce(
        (
          accum: { myCompanies: any[]; otherCompanies: any[] },
          company: any
        ) => {
          const accumCopy = { ...accum };

          if (company.own) {
            accumCopy.myCompanies.push(company);

            return accumCopy;
          }

          accumCopy.otherCompanies.push(company);

          return accumCopy;
        },
        { myCompanies: [], otherCompanies: [] }
      );

      return res.status(200).send(data);
    } catch (error: any) {
      return res.status(400).send({ error: error.message });
    }
  }
}
