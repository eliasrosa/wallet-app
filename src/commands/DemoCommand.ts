import { container } from '@/app'
import { TickerRepository } from '@/repositories/database/TickerRepository'
import { RecalculeGoalsService } from '@/services/wallet/RecalculeGoalsService'
import { TYPES } from '@/types'
import { PrismaClient, TickerType } from '@prisma/client'
import type { ImportTickerDataCommand } from './ticker/ImportTickerDataCommand'

const prisma = new PrismaClient()

class DemoCommand {
	async execute(): Promise<void> {
		// clear database
		// await prisma.dividend.deleteMany()
		// await prisma.movement.deleteMany()
		// await prisma.walletTicker.deleteMany()
		// await prisma.wallet.deleteMany()

		// clear
		// import movements
		// import dividends
		// create wallet
		// add tickers to wallet
		// set fixed goals
		// update wallet goals
		// import ticker data by wallet

		// TODO: create wallet service and repository

		// TODO: attach tickers to wallet (service and repository)


		// update wallet goals
		await new RecalculeGoalsService().execute(wallet, TickerType.FII)
		await new RecalculeGoalsService().execute(wallet, TickerType.ETF)
		await new RecalculeGoalsService().execute(wallet, TickerType.STOCK)

		// import ticker data by wallet
		const importTickerDataCommand = await container
			.get<ImportTickerDataCommand>(TYPES.ImportTickerDataCommand)
			.execute(wallet.id)
	}
}

new DemoCommand()
	.execute()
	.then(async () => {
		console.log('Demo executed successfully')
		await prisma.$disconnect()
		process.exit(0)
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
