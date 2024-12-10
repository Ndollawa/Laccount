-- AlterTable
ALTER TABLE "Conversation" ADD COLUMN     "status" "ActiveStatus" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "Message" ALTER COLUMN "state" SET DEFAULT 'UNREAD';

-- AlterTable
ALTER TABLE "RoomMessage" ALTER COLUMN "state" SET DEFAULT 'UNREAD';
