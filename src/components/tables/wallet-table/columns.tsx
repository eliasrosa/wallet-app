'use client'

import type { ColumnDef } from '@tanstack/react-table'

export type WalletDataTable = {
	tickerId: string
	walletName: string
  averagePrice: number
	movementTotal: number
	movementSale: number
	movementPurchase: number
	movementQuantityTotal: number
	movementQuantityPurchase: number
	movementQuantitySale: number
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
		accessorKey: 'movementSale',
    header: () => <div className="text-center">Venda</div>,
		cell: ({ getValue }) => {
			const amount = Number.parseFloat(getValue() as string)
			const formatted = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(amount)
			return <div className="text-center">{formatted}</div>
		},
	},
	{
		accessorKey: 'movementTotal',
    header: () => <div className="text-center">Total</div>,
		cell: ({ getValue }) => {
			const amount = Number.parseFloat(getValue() as string)
			const formatted = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(amount)
			return <div className="text-center">{formatted}</div>
		},
	},
	{
		accessorKey: 'movementPurchase',
    header: () => <div className="text-center">Compra</div>,
		cell: ({ getValue }) => {
			const amount = Number.parseFloat(getValue() as string)
			const formatted = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(amount)
			return <div className="text-center">{formatted}</div>
		},
	},
	{
		accessorKey: 'movementQuantitySale',
    header: () => <div className="text-center">Quantidade Venda</div>,
    cell: ({ getValue }) => {
			return <div className="text-center">{String(getValue() || 0)}</div>
		},
	},
	{
		accessorKey: 'movementQuantityTotal',
		header: () => <div className="text-center">Quantidade Total</div>,
    cell: ({ getValue }) => {
			return <div className="text-center">{String(getValue() || 0)}</div>
		},
	},
	{
		accessorKey: 'movementQuantityPurchase',
    header: () => <div className="text-center">Quantidade Compra</div>,
		cell: ({ getValue }) => {
			return <div className="text-center">{String(getValue() || 0)}</div>
		},
	},
]
