import { toCurrency } from '@/lib/number'
import { cn } from '@/lib/utils'
import type { TickerType } from '@prisma/client'
import * as React from 'react'
import type * as RechartsPrimitive from 'recharts'
import { TickerTypeTooltipLabel } from '../labels/ticker-type-label'

const WalletEvolutionChartTooltipContent = React.forwardRef<
	HTMLDivElement,
	React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
		React.ComponentProps<'div'> & {
			nameKey?: string
			labelKey?: string
		}
>(({ active, payload, className }, ref) => {
	if (!active || !payload?.length) {
		return null
	}

	const { month } = payload[0].payload
	const total = payload.reduce((acc, item) => {
		return acc + Number(item.value)
	}, 0)

	return (
		<div
			ref={ref}
			className={cn(
				'min-w-[13rem] gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl',
				className,
			)}
		>
			<div className="text-left font-bold border-b border-b-gray-400 pb-1">{month}</div>

			{payload.map((item) => {
				return (
					<div key={item.dataKey} className="grid grid-cols-2 gap-1.5">
						<TickerTypeTooltipLabel tickerType={item.dataKey as TickerType} />
						<div className="text-right">{toCurrency(Number(item.value) || 0)}</div>
					</div>
				)
			})}

			<div className="grid grid-cols-2 gap-1.5 font-bold border-t border-t-gray-400">
				<div className="text-left">Total</div>
				<div className="text-right">{toCurrency(total)}</div>
			</div>
		</div>
	)
})
WalletEvolutionChartTooltipContent.displayName = 'WalletEvolutionChartTooltipContent'

export { WalletEvolutionChartTooltipContent }
