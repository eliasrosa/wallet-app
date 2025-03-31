import { prisma } from '@/lib/prisma'
import { command, run } from 'cmd-ts'

const cmd = command({
	name: 'demo-create-user',
	description: 'Create a user',
	version: '1.0.0',
	args: {},
	handler: async (args) => {
		console.log('Creating demo users...')
		await prisma.user.create({ data: { id: '1', email: 'test1@test.com' } })
		await prisma.user.create({ data: { id: '2', email: 'test2@test.com' } })
	},
})

run(cmd, [])
