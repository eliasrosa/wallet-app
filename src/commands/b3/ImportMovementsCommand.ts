import { container } from '@/app'
import type { ReadXlsxFileRespositoryInterface } from '@/repositories/file-b3/interfaces/ReadXlsxFileRespositoryInterface'
import type { ImportFileMovementsService } from '@/services/b3/ImportFileMovementsService'
import { TYPES } from '@/types'

export class ImportMovementsCommand {
	private readXlsxFileRespository: ReadXlsxFileRespositoryInterface
	private importFileMovementsService: ImportFileMovementsService

	constructor() {
		this.readXlsxFileRespository = container.get<ReadXlsxFileRespositoryInterface>(
			TYPES.ReadXlsxFileRespositoryInterface,
		)

		this.importFileMovementsService = container.get<ImportFileMovementsService>(TYPES.ImportFileMovementsService)
	}

	async execute(): Promise<void> {
		console.log('importFileMovementsService', this)

		const filesPath = await this.readXlsxFileRespository.listFiles('data/b3/movements')

		for await (const filePath of filesPath) {
			await this.importFileMovementsService.execute(filePath)
		}
	}
}

new ImportMovementsCommand()
	.execute()
	.then(async () => {})
	.catch(async (e) => {
		console.error(e)
		process.exit(1)
	})
