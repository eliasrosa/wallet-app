import { Dividend } from "@prisma/client";

export interface DividendCreateData {
  paymentAt: Date;
  quantity?: number | null;
  price?: number | null;
  total: number;
  tickerId: string;
  institutionId: string;
  dividendTypeId: string;
}

export interface DividendRepositoryInterface {
  create(data: DividendCreateData): Promise<Dividend>;
  clearAll(): Promise<void>;
}

