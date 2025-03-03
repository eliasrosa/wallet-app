import { container, inject, injectable } from '@/app'
import type { ImportFiiService } from '@/services/ticker/ImportFiiService'
import { TYPES } from '@/types'

@injectable()
export class ImportTickerDataCommand {
	@inject(TYPES.ImportFiiService)
	private importFiiService!: ImportFiiService

	async execute(): Promise<void> {
		await this.importFiiService.execute('VISC11')

		console.log('Ticker data imported successfully')
	}
}
