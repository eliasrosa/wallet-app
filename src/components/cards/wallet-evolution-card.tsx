import React from 'react'
import { WalletEvolutionChart } from '../charts/wallet-evolution-chart'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'

export const WalletEvolutionCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => {
		const data = [
			{ month: 'Mar/25', FII: 100, RF: 0, ETF: 0, STOCK: 0 },
			{ month: 'Fev/25', FII: 120, RF: 15, ETF: 0, STOCK: 0 },
			{ month: 'Jan/25', FII: 135, RF: 15, ETF: 0, STOCK: 0 },
			{ month: 'Dez/24', FII: 135, RF: 20, ETF: 0, STOCK: 0 },
			{ month: 'Nov/24', FII: 150, RF: 20, ETF: 0, STOCK: 0 },
			{ month: 'Out/24', FII: 180, RF: 40, ETF: 0, STOCK: 0 },
			{ month: 'Set/24', FII: 158, RF: 50, ETF: 20, STOCK: 20 },
			{ month: 'Ago/24', FII: 165, RF: 55, ETF: 35, STOCK: 50 },
			{ month: 'Jul/24', FII: 180, RF: 55, ETF: 35, STOCK: 75 },
			{ month: 'Jun/24', FII: 197, RF: 68, ETF: 20, STOCK: 105 },
			{ month: 'Mai/24', FII: 210, RF: 80, ETF: 20, STOCK: 105 },
			{ month: 'Abr/24', FII: 205, RF: 80, ETF: 15, STOCK: 130 },
		]

		return (
			<Card className={className} {...props}>
				<CardHeader>
					<CardTitle>Evolução Patrimonial</CardTitle>
					<CardDescription>Acompanhe a evolução do seu patrimônio nos últimos 12 meses</CardDescription>
				</CardHeader>
				<CardContent>
					<WalletEvolutionChart data={data} />
				</CardContent>
			</Card>
		)
	},
)
