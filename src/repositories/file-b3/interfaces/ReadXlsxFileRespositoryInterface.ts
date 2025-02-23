import type { Stream } from 'stream'

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

export interface ReadXlsxFileRespositoryInterface {
	readDividendFile(file: Stream | Buffer): Promise<RowDividendFileData[]>
	readMovementFile(file: Stream | Buffer): Promise<RowMovementFileData[]>
	listFiles(directoryPath: string): Promise<string[]>
}
