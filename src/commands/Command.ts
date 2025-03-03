class Command {
	async execute(): Promise<void> {}
}

new Command()
	.execute()
	.then(async () => {})
	.catch(async (e) => {
		console.error(e)
		process.exit(1)
	})
