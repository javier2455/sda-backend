/*
  Warnings:

  - A unique constraint covering the columns `[key]` on the table `api_headers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "api_headers_key_key" ON "api_headers"("key");
