/*
  Warnings:

  - You are about to drop the column `body` on the `MailTemplate` table. All the data in the column will be lost.
  - You are about to drop the `Mailer` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `template` to the `MailTemplate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MailTemplate" DROP COLUMN "body",
ADD COLUMN     "status" "ActiveStatus" NOT NULL DEFAULT 'ACTIVE',
ADD COLUMN     "template" TEXT NOT NULL;

-- DropTable
DROP TABLE "Mailer";

-- CreateTable
CREATE TABLE "EMailTemplate" (
    "id" TEXT NOT NULL,
    "type" "MailerTemplateEnum" NOT NULL,
    "templateId" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "context" JSONB NOT NULL,
    "status" "ActiveStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "EMailTemplate_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EMailTemplate" ADD CONSTRAINT "EMailTemplate_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "MailTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
