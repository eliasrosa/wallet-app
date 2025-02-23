import type { DividendType } from '@prisma/client'

export interface InstitutionRepositoryInterface {
	findOrCreate(name: string): Promise<DividendType>
}
