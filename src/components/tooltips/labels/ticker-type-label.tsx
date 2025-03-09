import { TickerTypeColor, TickerTypeLabel } from '@/ticker-enum'
import type { TickerType } from '@prisma/client'
import type React from 'react'

export type TickerTypeTooltipLabelProps = {
	tickerType: TickerType
}

export const TickerTypeTooltipLabel = ({ tickerType }: TickerTypeTooltipLabelProps) => {
	const fill = TickerTypeColor[tickerType as keyof typeof TickerTypeColor]
	const label = TickerTypeLabel[tickerType as keyof typeof TickerTypeLabel]

	return (
		<div>
			<div
				className="shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg] inline-block mr-2 h-2.5 w-2.5"
				style={{ '--color-bg': fill, '--color-border': fill } as React.CSSProperties}
			/>
			{label}
		</div>
	)
}
