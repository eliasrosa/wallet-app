import { DividendCreateData, DividendRepositoryInterface } from "@/interfaces/repositories/database/DividendRepositoryInterface";
import { Dividend, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export class DividendRepository implements DividendRepositoryInterface {
  async create(data: DividendCreateData): Promise<Dividend> {
    console.log('DividendRepository.create', data);
    return await prisma.dividend.create({
      data: {
        paymentAt: data.paymentAt,
        quantity: data.quantity,
        price: data.price,
        total: data.total,
        ticker: { connect: { id: data.tickerId } },
        institution: { connect: { id: data.institutionId } },
        dividendType: { connect: { id: data.dividendTypeId } }
      }
    })
  }
}