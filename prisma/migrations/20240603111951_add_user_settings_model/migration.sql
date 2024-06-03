-- CreateTable
CREATE TABLE "userSettings" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "userSettings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "userSettings" ADD CONSTRAINT "userSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
