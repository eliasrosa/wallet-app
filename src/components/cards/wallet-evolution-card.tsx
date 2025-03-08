'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'

export const WalletEvolutionCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => {
		const data = [
			{ month: 'Mar/25', wallet: 100 },
			{ month: 'Fev/25', wallet: 100 },
			{ month: 'Jan/25', wallet: 100 },
			{ month: 'Dez/24', wallet: 100 },
			{ month: 'Nov/24', wallet: 100 },
			{ month: 'Out/24', wallet: 100 },
			{ month: 'Set/24', wallet: 100 },
			{ month: 'Ago/24', wallet: 100 },
			{ month: 'Jul/24', wallet: 100 },
			{ month: 'Jun/24', wallet: 100 },
			{ month: 'Mai/24', wallet: 100 },
			{ month: 'Abr/24', wallet: 100 },
		]

		return (
			<Card className={className} {...props}>
				<CardHeader>
					<CardTitle>Evolução patrimonial</CardTitle>
					<CardDescription>Acompanhe a evolução do seu patrimônio</CardDescription>
				</CardHeader>
				<CardContent>{/* <WalletBalanceChart data={data} /> */}</CardContent>
			</Card>
		)
	},
)
