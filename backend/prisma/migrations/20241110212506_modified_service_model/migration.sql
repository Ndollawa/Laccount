/*
  Warnings:

  - You are about to drop the column `image` on the `Category` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "CategoryIconType" AS ENUM ('ICON', 'SVG', 'IMAGE');

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "image",
ADD COLUMN     "icon" TEXT,
ADD COLUMN     "iconType" "CategoryIconType";
