import { Movement } from '@prisma/client';

export interface CreateData {
  hash: string;
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
