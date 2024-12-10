/*
  Warnings:

  - The `status` column on the `Mailer` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `SubscriptionPlan` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Mailer" DROP COLUMN "status",
ADD COLUMN     "status" "ActiveStatus" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "SubscriptionPlan" DROP COLUMN "status",
ADD COLUMN     "status" "ActiveStatus" NOT NULL DEFAULT 'ACTIVE';

-- DropEnum
DROP TYPE "MailerTemplateStatus";

-- DropEnum
DROP TYPE "PlanStatus";
