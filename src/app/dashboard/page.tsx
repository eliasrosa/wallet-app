import { AppSidebar } from '@/components/app-sidebar'
import { WalletBalanceCard } from '@/components/cards/wallet-balance-card'
import { WalletEvolutionCard } from '@/components/cards/wallet-evolution-card'
import { WalletTickerTypeGoalCard } from '@/components/cards/wallet-ticker-type-goal-card'
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
				<div className="grid auto-rows-min gap-4 p-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6">
					<WalletTickerTypeGoalCard />
					<WalletBalanceCard />
					<WalletEvolutionCard className="sm:col-span-2" />
				</div>
			</SidebarInset>
		</SidebarProvider>
	)
}
