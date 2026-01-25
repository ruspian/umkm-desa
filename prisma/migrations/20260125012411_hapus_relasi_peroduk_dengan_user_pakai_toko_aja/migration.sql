/*
  Warnings:

  - You are about to drop the column `userId` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_userId_fkey";

-- DropIndex
DROP INDEX "Product_userId_idx";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "userId";

-- CreateIndex
CREATE INDEX "Product_tokoId_idx" ON "Product"("tokoId");
