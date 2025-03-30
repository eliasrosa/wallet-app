
import type { WalletTicker } from '@prisma/client'
import type { WalletDataTable } from './columns'

type WalletData = {
	data: (WalletTicker & {
		wallet: {
			id: string
			name: string
		}
		averagePrice: number
		movementTotal: number
		movementSale: number
		movementPurchase: number
		movementQuantityTotal: number
		movementQuantityPurchase: number
		movementQuantitySale: number
	})[]
}

export const getData = async (walletId: string): Promise<WalletDataTable[]> => {
	const res = await fetch(`http://localhost:3000/api/v1/wallet/${walletId}`)

	if (!res.ok) {
		throw new Error('Failed to fetch data')
	}

	const {data: tickers} = await res.json() as WalletData

	console.log(tickers)

	return tickers.map((ticker) => ({
		tickerId: ticker.tickerId,
		walletName: ticker.wallet.name,
		averagePrice: ticker.averagePrice,
		movementSale: ticker.movementSale,
		movementTotal: ticker.movementTotal,
		movementPurchase: ticker.movementPurchase,
		movementQuantitySale: ticker.movementQuantitySale,
		movementQuantityTotal: ticker.movementQuantityTotal,
		movementQuantityPurchase: ticker.movementQuantityPurchase,
	}))
}
