export const toPercent = (decimal: number, fixed = 2) => `${(decimal * 100).toFixed(fixed)}%`

export const toCurrency = (value: number, fixed = 2) => {
	return new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL',
		maximumFractionDigits: fixed,
	}).format(value)
}
