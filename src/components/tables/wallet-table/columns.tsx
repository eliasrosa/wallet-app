'use client'

import type { ColumnDef } from '@tanstack/react-table'
import { QuantityCell } from './cell/quantity-cell'

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
	movementQuantityUnfolding: number
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
		accessorKey: 'tickerType',
		header: 'Tipo',
	},
	{
		accessorKey: 'quantity',
		header: () => <div className="text-center">Quantidade</div>,
		cell: ({ row }) => {
			return (
				<QuantityCell
					{...{
						total: row.original.negotiationQuantityTotal,
						purchase: row.original.negotiationQuantityPurchase,
						sale: row.original.negotiationQuantitySale,
						unfolding: row.original.movementQuantityUnfolding,
					}}
				/>
			)
		},
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
]
