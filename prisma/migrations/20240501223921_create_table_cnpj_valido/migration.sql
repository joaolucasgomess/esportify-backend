-- CreateEnum
CREATE TYPE "Cadastrado" AS ENUM ('SIM', 'NAO');

-- CreateTable
CREATE TABLE "cnpj_valido" (
    "id" VARCHAR NOT NULL,
    "cnpj" VARCHAR NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ATIVO',
    "cadastrado" "Cadastrado" NOT NULL DEFAULT 'NAO',

    CONSTRAINT "cnpj_valido_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cnpj_valido_cnpj_key" ON "cnpj_valido"("cnpj");
