/*
  Warnings:

  - Made the column `goal` on table `WalletTicker` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "WalletTicker" ALTER COLUMN "goal" SET NOT NULL,
ALTER COLUMN "isGoalFixed" SET DEFAULT false;
