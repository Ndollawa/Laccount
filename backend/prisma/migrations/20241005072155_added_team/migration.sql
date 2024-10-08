-- DropForeignKey
ALTER TABLE "Listing" DROP CONSTRAINT "Listing_sellerId_fkey";

-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_sellerId_fkey";

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "firstName" VARCHAR(80) NOT NULL,
    "middleName" VARCHAR(80),
    "lastName" VARCHAR(80),
    "position" TEXT,
    "bio" TEXT,
    "image" TEXT,
    "socialMedia" JSONB,
    "status" "ActiveStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Listing" ADD CONSTRAINT "Listing_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
