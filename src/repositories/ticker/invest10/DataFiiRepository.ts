import { type CheerioAPI, load } from 'cheerio'
import type { DataFiiRepositoryInterface, FiiData } from '../interfaces/DataFiiRepositoryInterface'

export class DataFiiRepository implements DataFiiRepositoryInterface {
	#documentSelector?: CheerioAPI
	#baseUrl = 'https://investidor10.com.br'

	async getData(ticker: string): Promise<FiiData> {
		console.log('DataFiiRepository.getData', { ticker })

		const response = await fetch(`${this.#baseUrl}/fiis/${ticker.toLocaleLowerCase()}`)
		this.#documentSelector = load(await response.text())

		return {
			price: this.getPrice(),
			dy12m: this.getDy12m(),
			pvp: this.getPvp(),
			var12m: this.getVar12m(),
			volDayAvg: this.getVolDayAvg(),
			lastDividend: this.getLastDividend(),
			assetValuePerShare: this.getAssetValuePerShare(),
			source: 'INVEST10',
		}
	}

	private getDocumentSelector(): CheerioAPI {
		if (!this.#documentSelector) {
			throw new Error('Document selector not found')
		}
		return this.#documentSelector
	}

	private getTableIndicator(text: string): string {
		return this.getDocumentSelector()('#table-indicators .cell')
			.filter((_, el) => this.getDocumentSelector()(el).find('.name').text().trim() === text)
			.find('.value span')
			.text()
			.trim()
	}

	private getPrice(): number {
		return priceToNumber(
			this.getDocumentSelector()('#cards-ticker > div._card.cotacao > div._card-body > div > span').text().trim(),
		)
	}

	private getDy12m(): number {
		return dyToNumber(
			this.getDocumentSelector()('#cards-ticker > div:nth-child(2) > div._card-body > div > span').text().trim(),
		)
	}

	private getPvp(): number {
		return pvpToNumber(this.getDocumentSelector()('#cards-ticker > div._card.vp > div._card-body > span').text().trim())
	}

	private getVar12m(): number {
		return varToNumber(
			this.getDocumentSelector()('#cards-ticker > div:nth-child(5) > div._card-body > div > span').text().trim(),
		)
	}

	private getVolDayAvg(): string {
		return this.getDocumentSelector()('#cards-ticker > div._card.val > div._card-body > span').text().trim()
	}

	private getLastDividend(): number {
		return priceToNumber(this.getTableIndicator('ÚLTIMO RENDIMENTO'))
	}

	private getAssetValuePerShare(): number {
		return priceToNumber(this.getTableIndicator('VAL. PATRIMONIAL P/ COTA'))
	}
}

const priceToNumber = (text: string): number => {
	return Number.parseFloat(text.replace('R$', '').replace('.', '').replace(',', '.').trim())
}

const dyToNumber = (text: string): number => {
	return (Number.parseFloat(text.replace('%', '').replace('.', '').replace(',', '.').trim()) || 0) / 100
}

const varToNumber = (text: string): number => {
	return (Number.parseFloat(text.replace('%', '').replace('.', '').replace(',', '.').trim()) || 0) / 100
}

const pvpToNumber = (text: string): number => {
	return Number.parseFloat(text.replace('R$', '').replace('.', '').replace(',', '.').trim())
}
