/*
  Warnings:

  - Added the required column `modificado_em` to the `cnpj_valido` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cnpj_valido" ADD COLUMN     "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "modificado_em" TIMESTAMP(3) NOT NULL;
