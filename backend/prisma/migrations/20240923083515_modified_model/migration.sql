/*
  Warnings:

  - You are about to drop the column `author` on the `Testimonial` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Testimonial` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Testimonial` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Testimonial" DROP COLUMN "author",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Testimonial_userId_key" ON "Testimonial"("userId");
