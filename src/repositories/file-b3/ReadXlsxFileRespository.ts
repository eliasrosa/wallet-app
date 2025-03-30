import fs from 'node:fs'
import path from 'node:path'
import type { Stream } from 'node:stream'
import type {
	ReadXlsxFileRespositoryInterface,
	RowDividendFileData,
	RowMovementFileData,
	RowNotificationFileData,
} from '@/repositories/file-b3/interfaces/ReadXlsxFileRespositoryInterface'
import readXlsxFile from 'read-excel-file/node'

export class ReadXlsxFileRespository implements ReadXlsxFileRespositoryInterface {
	private schemaDividendFile = {
		Produto: {
			prop: 'product',
			type: String,
		},
		Pagamento: {
			prop: 'paymentDate',
			type: String,
		},
		'Tipo de Evento': {
			prop: 'typeName',
			type: String,
		},
		Instituição: {
			prop: 'institutionName',
			type: String,
		},
		Quantidade: {
			prop: 'quantity',
			type: String,
		},
		'Preço unitário': {
			prop: 'price',
			type: String,
		},
		'Valor líquido': {
			prop: 'total',
			type: String,
		},
	}

	private schemaMovementFile = {
		'Entrada/Saída': {
			prop: 'isCredit',
			type: String,
		},
		Data: {
			prop: 'movementAt',
			type: String,
		},
		Movimentação: {
			prop: 'typeName',
			type: String,
		},
		Produto: {
			prop: 'product',
			type: String,
		},
		Instituição: {
			prop: 'institutionName',
			type: String,
		},
		Quantidade: {
			prop: 'quantity',
			type: String,
		},
		'Preço unitário': {
			prop: 'price',
			type: String,
		},
		'Valor da Operação': {
			prop: 'total',
			type: String,
		},
	}

	private schemaNegotiationsFile = {
		'Data do Negócio': {
			prop: 'negotiationAt',
			type: String,
		},
		'Tipo de Movimentação': {
			prop: 'movementTypeName',
			type: String,
		},
		Mercado: {
			prop: 'market',
			type: String,
		},
		'Prazo/Vencimento': {
			prop: 'dueDate',
			type: String,
		},
		Instituição: {
			prop: 'institutionName',
			type: String,
		},
		'Código de Negociação': {
			prop: 'negotiationCode',
			type: String,
		},
		Quantidade: {
			prop: 'quantity',
			type: String,
		},
		Preço: {
			prop: 'price',
			type: String,
		},
		Valor: {
			prop: 'total',
			type: String,
		},
	}

	async readNegotiationsFile(file: Stream | Buffer): Promise<RowNotificationFileData[]> {
		const { rows, errors } = await readXlsxFile(file, {
			schema: this.schemaNegotiationsFile,
		})
		if (errors.length > 0) {
			throw new Error(`ReadXlsxFileRespository.readNegotiationsFile: ${JSON.stringify(errors)}`)
		}

		return rows.map((row) => {
			const negotiationAt = new Date(Date.parse((row.negotiationAt as string).split('/').reverse().join('-')))
			const movementTypeName = row.movementTypeName as string
			const market = row.market as string
			const dueDate = /^\d{2}\/\d{2}\/\d{4}$/.test(row.dueDate as string)
				? new Date(Date.parse((row.negotiationAt as string).split('/').reverse().join('-')))
				: undefined
			const institutionName = row.institutionName as string
			const negotiationCode = row.negotiationCode as string
			const quantity = Number.parseFloat(row.quantity as string) || 0
			const price = Number.parseFloat(row.price as string) || 0
			const total = Number.parseFloat(row.total as string) || 0
			const tickerId = market === 'Mercado Fracionário' ? negotiationCode.slice(0, -1) : negotiationCode

			return {
				negotiationAt,
				movementTypeName,
				market,
				dueDate,
				institutionName,
				negotiationCode,
				tickerId,
				quantity,
				price,
				total,
			}
		})
	}

	async readDividendFile(file: Stream | Buffer): Promise<RowDividendFileData[]> {
		const { rows, errors } = await readXlsxFile(file, {
			schema: this.schemaDividendFile,
		})

		if (errors.length > 0) {
			throw new Error(`ReadXlsxFileRespository.readDividendFile: ${JSON.stringify(errors)}`)
		}

		return rows
			.filter((row) => row.product)
			.map((row) => {
				const [tickerId, tickerName] = (row.product as string).split(' - ')
				const paymentAt = new Date(Date.parse((row.paymentDate as string).split('/').reverse().join('-')))
				const quantity = Number.parseFloat(row.quantity as string) || undefined
				const price = Number.parseFloat(row.price as string) || undefined
				const total = Number.parseFloat(row.total as string) || 0

				return {
					price,
					total,
					quantity,
					tickerId,
					paymentAt,
					tickerName,
					typeName: row.typeName as string,
					institutionName: row.institutionName as string,
				}
			})
	}

	async readMovementFile(file: Stream | Buffer): Promise<RowMovementFileData[]> {
		const { rows, errors } = await readXlsxFile(file, {
			schema: this.schemaMovementFile,
		})

		if (errors.length > 0) {
			throw new Error(`ReadXlsxFileRespository.readMovementFile: ${JSON.stringify(errors)}`)
		}

		return rows
			.filter((row) => row.product)
			.map((row) => {
				const isCredit = (row.isCredit as string).toLowerCase() === 'credito'
				const [tickerId, tickerName] = (row.product as string).split(' - ')
				const movementAt = new Date(Date.parse((row.movementAt as string).split('/').reverse().join('-')))
				const quantity = Number.parseFloat(row.quantity as string) || 0
				const price = Number.parseFloat(row.price as string) || undefined
				const total = Number.parseFloat(row.total as string) || undefined
				const movementTypeName = row.typeName as string
				const institutionName = row.institutionName as string

				return {
					isCredit,
					movementAt,
					movementTypeName,
					tickerId,
					tickerName,
					institutionName,
					quantity,
					price,
					total,
				}
			})
	}

	async listFiles(directoryPath: string): Promise<string[]> {
		const files = fs.readdirSync(directoryPath)

		return files
			.filter((file) => {
				const filePath = path.join(directoryPath, file)
				return fs.statSync(filePath).isFile() && filePath.endsWith('.xlsx')
			})
			.map((file) => path.join(directoryPath, file))
	}
}
