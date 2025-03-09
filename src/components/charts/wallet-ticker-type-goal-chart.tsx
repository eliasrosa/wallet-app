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
import { TickerType } from '@prisma/client'
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts'

type DataInput = {
	name: TickerType
	goal: number
	total: number
}

type Props = {
	data: DataInput[]
}

type DataChart = DataInput & {
	wallet: number
	label: string
}

export const calculeWalletBalanceChartData = (data: Props['data']) => {
	const walletTotal = data.reduce((acc, { total }) => acc + total, 0)

	const chartData: DataChart[] = data.map((item) => {
		const wallet = item.total / walletTotal
		const label = TickerTypeLabel[item.name as keyof typeof TickerTypeLabel]
		return { ...item, wallet, label }
	})

	return { chartData, walletTotal }
}

export function WalletTickerTypeGoalChart({ data }: Props) {
	const { chartData } = calculeWalletBalanceChartData(data)

	const types = [TickerType.RF, TickerType.STOCK, TickerType.FII, TickerType.ETF]
	chartData.sort((a, b) => types.indexOf(a.name) - types.indexOf(b.name))

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
				<Radar dataKey="goal" fill="hsl(var(--chart-goal))" fillOpacity={0.7} />
				<Radar dataKey="wallet" fill="hsl(var(--chart-wallet))" fillOpacity={0.7} />
				<ChartLegend className="relative top-16 mt-4" content={<ChartLegendContent />} />
			</RadarChart>
		</ChartContainer>
	)
}
