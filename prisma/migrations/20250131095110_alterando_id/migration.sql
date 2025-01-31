/*
  Warnings:

  - The primary key for the `Funcionario` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Funcionario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "bilhete" TEXT NOT NULL
);
INSERT INTO "new_Funcionario" ("bilhete", "id", "nome", "telefone") SELECT "bilhete", "id", "nome", "telefone" FROM "Funcionario";
DROP TABLE "Funcionario";
ALTER TABLE "new_Funcionario" RENAME TO "Funcionario";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
