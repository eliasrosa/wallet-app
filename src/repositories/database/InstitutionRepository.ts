import { InstitutionRepositoryInterface } from "@/interfaces/repositories/database/InstitutionRepositoryInterface";
import { Institution, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export class InstitutionRepository implements InstitutionRepositoryInterface {
  async findOrCreate(name: string): Promise<Institution> {
    console.log('InstitutionRepository.findOrCreate', name);
    return await prisma.institution.upsert({
      where: { name },
      create: { name },
      update: {},
    })
  }
}