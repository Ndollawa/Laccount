-- AlterTable
ALTER TABLE "_ConversationToUser" ADD CONSTRAINT "_ConversationToUser_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_ConversationToUser_AB_unique";

-- AlterTable
ALTER TABLE "_RoomsBelongedTo" ADD CONSTRAINT "_RoomsBelongedTo_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_RoomsBelongedTo_AB_unique";
