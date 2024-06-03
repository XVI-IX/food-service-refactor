-- AlterEnum
ALTER TYPE "OrderStatusEnum" ADD VALUE 'failed';

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_timeslotId_fkey";

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "timeslotId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_timeslotId_fkey" FOREIGN KEY ("timeslotId") REFERENCES "timeslots"("id") ON DELETE SET NULL ON UPDATE CASCADE;
