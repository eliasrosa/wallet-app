import { PrismaClient, Wallet } from '@prisma/client';
import { TickerRepository } from '@/repositories/database/TickerRepository';
import { sumBy } from 'lodash';

const prisma = new PrismaClient()

const distGoal = async (wallet: Wallet, type: 'FII' | 'ETF') => {
  const tickersETF = await prisma.walletTicker.findMany({
    where: {
      isGoalFixed: false,
      walletId: wallet.id,
      ticker: { type }
    }
  })

  const tickersETFWithGoalFixed = await prisma.walletTicker.findMany({
    where: {
      isGoalFixed: true,
      walletId: wallet.id,
      ticker: { type }
    }
  })

  const length = { tickersETF: tickersETF.length, withGoal: tickersETFWithGoalFixed.length }
  const totalGoal = sumBy(tickersETFWithGoalFixed, 'goal')
  const totalGoalETF = wallet.goalETF
  const totalGoalDistributed = totalGoalETF - totalGoal
  const goalDistributed = totalGoalDistributed / tickersETF.length

  await prisma.walletTicker.updateMany({
    where: {
      isGoalFixed: false,
      walletId: wallet.id,
      tickerId: { in: tickersETF.map(ticker => ticker.tickerId) },
    },
    data: {
      goal: goalDistributed
    }
  })

  console.log({ tickersETFWithGoalFixed, totalGoal, totalGoalETF, totalGoalDistributed, goalDistributed, length })
}

async function main(): Promise<void> {

  await prisma.walletTicker.deleteMany()
  await prisma.wallet.deleteMany()

  const wallet = await prisma.wallet.create({
    data: {
      name: 'My Wallet',
      goalFII: 0.25,
      goalStock: 0.25,
      goalETF: 0.25,
      goalRF: 0.25,
    }
  })

  const tickers = (await (new TickerRepository()).getAll()).map(ticker => {
    return {
      tickerId: ticker.id,
      walletId: wallet.id,
      goal: 0,
      isGoalFixed: false
    }
  })

  await prisma.walletTicker.createMany({ data: tickers })

  await prisma.walletTicker.update({
    where: { tickerId: 'BOVA11', walletId: wallet.id },
    data: { goal: 0.03, isGoalFixed: true },
  })

  await prisma.walletTicker.update({
    where: { tickerId: 'IVVB11', walletId: wallet.id },
    data: { goal: 0.10, isGoalFixed: true },
  })

  await prisma.walletTicker.update({
    where: { tickerId: 'VISC11', walletId: wallet.id },
    data: { goal: 0.05, isGoalFixed: true },
  })

  await prisma.walletTicker.update({
    where: { tickerId: 'XPML11', walletId: wallet.id },
    data: { goal: 0.02, isGoalFixed: true },
  })

  await prisma.walletTicker.update({
    where: { tickerId: 'MXRF11', walletId: wallet.id },
    data: { goal: 0.01, isGoalFixed: true },
  })

  await distGoal(wallet, 'ETF')
  await distGoal(wallet, 'FII')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })