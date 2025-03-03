import { container } from '@/app'
import type { ReadXlsxFileRespositoryInterface } from '@/repositories/file-b3/interfaces/ReadXlsxFileRespositoryInterface'
import type { ImportFileDividendsService } from '@/services/b3/ImportFileDividendsService'
import { TYPES } from '@/types'

export class ImportDividendsCommand {
	private readXlsxFileRespository: ReadXlsxFileRespositoryInterface
	private importFileDividendsService: ImportFileDividendsService

	constructor() {
		this.readXlsxFileRespository = container.get<ReadXlsxFileRespositoryInterface>(
			TYPES.ReadXlsxFileRespositoryInterface,
		)

		this.importFileDividendsService = container.get<ImportFileDividendsService>(TYPES.ImportFileDividendsService)
	}

	async execute(): Promise<void> {
		console.log('ImportDividendsCommand', this)

		const filesPath = await this.readXlsxFileRespository.listFiles('data/b3/dividends')
		for await (const filePath of filesPath) {
			await this.importFileDividendsService.execute(filePath)
		}
	}
}

new ImportDividendsCommand()
	.execute()
	.then(async () => {})
	.catch(async (e) => {
		console.error(e)
		process.exit(1)
	})
