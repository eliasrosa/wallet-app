'use client'

import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip } from '@/components/ui/chart'
import { TickerTypeColor, TickerTypeLabel } from '@/enums/ticker-enum'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import { WalletEvolutionChartTooltipContent } from '../tooltips/contents/wallet-evolution-chart-content'

type Props = {
	data: {
		month: string
		FII: number
		STOCK: number
	}[]
}

export function WalletEvolutionChart({ data }: Props) {
	const config = {
		ETF: {
			label: TickerTypeLabel.ETF,
			fill: TickerTypeColor.ETF,
		},
		FII: {
			label: TickerTypeLabel.FII,
			fill: TickerTypeColor.FII,
		},
		STOCK: {
			label: TickerTypeLabel.STOCK,
			fill: TickerTypeColor.STOCK,
		},
		RF: {
			label: TickerTypeLabel.RF,
			fill: TickerTypeColor.RF,
		},
	}

	return (
		<ChartContainer config={config} className="mx-auto w-full max-h-[300px]">
			<BarChart accessibilityLayer data={data}>
				<CartesianGrid vertical={false} />
				<XAxis dataKey="month" tickMargin={10} tickLine={false} axisLine={false} tickFormatter={(value) => value} />
				<ChartLegend content={<ChartLegendContent />} />
				<ChartTooltip cursor={false} content={<WalletEvolutionChartTooltipContent />} />
				{config &&
					Object.keys(config).map((key) => (
						<Bar
							key={key}
							dataKey={key}
							stackId="month"
							className="rounded-s-none"
							fill={config[key as keyof typeof config].fill}
						/>
					))}
			</BarChart>
		</ChartContainer>
	)
}
