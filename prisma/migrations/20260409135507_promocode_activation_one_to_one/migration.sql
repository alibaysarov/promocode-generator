/*
  Warnings:

  - A unique constraint covering the columns `[promocodeId]` on the table `Activation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Activation_promocodeId_key" ON "Activation"("promocodeId");
