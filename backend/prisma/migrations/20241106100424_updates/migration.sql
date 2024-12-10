/*
  Warnings:

  - You are about to drop the column `data` on the `Mailer` table. All the data in the column will be lost.
  - The `status` column on the `Service` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `context` to the `Mailer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Mailer" DROP COLUMN "data",
ADD COLUMN     "context" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "status",
ADD COLUMN     "status" "ActiveStatus" NOT NULL DEFAULT 'ACTIVE';

-- CreateTable
CREATE TABLE "MailTemplate" (
    "id" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MailTemplate_pkey" PRIMARY KEY ("id")
);
