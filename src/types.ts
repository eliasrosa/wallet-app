const TYPES = {
  // database repositories
  TickerRepositoryInterface: Symbol.for("TickerRepositoryInterface"),
  InstitutionRepositoryInterface: Symbol.for("InstitutionRepositoryInterface"),
  DividendRepositoryInterface: Symbol.for("DividendRepositoryInterface"),
  DividendTypeRepositoryInterface: Symbol.for("DividendTypeRepositoryInterface"),
  MovementRepositoryInterface: Symbol.for("MovementRepositoryInterface"),
  MovementTypeRepositoryInterface: Symbol.for("MovementTypeRepositoryInterface"),

  // file repositories
  ReadXlsxFileRespositoryInterface: Symbol.for("ReadXlsxFileRespositoryInterface"),
};

export { TYPES };