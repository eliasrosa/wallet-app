'use client'

import { ModeToggle } from '@/components/mode-toogle'
import { TargetMenu } from '@/components/sidebar/menus/target-menu'
import { WalletMenu } from '@/components/sidebar/menus/wallet-menu'
import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'

export default function MenuTop() {
	const { state, isMobile } = useSidebar()

	return (
		<header
			className={cn(
				'transition-all duration-200 ease-linear',
				'grid h-14 grid-cols-[auto_1fr_auto] items-center border-b px-4 fixed top-0 bg-background z-10',
				state === 'expanded' && !isMobile && 'w-[calc(100%-var(--sidebar-width))]',
				(state === 'collapsed' || isMobile) && 'w-full',
			)}
		>
			<div className="flex items-center gap-0 sm:gap-2">
				<SidebarTrigger />
				<ModeToggle />
			</div>
			<div className="flex items-center gap-2 justify-end">
				<TargetMenu />
				<WalletMenu />
			</div>
		</header>
	)
}
