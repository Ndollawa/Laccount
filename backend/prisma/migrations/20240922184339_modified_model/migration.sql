/*
  Warnings:

  - The `status` column on the `Category` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Service` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "PublishStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "status",
ADD COLUMN     "status" "PublishStatus" NOT NULL DEFAULT 'PUBLISHED';

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "status",
ADD COLUMN     "status" "PublishStatus" NOT NULL DEFAULT 'PUBLISHED';

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "status",
ADD COLUMN     "status" "PublishStatus" NOT NULL DEFAULT 'PUBLISHED';

-- DropEnum
DROP TYPE "PostStatus";
