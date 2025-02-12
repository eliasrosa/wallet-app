-- CreateTable
CREATE TABLE "Ticker" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ticker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Institution" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Institution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DividendType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DividendType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dividend" (
    "id" TEXT NOT NULL,
    "tickerId" TEXT NOT NULL,
    "institutionId" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "paymentAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "dividendTypeId" INTEGER,

    CONSTRAINT "Dividend_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ticker_id_key" ON "Ticker"("id");

-- AddForeignKey
ALTER TABLE "Dividend" ADD CONSTRAINT "Dividend_tickerId_fkey" FOREIGN KEY ("tickerId") REFERENCES "Ticker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dividend" ADD CONSTRAINT "Dividend_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "Institution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dividend" ADD CONSTRAINT "Dividend_dividendTypeId_fkey" FOREIGN KEY ("dividendTypeId") REFERENCES "DividendType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
