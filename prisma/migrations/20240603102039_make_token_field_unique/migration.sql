/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `revokedToken` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "revokedToken_token_key" ON "revokedToken"("token");
