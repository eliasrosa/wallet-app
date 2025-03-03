import { PrismaClient, TickerType, type Wallet } from '@prisma/client'
import { sumBy } from 'lodash'

const prisma = new PrismaClient()

export class RecalculeGoalsService {
	async execute(wallet: Wallet, type: TickerType): Promise<void> {
		const totalGoal = this.getWalletGoal(wallet, type)
		const tickers = await this.getWalletTickerWithoutGoal(wallet, type)
		const tickersWithGoalFixed = await this.getWalletTickerWithGoalFixed(wallet, type)

		if (tickers.length === 0) {
			return
		}

		const totalGoalFixed = sumBy(tickersWithGoalFixed, 'goal')
		const totalGoalDistributed = totalGoal - totalGoalFixed
		const goalDistributed = totalGoalDistributed / tickers.length

		await prisma.walletTicker.updateMany({
			where: {
				isGoalFixed: false,
				walletId: wallet.id,
				tickerId: { in: tickers.map((ticker) => ticker.tickerId) },
			},
			data: {
				goal: goalDistributed,
			},
		})
	}

	private getWalletGoal(wallet: Wallet, type: TickerType) {
		switch (type) {
			case TickerType.FII:
				return wallet.goalFII
			case TickerType.STOCK:
				return wallet.goalStock
			case TickerType.ETF:
				return wallet.goalETF
			default:
				throw new Error('Invalid ticker type')
		}
	}

	private async getWalletTickerWithoutGoal(wallet: Wallet, type: TickerType) {
		return await prisma.walletTicker.findMany({
			where: {
				isGoalFixed: false,
				walletId: wallet.id,
				ticker: { type },
			},
		})
	}

	private async getWalletTickerWithGoalFixed(wallet: Wallet, type: TickerType) {
		return await prisma.walletTicker.findMany({
			where: {
				isGoalFixed: true,
				walletId: wallet.id,
				ticker: { type },
			},
		})
	}
}
