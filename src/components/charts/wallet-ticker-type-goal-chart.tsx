'use client'

import {
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart'
import { TickerTypeLabel } from '@/enums/ticker-enum'
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts'

type Props = {
	data: {
		name: string
		goal: number
		total: number
	}[]
}

export const calculeWalletBalanceChartData = (data: Props['data']) => {
	const walletTotal = data.reduce((acc, { total }) => acc + total, 0)

	const chartData = data.map((item) => {
		const wallet = item.total / walletTotal
		const label = TickerTypeLabel[item.name as keyof typeof TickerTypeLabel]
		return { ...item, wallet, label }
	})

	return { chartData, walletTotal }
}

export function WalletTickerTypeGoalChart({ data }: Props) {
	const { chartData } = calculeWalletBalanceChartData(data)

	const chartConfig = {
		goal: {
			label: 'Meta',
			color: 'hsl(var(--chart-goal))',
		},
		wallet: {
			label: 'Carteira',
			color: 'hsl(var(--chart-wallet))',
		},
	} satisfies ChartConfig

	return (
		<ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
			<RadarChart
				data={chartData}
				margin={{
					top: 10,
					right: 15,
					bottom: 10,
					left: 15,
				}}
			>
				<ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />

				<PolarAngleAxis
					dataKey="label"
					tick={({ x, y, textAnchor, value, index, ...props }) => {
						const data = chartData[index]
						return (
							<text x={x} y={index === 0 ? y - 10 : y} textAnchor={textAnchor} fontWeight={500} {...props}>
								<tspan x={x} dy={'5px'} fontSize={12} className="fill-muted-foreground">
									{data.label}
								</tspan>
							</text>
						)
					}}
				/>

				<PolarGrid />
				<Radar dataKey="goal" fill="hsl(var(--chart-goal))" />
				<Radar dataKey="wallet" fill="hsl(var(--chart-wallet))" fillOpacity={0.6} />
				<ChartLegend className="mt-5" content={<ChartLegendContent />} />
			</RadarChart>
		</ChartContainer>
	)
}
