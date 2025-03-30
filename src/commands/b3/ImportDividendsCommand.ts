import { container } from '@/app'
import type { ImportFileDividendsService } from '@/services/b3/ImportFileDividendsService'
import { TYPES } from '@/types'
import { command, number, positional, run, string } from 'cmd-ts'

const handler = async (args: { user: string; year: number }) => {
	const filePath = `data/users/${args.user}/dividends-${args.year.toString()}.xlsx`
	const service: ImportFileDividendsService = container.get(TYPES.ImportFileDividendsService)

	await service.execute(filePath)

	process.exit(0)
}

const cmd = command({
	name: 'b3-import-dividends',
	description: 'B3 Import dividends from XLSX file',
	version: '1.0.0',
	args: {
		user: positional({ type: string, description: 'User to import the dividends', displayName: 'user' }),
		year: positional({ type: number, description: 'Year of the dividends to import', displayName: 'year' }),
	},
	handler,
})

run(cmd, process.argv.slice(2))
