-- CreateTable
CREATE TABLE "usuario" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "contrasena" VARCHAR(255) NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_favoritos" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_favoritos_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_username_key" ON "usuario"("username");

-- CreateIndex
CREATE INDEX "_favoritos_B_index" ON "_favoritos"("B");

-- AddForeignKey
ALTER TABLE "_favoritos" ADD CONSTRAINT "_favoritos_A_fkey" FOREIGN KEY ("A") REFERENCES "pokemon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_favoritos" ADD CONSTRAINT "_favoritos_B_fkey" FOREIGN KEY ("B") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
