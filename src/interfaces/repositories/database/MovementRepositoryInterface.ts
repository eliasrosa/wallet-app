import { Movement } from "@prisma/client";

export interface CreateData {
  tickerId: string;
  quantity: number;
  price?: number;
  total?: number;
  isCredit: boolean;
  movementTypeId: string;
  institutionId: string;
  movementAt: Date;
}

export interface MovementRepositoryInterface {
  create(data: CreateData): Promise<Movement>;
  clearAll(): Promise<void>;
}

