import { container, inject, injectable } from '@/app'
import type { ImportFiiService } from '@/services/ticker/ImportFiiService'
import { TYPES } from '@/types'

@injectable()
class ImportTickerDataCommand {
	@inject(TYPES.ImportFiiService)
	private importFiiService!: ImportFiiService

	async execute(): Promise<void> {
		await this.importFiiService.execute('HGLG11')

		console.log('Ticker data imported successfully')
	}
}

new ImportTickerDataCommand()
	.execute()
	.then(async () => {})
	.catch(async (e) => {
		console.error(e)
		process.exit(1)
	})
