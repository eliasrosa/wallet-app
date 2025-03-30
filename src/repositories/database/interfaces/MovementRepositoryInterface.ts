import type { Movement } from '@prisma/client'

export interface CreateData {
	tickerId: string
	userId: string
	quantity: number
	price?: number
	total?: number
	isCredit: boolean
	movementTypeId: string
	institutionId: string
	movementAt: Date
}

export interface MovementRepositoryInterface {
	create(data: CreateData): Promise<Movement>
	deleteByYear(userId: string, year: number): Promise<void>
}
