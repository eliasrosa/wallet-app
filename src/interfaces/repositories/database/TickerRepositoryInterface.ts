import { Ticker} from "@prisma/client";

export interface TickerRepositoryInterface {
  findOrCreate(symbol: string, name: string): Promise<Ticker>;
}

