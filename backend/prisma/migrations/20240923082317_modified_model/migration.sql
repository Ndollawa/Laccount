/*
  Warnings:

  - The values [DECLINED,REPLIED] on the enum `TicketStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `resolvedOn` on the `SupportTicket` table. All the data in the column will be lost.
  - Added the required column `description` to the `SupportTicket` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `priority` on the `SupportTicket` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `category` on the `SupportTicket` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TicketCategory" AS ENUM ('BILLING', 'TECHNICAL', 'GENERAL', 'ACCOUNT');

-- CreateEnum
CREATE TYPE "TicketPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');

-- AlterEnum
BEGIN;
CREATE TYPE "TicketStatus_new" AS ENUM ('OPEN', 'PENDING', 'IN_PROGRESS', 'RESOLVED', 'CLOSED');
ALTER TABLE "SupportTicket" ALTER COLUMN "status" TYPE "TicketStatus_new" USING ("status"::text::"TicketStatus_new");
ALTER TYPE "TicketStatus" RENAME TO "TicketStatus_old";
ALTER TYPE "TicketStatus_new" RENAME TO "TicketStatus";
DROP TYPE "TicketStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "SupportTicket" DROP COLUMN "resolvedOn",
ADD COLUMN     "assignedToId" TEXT,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "resolvedAt" TIMESTAMP(3),
DROP COLUMN "priority",
ADD COLUMN     "priority" "TicketPriority" NOT NULL,
DROP COLUMN "category",
ADD COLUMN     "category" "TicketCategory" NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'OPEN';

-- AddForeignKey
ALTER TABLE "SupportTicket" ADD CONSTRAINT "SupportTicket_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
