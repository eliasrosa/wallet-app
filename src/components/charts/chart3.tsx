'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent2 } from '@/components/ui/chart'
import { toCurrency, toPercent } from '@/lib/number'
import { Label, Pie, PieChart } from 'recharts'

const getLabelText = (diffPercent: number) => {
	if (diffPercent <= 0.05) return 'Exelente'
	if (diffPercent <= 0.1) return 'Cuidado'
	if (diffPercent <= 0.15) return 'Atenção'
	if (diffPercent <= 0.2) return 'Perigo'
	return 'Crítico'
}

export function Component3() {
	const input = [
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

	const walletTotal = input.reduce((acc, { total }) => acc + total, 0)

	const chartData = input
		.map((item) => {
			const wallet = item.total / walletTotal
			const diff = Math.abs(wallet - item.goal)
			return { ...item, wallet, diff }
		})
		.sort((a, b) => a.diff - b.diff)

	const diffPercent = chartData.reduce((acc, { diff }) => acc + diff, 0)
	const diffTotal = walletTotal * diffPercent

	return (
		<Card className="flex flex-col">
			<CardHeader className="items-center">
				<CardTitle>Equilíbrio da Carteira</CardTitle>
				<CardDescription>Exibe o quanto saúdavel está sua carteira</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={{}} className="mx-auto aspect-square max-h-[250px]">
					<PieChart>
						<ChartTooltip cursor={false} content={<ChartTooltipContent2 />} />
						<Pie data={chartData} dataKey="diff" nameKey="name" innerRadius={80} strokeWidth={5}>
							<Label
								color="var(--chart-1)"
								content={({ viewBox }) => {
									if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
										return (
											<text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
												<tspan
													x={viewBox.cx}
													y={viewBox.cy}
													className="fill-foreground text-3xl font-bold text-blue-800"
												>
													{toPercent(diffPercent, 1)}
												</tspan>
												<tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
													{getLabelText(diffPercent)}
												</tspan>
											</text>
										)
									}
								}}
							/>
						</Pie>
					</PieChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="text-sm">
				<div className="leading-none text-muted-foreground font-medium text-center">
					Serão necessários aproximadamente <strong>{toCurrency(diffTotal)}</strong> em novos aportes para o
					rebalanceamento ideal
				</div>
			</CardFooter>
		</Card>
	)
}
