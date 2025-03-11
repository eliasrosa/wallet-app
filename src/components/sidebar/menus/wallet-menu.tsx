import { WalletSelect } from '@/components/forms/wallet-select'
import type * as React from 'react'

export function WalletMenu({ ...props }: React.ComponentProps<'form'>) {
	return (
		<div className="flex items-center space-x-2">
			<div className="bg-sidebar-accent rounded-md">
				<WalletSelect />
			</div>
		</div>
	)
}
