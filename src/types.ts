const TYPES = {
	// database repositories
	TickerRepositoryInterface: Symbol.for('TickerRepositoryInterface'),
	MovementRepositoryInterface: Symbol.for('MovementRepositoryInterface'),
	DividendRepositoryInterface: Symbol.for('DividendRepositoryInterface'),
	InstitutionRepositoryInterface: Symbol.for('InstitutionRepositoryInterface'),
	DividendTypeRepositoryInterface: Symbol.for('DividendTypeRepositoryInterface'),
	MovementTypeRepositoryInterface: Symbol.for('MovementTypeRepositoryInterface'),
	TickerDataRepositoryInterface: Symbol.for('TickerDataRepositoryInterface'),
	NegotiationRepositoryInterface: Symbol.for('NegotiationRepositoryInterface'),

	// file repositories
	ReadXlsxFileRespositoryInterface: Symbol.for('ReadXlsxFileRespositoryInterface'),

	// ticker
	DataFiiRepositoryInterface: Symbol.for('DataFiiRepositoryInterface'),

	// services
	ImportFiiService: Symbol.for('ImportFiiService'),
	ImportFileMovementsService: Symbol.for('ImportFileMovementsService'),
	ImportFileDividendsService: Symbol.for('ImportFileDividendsService'),
	ImportFileNegotiationsService: Symbol.for('ImportFileNegotiationsService'),

	// commands
	ImportTickerDataCommand: Symbol.for('ImportTickerDataCommand'),
}

export { TYPES }
