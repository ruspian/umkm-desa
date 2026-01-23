-- CreateEnum
CREATE TYPE "StatusProduct" AS ENUM ('Pending', 'Approved', 'Rejected');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "status" "StatusProduct" NOT NULL DEFAULT 'Pending';
