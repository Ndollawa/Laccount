/*
  Warnings:

  - You are about to drop the column `postId` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Category` table. All the data in the column will be lost.
  - Added the required column `for` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CategoryForEnum" AS ENUM ('POST');

-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_postId_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "postId",
DROP COLUMN "type",
ADD COLUMN     "for" "CategoryForEnum" NOT NULL;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "categoryId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
