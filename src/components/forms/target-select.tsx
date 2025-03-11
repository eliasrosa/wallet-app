import type * as React from 'react'

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { SelectItemFill } from './select-item-fill'

export function TargetSelect({ ...props }: React.ComponentProps<'form'>) {
	return (
		<Select defaultValue="2">
			<SelectTrigger className="w-[120px] sm:w-[160px] md:w-[200px]">
				<SelectValue placeholder="Estratégias..." />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Oficiais</SelectLabel>
					<SelectItemFill value="1" fill="hsl(var(--success))" label="Conservador" />
					<SelectItemFill value="2" fill="hsl(var(--warning))" label="Moderado" />
					<SelectItemFill value="3" fill="hsl(var(--danger))" label="Agressivo" />
				</SelectGroup>
				<SelectGroup>
					<SelectLabel>Personalizadas</SelectLabel>
					<SelectItemFill value="4" fill="#CCC" label="Metas 2025" />
					<SelectItemFill value="5" fill="#CCC" label="Metas 2030" />
					<SelectItemFill value="6" fill="#CCC" label="Metas 2050" />
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}
