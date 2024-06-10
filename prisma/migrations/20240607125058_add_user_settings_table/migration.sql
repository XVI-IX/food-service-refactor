/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `userSettings` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "notifications" ADD COLUMN     "storeId" UUID,
ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "userSettings" ADD COLUMN     "darkmode" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "languagePreference" TEXT NOT NULL DEFAULT 'en',
ADD COLUMN     "recieveEmailUpdates" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "recieveSMSUpdates" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "timezone" TEXT NOT NULL DEFAULT 'UTC';

-- CreateIndex
CREATE UNIQUE INDEX "userSettings_userId_key" ON "userSettings"("userId");

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "stores"("id") ON DELETE SET NULL ON UPDATE CASCADE;
