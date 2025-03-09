'use client'

import React from 'react'
import { WalletTickerTypeGoalChart } from '../charts/wallet-ticker-type-goal-chart'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'

export const WalletTickerTypeGoalCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => {
		const data = [
			{
				name: 'RF',
				goal: 0.25,
				total: 9950,
			},
			{
				name: 'ETF',
				goal: 0.25,
				total: 20950.13,
			},
			{
				name: 'FII',
				goal: 0.25,
				total: 44843.6,
			},

			{
				name: 'STOCK',
				goal: 0.25,
				total: 15977.56,
			},
		]

		return (
			<Card className={className} {...props}>
				<CardHeader>
					<CardTitle>Carteira x Meta</CardTitle>
					<CardDescription>Controle de metas por tipos de ativos da sua carteira</CardDescription>
				</CardHeader>
				<CardContent>
					<WalletTickerTypeGoalChart data={data} />
				</CardContent>
			</Card>
		)
	},
)
