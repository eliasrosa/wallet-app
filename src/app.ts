import { TYPES } from "./types";
import { Container, injectable } from "inversify";
import getDecorators from "inversify-inject-decorators";

import { TickerRepository } from "./repositories/database/TickerRepository";
import { DividendRepository } from "./repositories/database/DividendRepository";
import { MovementRepository } from "./repositories/database/MovementRepository";
import { InstitutionRepository } from "./repositories/database/InstitutionRepository";
import { MovementTypeRepository } from "./repositories/database/MovementTypeRepository";
import { DividendTypeRepository } from "./repositories/database/DividendTypeRepository";
import { TickerRepositoryInterface } from "./repositories/database/interfaces/TickerRepositoryInterface";
import { DividendRepositoryInterface } from "./repositories/database/interfaces/DividendRepositoryInterface";
import { MovementRepositoryInterface } from "./repositories/database/interfaces/MovementRepositoryInterface";
import { InstitutionRepositoryInterface } from "./repositories/database/interfaces/InstitutionRepositoryInterface";
import { DividendTypeRepositoryInterface } from "./repositories/database/interfaces/DividendTypeRepositoryInterface";
import { MovementTypeRepositoryInterface } from "./repositories/database/interfaces/MovementTypeRepositoryInterface";

import { ReadXlsxFileRespository } from "@/repositories/file-b3/ReadXlsxFileRespository";
import { ReadXlsxFileRespositoryInterface } from "@/repositories/file-b3/interfaces/ReadXlsxFileRespositoryInterface";

const container = new Container()
const { lazyInject } = getDecorators(container)

// database repositories
container.bind<TickerRepositoryInterface>(TYPES.TickerRepositoryInterface).to(TickerRepository)
container.bind<InstitutionRepositoryInterface>(TYPES.InstitutionRepositoryInterface).to(InstitutionRepository)
container.bind<DividendTypeRepositoryInterface>(TYPES.DividendTypeRepositoryInterface).to(DividendTypeRepository)
container.bind<DividendRepositoryInterface>(TYPES.DividendRepositoryInterface).to(DividendRepository)
container.bind<MovementRepositoryInterface>(TYPES.MovementRepositoryInterface).to(MovementRepository)
container.bind<MovementTypeRepositoryInterface>(TYPES.MovementTypeRepositoryInterface).to(MovementTypeRepository)

// file repositories
container.bind<ReadXlsxFileRespositoryInterface>(TYPES.ReadXlsxFileRespositoryInterface).to(ReadXlsxFileRespository)

export { container , lazyInject, injectable }