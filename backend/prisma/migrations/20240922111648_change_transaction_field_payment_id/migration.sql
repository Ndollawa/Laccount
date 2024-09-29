/*
  Warnings:

  - You are about to drop the column `paymentId` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `sessionId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "paymentId",
ADD COLUMN     "sessionId" TEXT NOT NULL;
