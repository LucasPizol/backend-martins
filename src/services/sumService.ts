import { Company } from "@prisma/client";

export abstract class SumService {
  static getSumCompanies(companies: any) {
    const dataFormatted = companies.map((company: any) => {
      const sumValue = company.my_company.reduce(
        (accum: number, current: any) => {
          return current.received
            ? accum + current.value
            : accum - current.value;
        },
        0
      );

      const subtractValue = company.other_company.reduce(
        (accum: number, current: any) => {
          return current.received
            ? accum + current.value
            : accum - current.value;
        },
        0
      );

      return {
        company: company.name,
        own: company.own,
        sum: sumValue - subtractValue,
      };
    });

    return dataFormatted;
  }
}
