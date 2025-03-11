import { TargetSelect } from '@/components/forms/target-select'
import type * as React from 'react'

export function TargetMenu({ ...props }: React.ComponentProps<'form'>) {
	return (
		<div className="flex items-center space-x-2">
			<div className="bg-sidebar-accent rounded-md">
				<TargetSelect />
			</div>
		</div>
	)
}
