/*
  Warnings:

  - Changed the type of `inputOrOutput` on the `api_params` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "api_params" DROP COLUMN "inputOrOutput",
ADD COLUMN     "inputOrOutput" INTEGER NOT NULL;
