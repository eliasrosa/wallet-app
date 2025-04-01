import { prisma } from '@/lib/prisma'
import { orderBy } from 'lodash'
import type { NextApiRequest } from 'next'
import { NextResponse } from 'next/server'

type Params = {
	params: Promise<{
		walletId: string
	}>
}

export const GET = async (req: NextApiRequest, { params }: Params) => {
	const { walletId } = await params

	const negotiationTypeIdPurchase = 'cm8wbry320001rq17q376q5xi' // TODO: Move to env variable
	const negotiationTypeIdSale = 'cm8wbs0un00cprq2ylqppyoe2' // TODO: Move to env variable
	const movementTypeIdUnfolding = 'cm8wbru3t00sarqxrgv4g9gm7' // TODO: Move to env variable

	// Get the wallet tickers from the database
	const walletTickers = await prisma.walletTicker.findMany({
		where: {
			walletId,
		},
		include: {
			wallet: {
				select: {
					id: true,
					name: true,
				},
			},
			ticker: {
				select: {
					id: true,
					name: true,
					type: true,
				},
			},
		},
	})

	// Add negotiation data for each ticker
	const enrichedWalletTickers = await Promise.all(
		walletTickers.map(async (ticker) => {
			console.log('ticker', ticker)

			const { tickerId } = ticker

			const negotiationSale = await prisma.negotiation.aggregate({
				where: { tickerId, movementTypeId: negotiationTypeIdSale },
				_sum: { total: true, quantity: true },
			})

			const negotiationPurchase = await prisma.negotiation.aggregate({
				where: { tickerId, movementTypeId: negotiationTypeIdPurchase },
				_sum: { total: true, quantity: true },
			})

			const movementUnfolding = await prisma.movement.aggregate({
				where: { tickerId, movementTypeId: movementTypeIdUnfolding },
				_sum: { quantity: true },
			})

			const negotiationTotal = {
				total: (negotiationPurchase._sum.total || 0) - (negotiationSale._sum.total || 0),
				quantity:
					(negotiationPurchase._sum.quantity || 0) +
					(movementUnfolding._sum.quantity || 0) -
					(negotiationSale._sum.quantity || 0),
			}

			const averagePrice = negotiationTotal.quantity > 0 ? negotiationTotal.total / negotiationTotal.quantity : 0

			const metrics = {
				averagePrice,
				negotiationTotal: negotiationTotal.total,
				negotiationSale: negotiationSale._sum.total || 0,
				negotiationPurchase: negotiationPurchase._sum.total || 0,
				negotiationQuantityTotal: negotiationTotal.quantity,
				negotiationQuantityPurchase: negotiationPurchase._sum.quantity || 0,
				negotiationQuantitySale: negotiationSale._sum.quantity || 0,
				movementQuantityUnfolding: movementUnfolding._sum.quantity || 0,
			}

			return { ...ticker, metrics }
		}),
	)

	return NextResponse.json({ data: orderBy(enrichedWalletTickers, 'metrics.negotiationTotal', 'desc') })
}
