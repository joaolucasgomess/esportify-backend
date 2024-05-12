/*
  Warnings:

  - Added the required column `id_complexo_esportivo` to the `adiministador` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "adiministador" ADD COLUMN     "id_complexo_esportivo" VARCHAR NOT NULL;

-- AddForeignKey
ALTER TABLE "adiministador" ADD CONSTRAINT "adiministador_id_complexo_esportivo_fkey" FOREIGN KEY ("id_complexo_esportivo") REFERENCES "complexo_esportivo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
