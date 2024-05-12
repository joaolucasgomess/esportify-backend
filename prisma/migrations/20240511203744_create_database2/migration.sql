/*
  Warnings:

  - Added the required column `data_nascimento` to the `cliente` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cliente" ADD COLUMN     "data_nascimento" DATE NOT NULL;
