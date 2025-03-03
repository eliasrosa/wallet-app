const TYPES = {
	// database repositories
	TickerRepositoryInterface: Symbol.for('TickerRepositoryInterface'),
	MovementRepositoryInterface: Symbol.for('MovementRepositoryInterface'),
	DividendRepositoryInterface: Symbol.for('DividendRepositoryInterface'),
	InstitutionRepositoryInterface: Symbol.for('InstitutionRepositoryInterface'),
	DividendTypeRepositoryInterface: Symbol.for('DividendTypeRepositoryInterface'),
	MovementTypeRepositoryInterface: Symbol.for('MovementTypeRepositoryInterface'),
	TickerDataRepositoryInterface: Symbol.for('TickerDataRepositoryInterface'),

	// file repositories
	ReadXlsxFileRespositoryInterface: Symbol.for('ReadXlsxFileRespositoryInterface'),

	// ticker
	DataFiiRepositoryInterface: Symbol.for('DataFiiRepositoryInterface'),

	// services
	ImportFileMovementsService: Symbol.for('ImportFileMovementsService'),
	ImportFileDividendsService: Symbol.for('ImportFileDividendsService'),
	ImportFiiService: Symbol.for('ImportFiiService'),

	// commands
	ImportTickerDataCommand: Symbol.for('ImportTickerDataCommand'),
}

export { TYPES }
