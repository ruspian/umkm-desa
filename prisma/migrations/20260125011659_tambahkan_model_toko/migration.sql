/*
  Warnings:

  - Added the required column `tokoId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "tokoId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Toko" (
    "id" TEXT NOT NULL,
    "namaToko" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "deskripsi" TEXT,
    "logo" TEXT,
    "alamat" TEXT,
    "noWhatsapp" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Toko_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Toko_namaToko_key" ON "Toko"("namaToko");

-- CreateIndex
CREATE UNIQUE INDEX "Toko_slug_key" ON "Toko"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Toko_userId_key" ON "Toko"("userId");

-- AddForeignKey
ALTER TABLE "Toko" ADD CONSTRAINT "Toko_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_tokoId_fkey" FOREIGN KEY ("tokoId") REFERENCES "Toko"("id") ON DELETE CASCADE ON UPDATE CASCADE;
