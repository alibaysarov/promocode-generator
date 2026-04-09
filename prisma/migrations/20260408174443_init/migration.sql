/*
  Warnings:

  - You are about to drop the column `activationsCount` on the `Promocode` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Promocode" DROP COLUMN "activationsCount";

-- CreateTable
CREATE TABLE "Activation" (
    "id" UUID NOT NULL,
    "promocodeId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Activation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Activation" ADD CONSTRAINT "Activation_promocodeId_fkey" FOREIGN KEY ("promocodeId") REFERENCES "Promocode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
