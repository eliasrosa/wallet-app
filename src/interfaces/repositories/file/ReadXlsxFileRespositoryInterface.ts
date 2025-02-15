import { Stream } from "stream";

export interface RowDividendFileData {
  tickerId: string
  tickerName: string
  typeName: string
  paymentAt: Date
  institutionName: string
  total: number
  price: number | null
  quantity: number | null
}

export interface ReadXlsxFileRespositoryInterface {
  readDividendFile(file: Stream | Buffer): Promise<RowDividendFileData[]>;
}

