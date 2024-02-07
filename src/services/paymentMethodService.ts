import { prisma } from "../prisma";

export abstract class paymentMethodService {
  static async get() {
    const paymentMethods = await prisma.paymentMethod.findMany();
    return paymentMethods;
  }
}