/*
  Warnings:

  - You are about to drop the column `description` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `followers` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `platform` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Listing` table. All the data in the column will be lost.
  - Added the required column `notificationId` to the `Attachment` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `Mailer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('SYSTEM', 'USER');

-- CreateEnum
CREATE TYPE "SettingsType" AS ENUM ('DASHBOARD', 'LANDING', 'COMPANY_INFO', 'SITE_IMAGES', 'PAGES');

-- CreateEnum
CREATE TYPE "MailType" AS ENUM ('DRAFT', 'PUBLISHED', 'DELETED');

-- DropIndex
DROP INDEX "Message_conversationId_key";

-- DropIndex
DROP INDEX "Message_senderId_key";

-- DropIndex
DROP INDEX "Wallet_userId_key";

-- AlterTable
ALTER TABLE "AccountDetails" ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "Attachment" ADD COLUMN     "notificationId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Listing" DROP COLUMN "description",
DROP COLUMN "followers",
DROP COLUMN "platform",
DROP COLUMN "username";

-- AlterTable
ALTER TABLE "Mailer" DROP COLUMN "type",
ADD COLUMN     "type" "MailType" NOT NULL;

-- AlterTable
ALTER TABLE "Wallet" ALTER COLUMN "currency" DROP NOT NULL;

-- CreateTable
CREATE TABLE "AppSettings" (
    "id" TEXT NOT NULL,
    "userDefined" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL,
    "type" "SettingsType" NOT NULL,
    "default" JSONB NOT NULL,
    "settings" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AppSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "notification" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "state" "MessageState" NOT NULL,
    "status" "ActiveStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES "Notification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
