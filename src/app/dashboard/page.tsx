import { AppSidebar } from '@/components/app-sidebar'
import WalletBalanceCard from '@/components/cards/wallet-balance-card'
import { ModeToggle } from '@/components/mode-toogle'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

export default function Page() {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-12 shrink-0 items-center gap-0 border-b px-4">
					<SidebarTrigger />
					<ModeToggle />
				</header>
				<div className="flex flex-1 flex-col gap-4 p-4">
					<div className="grid auto-rows-min grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
						<WalletBalanceCard />
						<div className="aspect-video rounded-xl bg-muted/50 col-span-2 " />
						<div className="aspect-video rounded-xl bg-muted/50" />
						<div className="aspect-video rounded-xl bg-muted/50" />
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	)
}
