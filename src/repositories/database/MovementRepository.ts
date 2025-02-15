import { CreateData, MovementRepositoryInterface } from "@/interfaces/repositories/database/MovementRepositoryInterface";
import { Movement, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export class MovementRepository implements MovementRepositoryInterface {
  async create(data: CreateData): Promise<Movement> {
    console.log('MovementRepository.create', data);
    return await prisma.movement.create({
      data: {
        quantity: data.quantity,
        price: data.price,
        total: data.total,
        isCredit: data.isCredit,
        movementAt: data.movementAt,
        ticker: { connect: { id: data.tickerId } },
        movementType: { connect: { id: data.movementTypeId } },
        institution: { connect: { id: data.institutionId } },
      }
    })
  }

  async clearAll(): Promise<void> {
    console.log('DividendTypeRepository.clearAll');
    await prisma.movement.deleteMany()
  }
}