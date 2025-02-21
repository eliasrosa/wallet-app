import { MovementTypeRepositoryInterface } from '@/repositories/database/interfaces/MovementTypeRepositoryInterface';
import { Institution, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class MovementTypeRepository implements MovementTypeRepositoryInterface {
  async findOrCreate(name: string): Promise<Institution> {
    console.log('MovementTypeRepository.findOrCreate', name);
    return await prisma.movementType.upsert({
      where: { name },
      create: { name },
      update: {},
    });
  }
}
