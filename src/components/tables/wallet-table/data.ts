import type { WalletTicker } from '@prisma/client'
import type { WalletDataTable } from './columns'

type WalletData = {
	data: (WalletTicker & {
		wallet: {
			id: string
			name: string
		}
		averagePrice: number
		negotiationTotal: number
		negotiationSale: number
		negotiationPurchase: number
		negotiationQuantityTotal: number
		negotiationQuantityPurchase: number
		negotiationQuantitySale: number
	})[]
}

export const getData = async (walletId: string): Promise<WalletDataTable[]> => {
	const res = await fetch(`http://localhost:3000/api/v1/wallet/${walletId}`)

	if (!res.ok) {
		throw new Error('Failed to fetch data')
	}

	const { data: tickers } = (await res.json()) as WalletData

	return tickers.map((ticker) => ({
		tickerId: ticker.tickerId,
		walletName: ticker.wallet.name,
		averagePrice: ticker.averagePrice,
		negotiationSale: ticker.negotiationSale,
		negotiationTotal: ticker.negotiationTotal,
		negotiationPurchase: ticker.negotiationPurchase,
		negotiationQuantitySale: ticker.negotiationQuantitySale,
		negotiationQuantityTotal: ticker.negotiationQuantityTotal,
		negotiationQuantityPurchase: ticker.negotiationQuantityPurchase,
	}))
}
