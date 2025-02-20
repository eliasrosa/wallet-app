import { TYPES } from "./types";
import { Container, injectable } from "inversify";
import getDecorators from "inversify-inject-decorators";

import { TickerRepository } from "./repositories/database/TickerRepository";
import { DividendRepository } from "./repositories/database/DividendRepository";
import { MovementRepository } from "./repositories/database/MovementRepository";
import { InstitutionRepository } from "./repositories/database/InstitutionRepository";
import { MovementTypeRepository } from "./repositories/database/MovementTypeRepository";
import { DividendTypeRepository } from "./repositories/database/DividendTypeRepository";
import { TickerRepositoryInterface } from "./interfaces/repositories/database/TickerRepositoryInterface";
import { DividendRepositoryInterface } from "./interfaces/repositories/database/DividendRepositoryInterface";
import { MovementRepositoryInterface } from "./interfaces/repositories/database/MovementRepositoryInterface";
import { InstitutionRepositoryInterface } from "./interfaces/repositories/database/InstitutionRepositoryInterface";
import { DividendTypeRepositoryInterface } from "./interfaces/repositories/database/DividendTypeRepositoryInterface";
import { MovementTypeRepositoryInterface } from "./interfaces/repositories/database/MovementTypeRepositoryInterface";

import { ReadXlsxFileRespository } from "@/repositories/file/ReadXlsxFileRespository";
import { ReadXlsxFileRespositoryInterface } from "@/interfaces/repositories/file/ReadXlsxFileRespositoryInterface";

const app = new Container()

// database repositories
app.bind<TickerRepositoryInterface>(TYPES.TickerRepositoryInterface).to(TickerRepository)
app.bind<InstitutionRepositoryInterface>(TYPES.InstitutionRepositoryInterface).to(InstitutionRepository)
app.bind<DividendTypeRepositoryInterface>(TYPES.DividendTypeRepositoryInterface).to(DividendTypeRepository)
app.bind<DividendRepositoryInterface>(TYPES.DividendRepositoryInterface).to(DividendRepository)
app.bind<MovementRepositoryInterface>(TYPES.MovementRepositoryInterface).to(MovementRepository)
app.bind<MovementTypeRepositoryInterface>(TYPES.MovementTypeRepositoryInterface).to(MovementTypeRepository)

// file repositories
app.bind<ReadXlsxFileRespositoryInterface>(TYPES.ReadXlsxFileRespositoryInterface).to(ReadXlsxFileRespository)

const { lazyInject } = getDecorators(app)
export { app, lazyInject, injectable }