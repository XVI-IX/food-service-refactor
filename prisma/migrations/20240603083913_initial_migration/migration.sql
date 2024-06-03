-- CreateEnum
CREATE TYPE "userRole" AS ENUM ('customer', 'vendor');

-- CreateEnum
CREATE TYPE "genericStatus" AS ENUM ('pending', 'accepted');

-- CreateEnum
CREATE TYPE "OrderStatusEnum" AS ENUM ('placed', 'confirmed', 'in_progress', 'out_for_delivery', 'delivered', 'cancelled');

-- CreateEnum
CREATE TYPE "OrderTypeEnum" AS ENUM ('delivery', 'pickup', 'dine_in');

-- CreateEnum
CREATE TYPE "OrderEventTypeEnum" AS ENUM ('status_change', 'modification', 'cancellation');

-- CreateEnum
CREATE TYPE "PaymentStatusEnum" AS ENUM ('pending', 'success', 'failed', 'reversed', 'cancelled');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "otherName" TEXT,
    "lastName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "google_id" TEXT,
    "role" "userRole" NOT NULL DEFAULT 'customer',
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "verificationToken" TEXT,
    "resetToken" TEXT,
    "resetTokenExpiration" TEXT,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "genericStatus" DEFAULT 'pending',
    "businessAddress" TEXT,
    "recipientCode" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stores" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "instagramUrl" TEXT,
    "facebookUrl" TEXT,
    "xUrl" TEXT,
    "youtubeUrl" TEXT,
    "description" TEXT NOT NULL,
    "openingHours" TEXT,
    "deliveryRadius" DOUBLE PRECISION,
    "deliveryFee" DOUBLE PRECISION DEFAULT 0,
    "minOrderAmountForDelivery" DOUBLE PRECISION DEFAULT 0,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "active" BOOLEAN DEFAULT false,
    "status" "genericStatus" NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "avgRating" DOUBLE PRECISION,
    "totalReviews" INTEGER,
    "isOpen" BOOLEAN DEFAULT true,

    CONSTRAINT "stores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "items" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "storeId" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "ingredients" TEXT[],
    "calories" DOUBLE PRECISION,
    "fatContent" DOUBLE PRECISION,
    "portionSize" TEXT,
    "allergens" TEXT[],
    "tags" TEXT[],
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "storeId" UUID NOT NULL,
    "deliveryLocation" TEXT NOT NULL,
    "deliveryStatus" "OrderStatusEnum" NOT NULL DEFAULT 'placed',
    "orderReference" TEXT NOT NULL,
    "deliveryInstructions" TEXT,
    "subTotalPrice" DOUBLE PRECISION NOT NULL,
    "paymentMethod" TEXT,
    "estimatedDeliveryTime" TIMESTAMP(3),
    "feedback" TEXT,
    "rating" DOUBLE PRECISION,
    "promoCode" TEXT,
    "cancellationReason" TEXT,
    "taxAmount" TEXT,
    "deliveryFee" TEXT,
    "timeslotId" UUID NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orderHistory" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "orderId" UUID NOT NULL,
    "eventType" "OrderEventTypeEnum" NOT NULL DEFAULT 'status_change',
    "timestamp" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actorId" UUID NOT NULL,
    "details" TEXT,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orderHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orderItems" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "orderId" UUID NOT NULL,
    "itemId" UUID NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "totalItemPrice" DOUBLE PRECISION,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "orderItems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timeslots" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "startTime" TIMESTAMP(6) NOT NULL,
    "endTime" TIMESTAMP(6) NOT NULL,
    "timezone" TEXT NOT NULL,
    "orderCount" INTEGER DEFAULT 0,
    "currentCapacity" INTEGER DEFAULT 0,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "timeslots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "description" TEXT,
    "reference" TEXT,
    "orderId" UUID,
    "storeId" UUID,
    "paymentStatus" "PaymentStatusEnum" DEFAULT 'pending',
    "amount" DOUBLE PRECISION DEFAULT 0,
    "transactionType" TEXT NOT NULL DEFAULT 'trasacio',
    "paymentDate" TIMESTAMP(3),
    "gatewayResponse" JSONB,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_verificationToken_key" ON "users"("verificationToken");

-- CreateIndex
CREATE UNIQUE INDEX "orders_orderReference_key" ON "orders"("orderReference");

-- CreateIndex
CREATE UNIQUE INDEX "timeslots_startTime_endTime_key" ON "timeslots"("startTime", "endTime");

-- CreateIndex
CREATE UNIQUE INDEX "transactions_reference_key" ON "transactions"("reference");

-- AddForeignKey
ALTER TABLE "stores" ADD CONSTRAINT "stores_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "stores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "stores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_timeslotId_fkey" FOREIGN KEY ("timeslotId") REFERENCES "timeslots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderHistory" ADD CONSTRAINT "orderHistory_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderHistory" ADD CONSTRAINT "orderHistory_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderItems" ADD CONSTRAINT "orderItems_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderItems" ADD CONSTRAINT "orderItems_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "stores"("id") ON DELETE SET NULL ON UPDATE CASCADE;
