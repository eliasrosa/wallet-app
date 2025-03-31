import React from 'react'
import { DataTable } from '../tables/wallet-table'
import { columns } from '../tables/wallet-table/columns'
import { getData } from '../tables/wallet-table/data'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

export const WalleCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	async ({ className, ...props }, ref) => {
		const data = await getData('cm8wbti6t0001rq8sm75ra7xv')

		return (
			<Card className={className} {...props}>
				<CardHeader>
					<CardTitle>Carteira</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="container mx-auto py-1">
						<DataTable columns={columns} data={data} />
					</div>
				</CardContent>
			</Card>
		)
	},
)
