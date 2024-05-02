-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ATIVO', 'INATIVO');

-- CreateTable
CREATE TABLE "usuario" (
    "id" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "senha" VARCHAR NOT NULL,
    "nome" VARCHAR NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modificado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cliente" (
    "id" VARCHAR NOT NULL,
    "telefone" VARCHAR NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modificado_em" TIMESTAMP(3) NOT NULL,
    "id_usuario" VARCHAR NOT NULL,

    CONSTRAINT "cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "adiministador" (
    "id" VARCHAR NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modificado_em" TIMESTAMP(3) NOT NULL,
    "id_usuario" VARCHAR NOT NULL,

    CONSTRAINT "adiministador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dia_semana" (
    "id" VARCHAR NOT NULL,
    "desc_dia" VARCHAR NOT NULL,

    CONSTRAINT "dia_semana_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "complexo_esportivo" (
    "id" VARCHAR NOT NULL,
    "nome" VARCHAR NOT NULL,
    "cnpj" VARCHAR NOT NULL,
    "rua" VARCHAR NOT NULL,
    "bairro" VARCHAR NOT NULL,
    "cidade" VARCHAR NOT NULL,
    "numero" INTEGER NOT NULL,
    "cep" VARCHAR NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modificado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "complexo_esportivo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quadra" (
    "id" VARCHAR NOT NULL,
    "nome" VARCHAR NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ATIVO',
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modificado_em" TIMESTAMP(3) NOT NULL,
    "id_complexo_esportivo" VARCHAR NOT NULL,

    CONSTRAINT "quadra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "horario_aluguel" (
    "id" VARCHAR NOT NULL,
    "horario_inicial" TIME(6) NOT NULL,
    "horario_final" TIME(6) NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ATIVO',
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modificado_em" TIMESTAMP(3) NOT NULL,
    "id_dia_semana" VARCHAR NOT NULL,
    "id_quadra" VARCHAR NOT NULL,

    CONSTRAINT "horario_aluguel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "data_aluguel" (
    "id" VARCHAR NOT NULL,
    "data" DATE NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modificado_em" TIMESTAMP(3) NOT NULL,
    "id_horario_aluguel" VARCHAR NOT NULL,
    "id_cliente" VARCHAR NOT NULL,

    CONSTRAINT "data_aluguel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "avalicao" (
    "id" VARCHAR NOT NULL,
    "id_avaliador" VARCHAR NOT NULL,
    "id_avaliado" VARCHAR NOT NULL,
    "avaliacao" INTEGER NOT NULL,
    "avaliacao_escrita" TEXT NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modificado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "avalicao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "cliente_telefone_key" ON "cliente"("telefone");

-- CreateIndex
CREATE UNIQUE INDEX "complexo_esportivo_cnpj_key" ON "complexo_esportivo"("cnpj");

-- AddForeignKey
ALTER TABLE "cliente" ADD CONSTRAINT "cliente_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adiministador" ADD CONSTRAINT "adiministador_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quadra" ADD CONSTRAINT "quadra_id_complexo_esportivo_fkey" FOREIGN KEY ("id_complexo_esportivo") REFERENCES "complexo_esportivo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "horario_aluguel" ADD CONSTRAINT "horario_aluguel_id_quadra_fkey" FOREIGN KEY ("id_quadra") REFERENCES "quadra"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "horario_aluguel" ADD CONSTRAINT "horario_aluguel_id_dia_semana_fkey" FOREIGN KEY ("id_dia_semana") REFERENCES "dia_semana"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "data_aluguel" ADD CONSTRAINT "data_aluguel_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "data_aluguel" ADD CONSTRAINT "data_aluguel_id_horario_aluguel_fkey" FOREIGN KEY ("id_horario_aluguel") REFERENCES "horario_aluguel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
