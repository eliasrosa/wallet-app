import { AppSidebar } from '@/components/app-sidebar'
import { WalletBalanceCard } from '@/components/cards/wallet-balance-card'
import { WalletEvolutionCard } from '@/components/cards/wallet-evolution-card'
import { WalletTickerTypeGoalCard } from '@/components/cards/wallet-ticker-type-goal-card'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import MenuTop from '../menu-top'

export default function Page() {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<MenuTop />
				<div className="grid auto-rows-min gap-4 p-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 pt-16">
					<WalletTickerTypeGoalCard />
					<WalletBalanceCard />
					<WalletEvolutionCard className="sm:col-span-2" />
				</div>
			</SidebarInset>
		</SidebarProvider>
	)
}
