/*
  Warnings:

  - You are about to drop the column `hash` on the `Negotiation` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Negotiation_hash_idx";

-- DropIndex
DROP INDEX "Negotiation_hash_key";

-- AlterTable
ALTER TABLE "Negotiation" DROP COLUMN "hash";
