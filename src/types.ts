const TYPES = {
  // database repositories
  TickerRepositoryInterface: Symbol.for('TickerRepositoryInterface'),
  MovementRepositoryInterface: Symbol.for('MovementRepositoryInterface'),
  DividendRepositoryInterface: Symbol.for('DividendRepositoryInterface'),
  InstitutionRepositoryInterface: Symbol.for('InstitutionRepositoryInterface'),
  DividendTypeRepositoryInterface: Symbol.for(
    'DividendTypeRepositoryInterface',
  ),
  MovementTypeRepositoryInterface: Symbol.for(
    'MovementTypeRepositoryInterface',
  ),

  // file repositories
  ReadXlsxFileRespositoryInterface: Symbol.for(
    'ReadXlsxFileRespositoryInterface',
  ),
};

export { TYPES };
