import type * as React from 'react'

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function WalletSelect({ ...props }: React.ComponentProps<'form'>) {
	return (
		<Select defaultValue="1">
			<SelectTrigger className="w-[120px] sm:w-[160px] md:w-[200px]">
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectItem value="1">Minha carteira</SelectItem>
					<SelectItem value="2">Teste</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}
