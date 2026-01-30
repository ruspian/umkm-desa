-- CreateTable
CREATE TABLE "WebConfig" (
    "id" TEXT NOT NULL DEFAULT 'system-settings',
    "siteName" TEXT NOT NULL DEFAULT 'AsliSini',
    "slogan" TEXT,
    "contactWa" TEXT,
    "isOpenRegistration" BOOLEAN NOT NULL DEFAULT true,
    "isMaintenance" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WebConfig_pkey" PRIMARY KEY ("id")
);
