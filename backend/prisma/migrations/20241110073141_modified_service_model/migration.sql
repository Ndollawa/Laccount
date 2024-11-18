/*
  Warnings:

  - The `status` column on the `Comment` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "status",
ADD COLUMN     "status" "PublishStatus" NOT NULL DEFAULT 'PUBLISHED';

-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "contact" TEXT,
ADD COLUMN     "email" TEXT;

-- DropEnum
DROP TYPE "CommentStatus";
