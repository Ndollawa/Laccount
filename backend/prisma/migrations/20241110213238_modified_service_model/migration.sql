/*
  Warnings:

  - You are about to drop the column `category` on the `AccountDetails` table. All the data in the column will be lost.
  - You are about to drop the column `targetId` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `targetType` on the `Category` table. All the data in the column will be lost.
  - The `status` column on the `Category` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `categoryId` to the `AccountDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `for` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Category_targetId_targetType_idx";

-- AlterTable
ALTER TABLE "AccountDetails" DROP COLUMN "category",
ADD COLUMN     "categoryId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "targetId",
DROP COLUMN "targetType",
ADD COLUMN     "for" "CategoryForEnum" NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "ActiveStatus" NOT NULL DEFAULT 'ACTIVE';
