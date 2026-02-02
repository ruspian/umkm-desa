-- CreateEnum
CREATE TYPE "StatusOrder" AS ENUM ('PENDING', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "tokoId" TEXT NOT NULL,
    "items" JSONB NOT NULL,
    "totalPrice" INTEGER NOT NULL,
    "status" "StatusOrder" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_tokoId_fkey" FOREIGN KEY ("tokoId") REFERENCES "Toko"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
