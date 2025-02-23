import {
	BetweenHorizonalStartIcon,
	ChartNoAxesCombinedIcon,
	ChartPieIcon,
	FileSpreadsheetIcon,
	HomeIcon,
	ShoppingCartIcon,
	TargetIcon,
} from 'lucide-react'

export const sidebar = {
	navMain: [
		{
			title: 'Home',
			url: '#',
			items: [
				{
					title: 'Geral',
					url: '#',
					isActive: true,
					icon: ChartNoAxesCombinedIcon,
				},
				{
					title: 'Proventos',
					url: '#',
					icon: ChartPieIcon,
				},
			],
		},
		{
			title: 'Carteira',
			url: '#',
			items: [
				{
					title: 'Ativos',
					url: '#',
					icon: HomeIcon,
				},
				{
					title: 'Metas',
					url: '#',
					icon: TargetIcon,
				},
				{
					title: 'Comprar',
					url: '#',
					icon: ShoppingCartIcon,
				},
			],
		},
		{
			title: 'Configurações',
			url: '#',
			items: [
				{
					title: 'Cadastros',
					url: '#',
					icon: BetweenHorizonalStartIcon,
				},
				{
					title: 'Importar B3',
					url: '#',
					icon: FileSpreadsheetIcon,
				},
			],
		},
	],
}
