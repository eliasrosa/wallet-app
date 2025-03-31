'use client'

import type { ColumnDef } from '@tanstack/react-table'

export type WalletDataTable = {
	tickerId: string
	walletName: string
	averagePrice: number
	negotiationTotal: number
	negotiationSale: number
	negotiationPurchase: number
	negotiationQuantityTotal: number
	negotiationQuantityPurchase: number
	negotiationQuantitySale: number
}

export const columns: ColumnDef<WalletDataTable>[] = [
	{
		accessorKey: 'tickerId',
		header: 'Ticker',
	},
	{
		accessorKey: 'walletName',
		header: 'Carteira',
	},
	{
		accessorKey: 'averagePrice',
		header: () => <div className="text-center">Preço médio</div>,
		cell: ({ getValue }) => {
			const amount = Number.parseFloat(getValue() as string)
			const formatted = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(amount)
			return <div className="text-center">{formatted}</div>
		},
	},
	{
		accessorKey: 'negotiationSale',
		header: () => <div className="text-center">Venda</div>,
		cell: ({ getValue }) => {
			const amount = Number.parseFloat(getValue() as string)
			const formatted = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(amount)
			return <div className="text-center">{formatted}</div>
		},
	},
	{
		accessorKey: 'negotiationTotal',
		header: () => <div className="text-center">Total</div>,
		cell: ({ getValue }) => {
			const amount = Number.parseFloat(getValue() as string)
			const formatted = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(amount)
			return <div className="text-center">{formatted}</div>
		},
	},
	{
		accessorKey: 'negotiationPurchase',
		header: () => <div className="text-center">Compra</div>,
		cell: ({ getValue }) => {
			const amount = Number.parseFloat(getValue() as string)
			const formatted = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(amount)
			return <div className="text-center">{formatted}</div>
		},
	},
	{
		accessorKey: 'negotiationQuantitySale',
		header: () => <div className="text-center">Quantidade Venda</div>,
		cell: ({ getValue }) => {
			return <div className="text-center">{String(getValue() || 0)}</div>
		},
	},
	{
		accessorKey: 'negotiationQuantityTotal',
		header: () => <div className="text-center">Quantidade Total</div>,
		cell: ({ getValue }) => {
			return <div className="text-center">{String(getValue() || 0)}</div>
		},
	},
	{
		accessorKey: 'negotiationQuantityPurchase',
		header: () => <div className="text-center">Quantidade Compra</div>,
		cell: ({ getValue }) => {
			return <div className="text-center">{String(getValue() || 0)}</div>
		},
	},
]
