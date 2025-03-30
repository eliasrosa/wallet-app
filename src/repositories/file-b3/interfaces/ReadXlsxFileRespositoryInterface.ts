import type { Stream } from 'node:stream'

export interface RowDividendFileData {
	tickerId: string
	tickerName: string
	typeName: string
	paymentAt: Date
	institutionName: string
	total: number
	price?: number
	quantity?: number
}

export interface RowMovementFileData {
	tickerId: string
	tickerName: string
	quantity: number
	price?: number
	total?: number
	isCredit: boolean
	institutionName: string
	movementTypeName: string
	movementAt: Date
}

export interface RowNotificationFileData {
	negotiationAt: Date
	movementTypeName: string
	market: string
	dueDate?: Date
	institutionName: string
	negotiationCode: string
	quantity: number
	price: number
	total: number
	tickerId: string
}

export interface ReadXlsxFileRespositoryInterface {
	readDividendFile(file: Stream | Buffer): Promise<RowDividendFileData[]>
	readMovementFile(file: Stream | Buffer): Promise<RowMovementFileData[]>
	readNegotiationsFile(file: Stream | Buffer): Promise<RowNotificationFileData[]>
	listFiles(directoryPath: string): Promise<string[]>
}
