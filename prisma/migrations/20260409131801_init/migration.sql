/*
  Warnings:

  - Added the required column `userId` to the `Activation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Promocode" DROP CONSTRAINT "Promocode_userId_fkey";

-- AlterTable
ALTER TABLE "Activation" ADD COLUMN     "userId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "Activation" ADD CONSTRAINT "Activation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
