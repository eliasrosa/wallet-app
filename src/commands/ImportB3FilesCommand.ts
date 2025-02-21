import { ReadXlsxFileRespositoryInterface } from '@/repositories/file-b3/interfaces/ReadXlsxFileRespositoryInterface';
import { ImportDividendsService } from '@/services/ImportDividendsService';
import { ImportMovementsService } from '@/services/ImportMovementsService';
import { container } from '@/app';
import { TYPES } from '@/types';

const a = ['a', 'b', 'c'];
const b = ['d', 'e', 'f', 'g'];

async function importDividends(
  readXlsxFileRespository: ReadXlsxFileRespositoryInterface,
): Promise<void> {
  const dividendFilesPath =
    await readXlsxFileRespository.listFiles('data/b3/dividends');

  for await (const filePath of dividendFilesPath) {
    await new ImportDividendsService().execute(filePath);
  }
}

async function importMovements(
  readXlsxFileRespository: ReadXlsxFileRespositoryInterface,
): Promise<void> {
  const movementFilesPath =
    await readXlsxFileRespository.listFiles('data/b3/movements');

  for await (const filePath of movementFilesPath) {
    await new ImportMovementsService().execute(filePath);
  }
}

async function main(): Promise<void> {
  const readXlsxFileRespository =
    container.get<ReadXlsxFileRespositoryInterface>(
      TYPES.ReadXlsxFileRespositoryInterface,
    );

  await importDividends(readXlsxFileRespository);
  await importMovements(readXlsxFileRespository);
}

main()
  .then(async () => {})
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  });
