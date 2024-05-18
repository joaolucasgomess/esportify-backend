/*
  Warnings:

  - The `data_nascimento` column on the `cliente` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "cliente" DROP COLUMN "data_nascimento",
ADD COLUMN     "data_nascimento" TIME(6);

-- AlterTable
ALTER TABLE "horario_aluguel" ADD COLUMN     "deletado" BOOLEAN NOT NULL DEFAULT false;
