import type { Ticker, Wallet, WalletTicker } from '@prisma/client'
import type { WalletDataTable } from './columns'

type WalletTickerRow = WalletTicker & {
	ticker: Ticker
	wallet: Wallet
	metrics: {
		averagePrice: number
		negotiationTotal: number
		negotiationSale: number
		negotiationPurchase: number
		negotiationQuantityTotal: number
		negotiationQuantityPurchase: number
		negotiationQuantitySale: number
		movementQuantityUnfolding: number
	}
}

type WalletTickerResponse = {
	data: WalletTickerRow[]
}

export const getData = async (walletId: string): Promise<WalletDataTable[]> => {
	const res = await fetch(`http://localhost:3000/api/v1/wallet/${walletId}`)

	if (!res.ok) {
		throw new Error('Failed to fetch data')
	}

	const { data: tickers } = (await res.json()) as WalletTickerResponse

	return tickers.map((row) => ({
		tickerId: row.tickerId,
		tickerType: row.ticker.type,
		walletName: row.wallet.name,
		...row.metrics,
	}))
}
