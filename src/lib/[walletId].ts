

import type { NextApiRequest } from 'next'
// import { prisma } from '@/lib/prisma'
// import { NextResponse } from 'next/server'

export default async (req: NextApiRequest) => {
	console.log('xxxxxxxxxxx', req.query)

  // // Get the wallet tickers from the database
	// const walletTickers = await prisma.walletTicker.findMany({
	// 	where: {
	// 		walletId: req.query.walletId as string,
	// 	},
	// })

  // const tickers 

	// return NextResponse.json({ data: walletTickers })
}
