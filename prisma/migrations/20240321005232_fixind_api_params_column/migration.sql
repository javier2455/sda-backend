/*
  Warnings:

  - You are about to drop the column `inOrOut` on the `api_params` table. All the data in the column will be lost.
  - Added the required column `inputOrOutput` to the `api_params` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "api_params" DROP COLUMN "inOrOut",
ADD COLUMN     "inputOrOutput" TEXT NOT NULL;
