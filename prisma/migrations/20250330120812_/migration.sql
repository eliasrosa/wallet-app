-- DropForeignKey
ALTER TABLE "WalletTicker" DROP CONSTRAINT "WalletTicker_tickerId_fkey";

-- DropForeignKey
ALTER TABLE "WalletTicker" DROP CONSTRAINT "WalletTicker_walletId_fkey";

-- AddForeignKey
ALTER TABLE "WalletTicker" ADD CONSTRAINT "WalletTicker_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WalletTicker" ADD CONSTRAINT "WalletTicker_tickerId_fkey" FOREIGN KEY ("tickerId") REFERENCES "Ticker"("id") ON DELETE CASCADE ON UPDATE CASCADE;
