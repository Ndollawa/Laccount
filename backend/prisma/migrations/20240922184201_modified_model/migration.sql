/*
  Warnings:

  - The `tags` column on the `Service` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `state` on the `Message` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `status` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ViewState" AS ENUM ('READ', 'UNREAD', 'REMOVED', 'DELETED');

-- AlterEnum
ALTER TYPE "TransactionPurpose" ADD VALUE 'PURCHASE';

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "state",
ADD COLUMN     "state" "ViewState" NOT NULL;

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "status" "ViewState" NOT NULL;

-- AlterTable
ALTER TABLE "Service" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "icon" DROP NOT NULL,
ALTER COLUMN "image" DROP NOT NULL,
DROP COLUMN "tags",
ADD COLUMN     "tags" TEXT[];

-- DropEnum
DROP TYPE "MessageState";
