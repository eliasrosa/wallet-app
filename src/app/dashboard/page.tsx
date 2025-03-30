import { WalletBalanceCard } from '@/components/cards/wallet-balance-card'
import { WalleCard } from '@/components/cards/wallet-card'
import { WalletEvolutionCard } from '@/components/cards/wallet-evolution-card'
import { WalletTickerTypeGoalCard } from '@/components/cards/wallet-ticker-type-goal-card'

export default function Page() {
	return (
		<>
			<WalletTickerTypeGoalCard />
			<WalletBalanceCard />
			<WalletEvolutionCard className="sm:col-span-2" />
			<WalleCard className="sm:col-span-6" />
		</>
	)
}
