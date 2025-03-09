'use client'

import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip } from '@/components/ui/chart'
import { TickerTypeColor, TickerTypeLabel } from '@/ticker-enum'
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
			<BarChart accessibilityLayer data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
				<CartesianGrid vertical={false} />
				<XAxis dataKey="month" tickMargin={10} tickLine={false} axisLine={false} tickFormatter={(value) => value} />
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
				<ChartLegend className="relative top-4" content={<ChartLegendContent />} />
			</BarChart>
		</ChartContainer>
	)
}
