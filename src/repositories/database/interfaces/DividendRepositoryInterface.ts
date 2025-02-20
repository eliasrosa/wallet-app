import { Dividend } from "@prisma/client";

export interface CreateData {
  hash: string;
  paymentAt: Date;
  quantity?: number | null;
  price?: number | null;
  total: number;
  tickerId: string;
  institutionId: string;
  dividendTypeId: string;
}

export interface DividendRepositoryInterface {
  create(data: CreateData): Promise<Dividend>;
  clearAll(): Promise<void>;
}

