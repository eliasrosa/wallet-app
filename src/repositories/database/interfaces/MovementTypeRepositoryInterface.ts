import { MovementType } from '@prisma/client';

export interface MovementTypeRepositoryInterface {
  findOrCreate(name: string): Promise<MovementType>;
}
