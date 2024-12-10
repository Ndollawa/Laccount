/*
  Warnings:

  - You are about to drop the column `platform` on the `AccountDetails` table. All the data in the column will be lost.
  - You are about to drop the column `for` on the `Attachment` table. All the data in the column will be lost.
  - You are about to drop the column `listingId` on the `Attachment` table. All the data in the column will be lost.
  - You are about to drop the column `messageId` on the `Attachment` table. All the data in the column will be lost.
  - You are about to drop the column `notificationId` on the `Attachment` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `Attachment` table. All the data in the column will be lost.
  - You are about to drop the column `roomMessageId` on the `Attachment` table. All the data in the column will be lost.
  - You are about to drop the column `serviceId` on the `Attachment` table. All the data in the column will be lost.
  - Added the required column `category` to the `AccountDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetId` to the `Attachment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetType` to the `Attachment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetId` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetType` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "WalletStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'DISABLED', 'BLOCKED', 'DELETED');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "AttachmentForEnum" ADD VALUE 'LISTING';
ALTER TYPE "AttachmentForEnum" ADD VALUE 'SERVICE';
ALTER TYPE "AttachmentForEnum" ADD VALUE 'NOTIFICATION';

-- DropForeignKey
ALTER TABLE "Attachment" DROP CONSTRAINT "Attachment_listingId_fkey";

-- DropForeignKey
ALTER TABLE "Attachment" DROP CONSTRAINT "Attachment_messageId_fkey";

-- DropForeignKey
ALTER TABLE "Attachment" DROP CONSTRAINT "Attachment_notificationId_fkey";

-- DropForeignKey
ALTER TABLE "Attachment" DROP CONSTRAINT "Attachment_postId_fkey";

-- DropForeignKey
ALTER TABLE "Attachment" DROP CONSTRAINT "Attachment_roomMessageId_fkey";

-- DropForeignKey
ALTER TABLE "Attachment" DROP CONSTRAINT "Attachment_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_categoryId_fkey";

-- AlterTable
ALTER TABLE "AccountDetails" DROP COLUMN "platform",
ADD COLUMN     "category" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Attachment" DROP COLUMN "for",
DROP COLUMN "listingId",
DROP COLUMN "messageId",
DROP COLUMN "notificationId",
DROP COLUMN "postId",
DROP COLUMN "roomMessageId",
DROP COLUMN "serviceId",
ADD COLUMN     "targetId" TEXT NOT NULL,
ADD COLUMN     "targetType" "AttachmentForEnum" NOT NULL;

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "image" TEXT,
ADD COLUMN     "targetId" TEXT NOT NULL,
ADD COLUMN     "targetType" "CategoryForEnum" NOT NULL;

-- AlterTable
ALTER TABLE "Wallet" ADD COLUMN     "status" "WalletStatus" NOT NULL DEFAULT 'ACTIVE';

-- CreateIndex
CREATE INDEX "Attachment_targetId_targetType_idx" ON "Attachment"("targetId", "targetType");

-- CreateIndex
CREATE INDEX "Category_targetId_targetType_idx" ON "Category"("targetId", "targetType");
