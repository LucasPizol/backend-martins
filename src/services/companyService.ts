import { prisma } from "../prisma";

export abstract class CompanyService {
  static async get() {
    const companies = await prisma.company.findMany({
      include: {
        my_company: true,
        other_company: true,
      },
    });
    return companies;
  }

  static async update(id: number, name: string) {
    await prisma.company.update({
      data: {
        name,
      },
      where: {
        id,
      },
    });
  }

  static async getMyCompanies() {
    const companies = await prisma.company.findMany({
      include: {
        my_company: true,
        other_company: true,
      },
      where: {
        own: true,
      },
    });
    return companies;
  }

  static async getOtherCompanies() {
    const companies = await prisma.company.findMany({
      include: {
        my_company: true,
        other_company: true,
      },
      where: {
        own: false,
      },
    });
    return companies;
  }
}
