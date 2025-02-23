import type { DividendType } from '@prisma/client'

export interface DividendTypeRepositoryInterface {
	findOrCreate(name: string): Promise<DividendType>
}
