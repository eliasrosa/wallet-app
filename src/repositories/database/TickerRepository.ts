import { TickerRepositoryInterface } from "@/interfaces/repositories/database/TickerRepositoryInterface";
import { Ticker, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export class TickerRepository implements TickerRepositoryInterface {

  async getAll(): Promise<Ticker[]> {
    console.log('TickerRepository.getAll');
    return await prisma.ticker.findMany({
      where: { id: { not: { endsWith: '12' } } },
    })
  }

  async findOrFail(id: string): Promise<Ticker> {
    console.log('TickerRepository.findOrFail', { id });
    const ticker = await prisma.ticker.findUnique({ where: { id } })
    if (!ticker) {
      throw new Error('Ticker not found')
    }

    return ticker
  }

  async findOrCreate(symbol: string, name: string): Promise<Ticker> {
    console.log('TickerRepository.findOrCreate', { symbol, name });

    return await prisma.ticker.upsert({
      where: { id: symbol },
      update: { name },
      create: {
        id: symbol,
        name,
      }
    })
  }
}