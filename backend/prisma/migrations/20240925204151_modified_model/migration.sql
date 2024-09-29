/*
  Warnings:

  - Changed the type of `currency` on the `Wallet` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Wallet" DROP COLUMN "currency",
ADD COLUMN     "currency" JSONB NOT NULL;
