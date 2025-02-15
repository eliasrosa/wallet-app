import { Movement } from "@prisma/client";

export interface CreateData {
  tickerId: string;
  quantity: number;
  price?: number;
  total?: number;
  movementTypeId: string;
  institutionId: string;
  expiredAt: Date;
  movementAt: Date;
}

export interface MovementRepositoryInterface {
  create(data: CreateData): Promise<Movement>;
  clearAll(): Promise<void>;
}

