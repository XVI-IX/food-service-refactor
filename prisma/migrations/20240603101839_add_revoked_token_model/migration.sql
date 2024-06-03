-- CreateTable
CREATE TABLE "revokedToken" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "token" TEXT NOT NULL,
    "revokedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "revokedToken_pkey" PRIMARY KEY ("id")
);
