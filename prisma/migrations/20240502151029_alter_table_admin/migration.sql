/*
  Warnings:

  - You are about to drop the `adiministador` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "adiministador" DROP CONSTRAINT "adiministador_id_complexo_esportivo_fkey";

-- DropForeignKey
ALTER TABLE "adiministador" DROP CONSTRAINT "adiministador_id_usuario_fkey";

-- DropTable
DROP TABLE "adiministador";

-- CreateTable
CREATE TABLE "administrador" (
    "id" VARCHAR NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modificado_em" TIMESTAMP(3) NOT NULL,
    "id_usuario" VARCHAR NOT NULL,
    "id_complexo_esportivo" VARCHAR NOT NULL,

    CONSTRAINT "administrador_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "administrador" ADD CONSTRAINT "administrador_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "administrador" ADD CONSTRAINT "administrador_id_complexo_esportivo_fkey" FOREIGN KEY ("id_complexo_esportivo") REFERENCES "complexo_esportivo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
