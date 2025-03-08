import { toPercent } from '@/lib/number'
import { cn } from '@/lib/utils'
import type { TickerType } from '@prisma/client'
import * as React from 'react'
import type * as RechartsPrimitive from 'recharts'
import { TickerTypeTooltipLabel } from './labels/ticker-type-tooltip-label'

const WalletBalanceChartTooltipContent = React.forwardRef<
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

	const diffTotal = payload.reduce((acc, item) => acc + item.payload.diff, 0)

	return (
		<div
			ref={ref}
			className={cn(
				'min-w-[13rem] gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl',
				className,
			)}
		>
			<div className="text-left font-bold border-b border-b-gray-400 pb-1">
				<TickerTypeTooltipLabel tickerType={payload[0].name as TickerType} />
			</div>

			{payload.map((item) => {
				const { wallet, goal } = item.payload

				return (
					<div key={item.dataKey} className="grid grid-cols-2 gap-1">
						<div className="text-left">Meta</div>
						<div className="text-right">{toPercent(goal)}</div>
						<div className="text-left">Carteira</div>
						<div className="text-right">{toPercent(wallet)}</div>
					</div>
				)
			})}

			<div className="grid grid-cols-2 gap-1.5 font-bold border-t border-t-gray-400">
				<div className="text-left">Diferença</div>
				<div className="text-right">{toPercent(diffTotal)}</div>
			</div>
		</div>
	)
})
WalletBalanceChartTooltipContent.displayName = 'WalletBalanceChartTooltipContent'

export { WalletBalanceChartTooltipContent }
