/*
  Warnings:

  - You are about to drop the column `for` on the `Category` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "CategoryForEnum" ADD VALUE 'LISTING';

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "for";
