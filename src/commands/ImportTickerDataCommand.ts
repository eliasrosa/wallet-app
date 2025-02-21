import { CheerioAPI, load } from 'cheerio';
import { PrismaClient } from '@prisma/client';
import { TickerRepository } from '@/repositories/database/TickerRepository';

const priceToNumber = (text: string): number => {
  return parseFloat(
    text.replace('R$', '').replace('.', '').replace(',', '.').trim(),
  );
};
const dyToNumber = (text: string): number => {
  return (
    (parseFloat(
      text.replace('%', '').replace('.', '').replace(',', '.').trim(),
    ) || 0) / 100
  );
};

const varToNumber = (text: string): number => {
  return (
    (parseFloat(
      text.replace('%', '').replace('.', '').replace(',', '.').trim(),
    ) || 0) / 100
  );
};

const pvpToNumber = (text: string): number => {
  return parseFloat(
    text.replace('R$', '').replace('.', '').replace(',', '.').trim(),
  );
};

const getTableIndicator = ($: CheerioAPI, text: string): string => {
  return $('#table-indicators .cell')
    .filter((_, el) => $(el).find('.name').text().trim() === text)
    .find('.value span')
    .text()
    .trim();
};

const prisma = new PrismaClient();

async function main(): Promise<void> {
  const ticker = await new TickerRepository().findOrFail('XPML11');

  const response = await fetch(
    `https://investidor10.com.br/fiis/${ticker.id.toLocaleLowerCase()}`,
  );
  const documentSelector = load(await response.text());

  const price = priceToNumber(
    documentSelector(
      '#cards-ticker > div._card.cotacao > div._card-body > div > span',
    )
      .text()
      .trim(),
  );
  const dy12m = dyToNumber(
    documentSelector(
      '#cards-ticker > div:nth-child(2) > div._card-body > div > span',
    )
      .text()
      .trim(),
  );
  const pvp = pvpToNumber(
    documentSelector('#cards-ticker > div._card.vp > div._card-body > span')
      .text()
      .trim(),
  );
  const var12m = varToNumber(
    documentSelector(
      '#cards-ticker > div:nth-child(5) > div._card-body > div > span',
    )
      .text()
      .trim(),
  );
  const volDayAvg = documentSelector(
    '#cards-ticker > div._card.val > div._card-body > span',
  )
    .text()
    .trim();
  const lastDividend = priceToNumber(
    getTableIndicator(documentSelector, 'ÚLTIMO RENDIMENTO'),
  );
  const assetValuePerShare = priceToNumber(
    getTableIndicator(documentSelector, 'VAL. PATRIMONIAL P/ COTA'),
  );

  // const gestaoTipo = getTableIndicator($, 'TIPO DE GESTÃO')
  // const segmento = getTableIndicator($, 'SEGMENTO')
  // const tipo = getTableIndicator($, 'TIPO DE FUNDO')

  await prisma.tickerData.create({
    data: {
      pvp,
      price,
      dy12m,
      var12m,
      volDayAvg,
      lastDividend,
      source: 'INVEST10',
      assetValuePerShare,
      ticker: {
        connect: {
          id: ticker.id,
        },
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
