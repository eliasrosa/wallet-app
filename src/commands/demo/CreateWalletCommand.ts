import { prisma } from '@/lib/prisma'
import { TickerRepository } from '@/repositories/database/TickerRepository'
import { RecalculeGoalsService } from '@/services/wallet/RecalculeGoalsService'
import { TickerType } from '@prisma/client'
import { command, positional, run, string } from 'cmd-ts'

const handler = async (args: { walletName: string }) => {
	
	console.log('Creating demo wallet...')
	const { walletName } = args
	const wallet = await prisma.wallet.create({
		data: { goalRF: 0.25,	goalETF: 0.25, goalFII: 0.25,	goalStock: 0.25,	name: walletName},
	})

	console.log('Creating demo wallet tickers...')
	const tickers = (await new TickerRepository().getAll()).map((ticker) => {
		return {
			goal: 0,
			isGoalFixed: false,
			tickerId: ticker.id,
			walletId: wallet.id,
		}
	})

	console.log('Adding tickers to wallet...')
	await prisma.walletTicker.createMany({ data: tickers })

	console.log('Setting goals for tickers...')
	await prisma.walletTicker.update({
		where: { tickerId: 'BOVA11', walletId: wallet.id },
		data: { goal: 0.03, isGoalFixed: true },
	})

	await prisma.walletTicker.update({
		where: { tickerId: 'IVVB11', walletId: wallet.id },
		data: { goal: 0.1, isGoalFixed: true },
	})

	console.log('Setting goals for wallet...')
	await new RecalculeGoalsService().execute(wallet, TickerType.FII)
	await new RecalculeGoalsService().execute(wallet, TickerType.ETF)
	await new RecalculeGoalsService().execute(wallet, TickerType.STOCK)

	await prisma.$disconnect()
	process.exit(0)
}

const cmd = command({
	name: 'demo-create-wallet',
	description: 'Create a demo wallet',
	version: '1.0.0',
	args: {
		walletName: positional({ type: string, description: 'Wallet name', displayName: 'wallet' }),
	},
	handler,
})

run(cmd, process.argv.slice(2))
