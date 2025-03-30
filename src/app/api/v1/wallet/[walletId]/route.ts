import { prisma } from '@/lib/prisma'
import type { NextApiRequest } from 'next'
import { NextResponse } from 'next/server'

type Params = {
	params: Promise<{
		walletId: string
	}>
}

export const GET = async (req: NextApiRequest, { params }: Params) => {
	const { walletId } = await params

	// Get the wallet tickers from the database
	const walletTickers = await prisma.walletTicker.findMany({
			where: { 
				walletId,
				ticker: {
					type: {
						equals: 'FII',
					},
					id: {
						equals: 'KNCR11',
					},
				}
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
					}
				},
			},
	})

  // Add movement data for each ticker
  const enrichedWalletTickers = await Promise.all(
    walletTickers.map(async (ticker) => {
      const movementSale = await prisma.movement.aggregate({
        where: { tickerId: ticker.tickerId, isCredit: false, movementTypeId: 'cm8vufbj10001pbkc29ko9ke7' },
        _sum: { total: true, quantity: true },
      })

      const movementPurchase = await prisma.movement.aggregate({
        where: { tickerId: ticker.tickerId, isCredit: true, movementTypeId: 'cm8vufbj10001pbkc29ko9ke7' },
        _sum: { total: true, quantity: true },
      })

      const movementTotal = {
        total: (movementPurchase._sum.total || 0) - (movementSale._sum.total || 0),
        quantity: (movementPurchase._sum.quantity || 0) - (movementSale._sum.quantity || 0),
      }

      const averagePrice = movementTotal.quantity > 0 
        ? movementTotal.total / movementTotal.quantity 
        : 0

      return {
        ...ticker,
				averagePrice,
				movementTotal: movementTotal.total,
        movementSale: movementSale._sum.total || 0,
        movementPurchase: movementPurchase._sum.total || 0,
				movementQuantityTotal: movementTotal.quantity,
				movementQuantityPurchase: movementPurchase._sum.quantity || 0,
				movementQuantitySale: movementSale._sum.quantity || 0,
      }
    })
  )

  return NextResponse.json({ data: enrichedWalletTickers })
}
