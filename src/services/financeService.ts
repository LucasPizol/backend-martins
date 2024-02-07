import { prisma } from "../prisma";

export type FinanceType = {
  value: number;
  payment_date: Date;
  received: boolean;
  my_company_id: number;
  other_company_id: number;
  payment_method_id: number;
  userId: number;
};

export abstract class FinanceService {
  static async create(finance: FinanceType[]) {
    const newFinance = await prisma.finance.createMany({
      data: finance,
    });

    return newFinance;
  }

  static async get() {
    const financies = await prisma.finance.findMany({
      include: {
        my_company: true,
        other_company: true,
      },
    });
    return financies;
  }
}
