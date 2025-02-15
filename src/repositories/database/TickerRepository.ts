import { TickerRepositoryInterface } from "@/interfaces/repositories/database/TickerRepositoryInterface";
import { Ticker, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export class TickerRepository implements TickerRepositoryInterface {
  async findOrCreate(symbol: string, name: string): Promise<Ticker> {
    console.log('TickerRepository.findOrCreate', { symbol, name });

    return await prisma.ticker.upsert({
      where: { id: symbol },
      update: {},
      create: {
        id: symbol,
        name: name,
      }
    })
  }
}