import { container, inject, injectable } from '@/app'
import type { ImportFiiService } from '@/services/ticker/ImportFiiService'
import { TYPES } from '@/types'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

@injectable()
export class ImportTickerDataCommand {
	@inject(TYPES.ImportFiiService)
	private importFiiService!: ImportFiiService

	async execute(walletId: string): Promise<void> {
		const tickers = await this.getTickersByWallet(walletId)
		console.log('ImportTickerDataCommand.execute', tickers)

		for await (const ticker of tickers) {
			switch (ticker.type) {
				case 'FII':
					await this.importFiiService.execute(ticker.id)
					break
				default:
					console.log('ImportTickerDataCommand.execute', 'unknown ticker type', ticker.type)
					break
			}
		}
	}

	private async getTickersByWallet(walletId: string) {
		const oneHourAgo = new Date()
		oneHourAgo.setHours(oneHourAgo.getHours() - 1)

		return prisma.ticker.findMany({
			where: {
				walletTicker: {
					some: {
						walletId: walletId,
					},
				},
				NOT: {
					datas: {
						some: {
							createdAt: {
								gte: oneHourAgo,
							},
						},
					},
				},
			},
			include: {
				walletTicker: true,
			},
		})
	}
}
