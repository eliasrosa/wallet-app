import { ReadXlsxFileRespositoryInterface, RowDividendFileData } from "@/interfaces/repositories/file/ReadXlsxFileRespositoryInterface";
import readXlsxFile from "read-excel-file/node";
import { Stream } from "stream";

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
        const quantity = parseFloat(row.quantity as string) || null
        const price = parseFloat(row.price as string) || null
        const total = parseFloat(row.total as string)

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
}
