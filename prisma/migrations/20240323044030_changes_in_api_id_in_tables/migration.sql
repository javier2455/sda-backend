/*
  Warnings:

  - You are about to drop the column `entityApiId` on the `api_entity` table. All the data in the column will be lost.
  - You are about to drop the column `headersApiId` on the `api_headers` table. All the data in the column will be lost.
  - You are about to drop the column `paramsApiId` on the `api_params` table. All the data in the column will be lost.
  - Added the required column `apiId` to the `api_entity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `apiId` to the `api_headers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `apiId` to the `api_params` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "api_entity" DROP CONSTRAINT "api_entity_entityApiId_fkey";

-- DropForeignKey
ALTER TABLE "api_headers" DROP CONSTRAINT "api_headers_headersApiId_fkey";

-- DropForeignKey
ALTER TABLE "api_params" DROP CONSTRAINT "api_params_paramsApiId_fkey";

-- AlterTable
ALTER TABLE "api_entity" DROP COLUMN "entityApiId",
ADD COLUMN     "apiId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "api_headers" DROP COLUMN "headersApiId",
ADD COLUMN     "apiId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "api_params" DROP COLUMN "paramsApiId",
ADD COLUMN     "apiId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "api_headers" ADD CONSTRAINT "api_headers_apiId_fkey" FOREIGN KEY ("apiId") REFERENCES "api"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "api_params" ADD CONSTRAINT "api_params_apiId_fkey" FOREIGN KEY ("apiId") REFERENCES "api"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "api_entity" ADD CONSTRAINT "api_entity_apiId_fkey" FOREIGN KEY ("apiId") REFERENCES "api"("id") ON DELETE CASCADE ON UPDATE CASCADE;
