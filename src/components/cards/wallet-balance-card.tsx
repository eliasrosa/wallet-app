'use client'

import { toCurrency } from '@/lib/number'
import React from 'react'
import { WalletBalanceChart, calculeWalletBalanceChartData } from '../charts/wallet-balance-chart'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'

export const WalletBalanceCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => {
		const data = [
			{
				name: 'RF',
				goal: 0.1,
				total: 9950,
				label: 'Renda Fixa',
				fill: 'hsl(var(--chart-3))',
			},
			{
				name: 'FII',
				goal: 0.5,
				total: 44843.6,
				label: 'Fundos Imobiliários',
				fill: 'hsl(var(--chart-1))',
			},
			{
				name: 'ETF',
				goal: 0.2,
				total: 20950.13,
				label: 'ETF',
				fill: 'hsl(var(--chart-2))',
			},
			{
				name: 'STOCK',
				goal: 0.2,
				total: 15977.56,
				label: 'Ações',
				fill: 'hsl(var(--chart-5))',
			},
		]

		const { diffTotal } = calculeWalletBalanceChartData(data)

		return (
			<Card className={className} {...props}>
				<CardHeader>
					<CardTitle>Equilíbrio da Carteira</CardTitle>
					<CardDescription>Exibe o quanto saúdavel está sua carteira</CardDescription>
				</CardHeader>
				<CardContent>
					<WalletBalanceChart data={data} />
				</CardContent>
				<CardFooter className="text-sm">
					<div className="leading-none text-muted-foreground font-medium text-center">
						Serão necessários aproximadamente <strong>{toCurrency(diffTotal)}</strong> em novos aportes para o
						rebalanceamento ideal
					</div>
				</CardFooter>
			</Card>
		)
	},
)
