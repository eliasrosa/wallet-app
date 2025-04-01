import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

export type Prop = {
	total: number
	purchase: number
	sale: number
	unfolding: number
}

export const QuantityCell = ({ total, purchase, sale, unfolding }: Prop) => {
	return (
		<TooltipProvider>
			<div className="flex justify-center items-center">
				<Tooltip delayDuration={0} disableHoverableContent>
					<TooltipTrigger>{total}</TooltipTrigger>
					<TooltipContent className="bg-background text-primary border-border/50 rounded-lg shadow-xl">
						<p className="font-semibold text-md border-primary border-b pb-1 mb-1 text-center">Quantidade</p>
						<div className="grid grid-cols-2 font-medium">
							<span>Comprado:</span>
							<span className="text-center">{purchase}</span>
							<span>Vendido:</span>
							<span className="text-center">{sale}</span>
							<span>Desdobro:</span>
							<span className="text-center">{unfolding}</span>
							<span className="font-semibold border-t border-primary pt-1">Total:</span>
							<span className="font-semibold border-t border-primary pt-1 text-center">{total}</span>
						</div>
					</TooltipContent>
				</Tooltip>
			</div>
		</TooltipProvider>
	)
}
