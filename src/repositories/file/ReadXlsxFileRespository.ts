import { ReadXlsxFileRespositoryInterface, RowDividendFileData, RowMovementFileData } from "@/interfaces/repositories/file/ReadXlsxFileRespositoryInterface";
import readXlsxFile from "read-excel-file/node";
import { Stream } from "stream";
import path from "path";
import fs from "fs";

export class ReadXlsxFileRespository implements ReadXlsxFileRespositoryInterface {

  private schemaDividendFile = {
    'Produto': {
      prop: 'product',
      type: String
    },
    'Pagamento': {
      prop: 'paymentDate',
      type: String
    },
    'Tipo de Evento': {
      prop: 'typeName',
      type: String
    },
    'Instituição': {
      prop: 'institutionName',
      type: String
    },
    'Quantidade': {
      prop: 'quantity',
      type: String
    },
    'Preço unitário': {
      prop: 'price',
      type: String
    },
    'Valor líquido': {
      prop: 'total',
      type: String
    },
  }

  private schemaMovementFile = {
    'Entrada/Saída': {
      prop: 'isCredit',
      type: String
    },
    'Data': {
      prop: 'movementAt',
      type: String
    },
    'Movimentação': {
      prop: 'typeName',
      type: String
    },
    'Produto': {
      prop: 'product',
      type: String
    },
    'Instituição': {
      prop: 'institutionName',
      type: String
    },
    'Quantidade': {
      prop: 'quantity',
      type: String
    },
    'Preço unitário': {
      prop: 'price',
      type: String
    },
    'Valor da Operação': {
      prop: 'total',
      type: String
    },
  }

  async readDividendFile(file: Stream | Buffer): Promise<RowDividendFileData[]> {
    const { rows, errors } = await readXlsxFile(file, { schema: this.schemaDividendFile })

    if (errors.length > 0) {
      throw new Error('ReadXlsxFileRespository.readDividendFile: ' + JSON.stringify(errors))
    }

    return rows
      .filter((row) => row.product)
      .map((row) => {
        const [tickerId, tickerName] = (row.product as string).split(' - ')
        const paymentAt = new Date(Date.parse((row.paymentDate as string).split('/').reverse().join('-')))
        const quantity = parseFloat(row.quantity as string) || undefined
        const price = parseFloat(row.price as string) || undefined
        const total = parseFloat(row.total as string) || 0

        return {
          price,
          total,
          quantity,
          tickerId,
          paymentAt,
          tickerName,
          typeName: row.typeName as string,
          institutionName: row.institutionName as string,
        }
      })
  }

  async readMovementFile(file: Stream | Buffer): Promise<RowMovementFileData[]> {
    const { rows, errors } = await readXlsxFile(file, { schema: this.schemaMovementFile })

    if (errors.length > 0) {
      throw new Error('ReadXlsxFileRespository.readMovementFile: ' + JSON.stringify(errors))
    }

    return rows
      .filter((row) => row.product)
      .map((row) => {
        const isCredit = (row.isCredit as string).toLowerCase() === 'credito'
        const [tickerId, tickerName] = (row.product as string).split(' - ')
        const movementAt = new Date(Date.parse((row.movementAt as string).split('/').reverse().join('-')))
        const quantity = parseFloat(row.quantity as string) || 0
        const price = parseFloat(row.price as string) || undefined
        const total = parseFloat(row.total as string) || undefined
        const movementTypeName = row.typeName as string
        const institutionName = row.institutionName as string

        return {
          isCredit,
          movementAt,
          movementTypeName,
          tickerId,
          tickerName,
          institutionName,
          quantity,
          price,
          total,
        }
      })
  }

  async listFiles(directoryPath: string): Promise<string[]> {
    const files = fs.readdirSync(directoryPath)

    return files.filter(file => {
      const filePath = path.join(directoryPath, file);
      return fs.statSync(filePath).isFile() && filePath.endsWith('.xlsx');
    }).map(file => path.join(directoryPath, file));
  }
}
