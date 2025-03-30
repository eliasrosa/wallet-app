import { container } from '@/app'
import type { ImportFileNegotiationsService } from '@/services/b3/ImportFileNegotiationsService'
import { TYPES } from '@/types'
import { command, number, positional, run, string } from 'cmd-ts'

const handler = async (args: { user: string; year: number }) => {
	const filePath = `data/users/${args.user}/negotiations-${args.year.toString()}.xlsx`
	const service: ImportFileNegotiationsService = container.get(TYPES.ImportFileNegotiationsService)

	await service.execute(filePath, args.user, args.year)

	process.exit(0)
}

const cmd = command({
	name: 'b3-import-negotiations',
	description: 'B3 Import negotiations from XLSX file',
	version: '1.0.0',
	args: {
		user: positional({ type: string, description: 'User to import the negotiations', displayName: 'user' }),
		year: positional({ type: number, description: 'Year of the negotiations to import', displayName: 'year' }),
	},
	handler,
})

run(cmd, process.argv.slice(2))
