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
			},
			{
				name: 'FII',
				goal: 0.5,
				total: 44843.6,
			},
			{
				name: 'ETF',
				goal: 0.2,
				total: 20950.13,
			},
			{
				name: 'STOCK',
				goal: 0.2,
				total: 15977.56,
			},
		]

		const { diffTotal } = calculeWalletBalanceChartData(data)

		return (
			<Card className={className} {...props}>
				<CardHeader>
					<CardTitle>Distribuição da Carteira</CardTitle>
					<CardDescription>Mostra, em porcentagem, o desvio em relação à sua estratégia</CardDescription>
				</CardHeader>
				<CardContent>
					<WalletBalanceChart data={data} />
				</CardContent>
				<CardFooter className="text-sm">
					<div className="leading-none text-muted-foreground font-medium text-center">
						Para um balanceamento ideal, é necessário um aporte adicional de <strong>{toCurrency(diffTotal)}</strong>
					</div>
				</CardFooter>
			</Card>
		)
	},
)
