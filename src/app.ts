// import getDecorators from 'inversify-inject-decorators'
import 'reflect-metadata'
import { Container, inject, injectable } from 'inversify'
import { config } from './config'
import { TYPES } from './types'

import { ReadXlsxFileRespository } from '@/repositories/file-b3/ReadXlsxFileRespository'
import type { ReadXlsxFileRespositoryInterface } from '@/repositories/file-b3/interfaces/ReadXlsxFileRespositoryInterface'
import { ImportTickerDataCommand } from './commands/ticker/ImportTickerDataCommand'
import { tickers } from './config/tickers'
import { DividendRepository } from './repositories/database/DividendRepository'
import { DividendTypeRepository } from './repositories/database/DividendTypeRepository'
import { InstitutionRepository } from './repositories/database/InstitutionRepository'
import { MovementRepository } from './repositories/database/MovementRepository'
import { MovementTypeRepository } from './repositories/database/MovementTypeRepository'
import { TickerDataRepository } from './repositories/database/TickerDataRepository'
import { TickerRepository } from './repositories/database/TickerRepository'
import type { DividendRepositoryInterface } from './repositories/database/interfaces/DividendRepositoryInterface'
import type { DividendTypeRepositoryInterface } from './repositories/database/interfaces/DividendTypeRepositoryInterface'
import type { InstitutionRepositoryInterface } from './repositories/database/interfaces/InstitutionRepositoryInterface'
import type { MovementRepositoryInterface } from './repositories/database/interfaces/MovementRepositoryInterface'
import type { MovementTypeRepositoryInterface } from './repositories/database/interfaces/MovementTypeRepositoryInterface'
import type { TickerDataRepositoryInterface } from './repositories/database/interfaces/TickerDataRepositoryInterface'
import type { TickerRepositoryInterface } from './repositories/database/interfaces/TickerRepositoryInterface'
import type { DataFiiRepositoryInterface } from './repositories/ticker/interfaces/DataFiiRepositoryInterface'
import { DataFiiRepository } from './repositories/ticker/invest10/DataFiiRepository'
import { ImportFileDividendsService } from './services/b3/ImportFileDividendsService'
import { ImportFileMovementsService } from './services/b3/ImportFileMovementsService'
import { ImportFiiService } from './services/ticker/ImportFiiService'

const container = new Container()

// database repositories
container.bind<TickerRepositoryInterface>(TYPES.TickerRepositoryInterface).to(TickerRepository)
container.bind<InstitutionRepositoryInterface>(TYPES.InstitutionRepositoryInterface).to(InstitutionRepository)
container.bind<DividendTypeRepositoryInterface>(TYPES.DividendTypeRepositoryInterface).to(DividendTypeRepository)
container.bind<DividendRepositoryInterface>(TYPES.DividendRepositoryInterface).to(DividendRepository)
container.bind<MovementRepositoryInterface>(TYPES.MovementRepositoryInterface).to(MovementRepository)
container.bind<MovementTypeRepositoryInterface>(TYPES.MovementTypeRepositoryInterface).to(MovementTypeRepository)
container.bind<TickerDataRepositoryInterface>(TYPES.TickerDataRepositoryInterface).to(TickerDataRepository)

// file repositories
container.bind<ReadXlsxFileRespositoryInterface>(TYPES.ReadXlsxFileRespositoryInterface).to(ReadXlsxFileRespository)

// tickers
container.bind<DataFiiRepositoryInterface>(TYPES.DataFiiRepositoryInterface).to(DataFiiRepository)

// services
container.bind<ImportFileMovementsService>(TYPES.ImportFileMovementsService).to(ImportFileMovementsService)
container.bind<ImportFileDividendsService>(TYPES.ImportFileDividendsService).to(ImportFileDividendsService)
container.bind<ImportFiiService>(TYPES.ImportFiiService).to(ImportFiiService)

// commands
container.bind<ImportTickerDataCommand>(TYPES.ImportTickerDataCommand).to(ImportTickerDataCommand)

export { container, inject, injectable, config }
