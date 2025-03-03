import type { InstitutionRepositoryInterface } from '@/repositories/database/interfaces/InstitutionRepositoryInterface'
import { type Institution, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class InstitutionRepository implements InstitutionRepositoryInterface {
	async findOrCreate(name: string): Promise<Institution> {
		console.log('InstitutionRepository.findOrCreate', name)
		return prisma.institution.upsert({
			where: { name },
			create: { name },
			update: {},
		})
	}
}
