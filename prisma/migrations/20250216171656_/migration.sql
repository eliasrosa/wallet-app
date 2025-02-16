-- CreateEnum
CREATE TYPE "SourceEnum" AS ENUM ('INVEST10');

-- CreateTable
CREATE TABLE "TickerData" (
    "id" TEXT NOT NULL,
    "source" "SourceEnum" NOT NULL,
    "tickerId" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "dy12m" DOUBLE PRECISION NOT NULL,
    "pvp" DOUBLE PRECISION NOT NULL,
    "var12m" DOUBLE PRECISION NOT NULL,
    "volDayAvg" TEXT NOT NULL,
    "lastDividend" DOUBLE PRECISION NOT NULL,
    "assetValuePerShare" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TickerData_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TickerData" ADD CONSTRAINT "TickerData_tickerId_fkey" FOREIGN KEY ("tickerId") REFERENCES "Ticker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
