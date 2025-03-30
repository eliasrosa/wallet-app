import { container } from '@/app'
import type { ImportFileMovementsService } from '@/services/b3/ImportFileMovementsService'
import { TYPES } from '@/types'
import { command, number, positional, run, string } from 'cmd-ts'

const handler = async (args: { user: string; year: number }) => {
	const filePath = `data/users/${args.user}/movements-${args.year.toString()}.xlsx`
	const service: ImportFileMovementsService = container.get(TYPES.ImportFileMovementsService)

	await service.execute(filePath, args.user, args.year)

	process.exit(0)
}

const cmd = command({
	name: 'b3-import-movements',
	description: 'B3 Import movements from XLSX file',
	version: '1.0.0',
	args: {
		user: positional({ type: string, description: 'User to import the movements', displayName: 'user' }),
		year: positional({ type: number, description: 'Year of the movements to import', displayName: 'year' }),
	},
	handler,
})

run(cmd, process.argv.slice(2))
