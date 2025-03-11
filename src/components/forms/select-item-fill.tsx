import type React from 'react'
import { SelectItem } from '../ui/select'

export type Props = {
	fill: string
	label: string
	value: string
}

export const SelectItemFill = ({ value, fill, label }: Props) => {
	return (
		<SelectItem value={value}>
			<div
				className="shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg] inline-block mr-2 h-2.5 w-2.5"
				style={{ '--color-bg': fill, '--color-border': fill } as React.CSSProperties}
			/>
			{label}
		</SelectItem>
	)
}
