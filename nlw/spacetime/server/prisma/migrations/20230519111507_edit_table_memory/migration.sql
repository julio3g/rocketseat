/*
  Warnings:

  - You are about to drop the column `coverURL` on the `models` table. All the data in the column will be lost.
  - Added the required column `coverUrl` to the `models` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_models" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "coverUrl" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "models_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_models" ("content", "createdAt", "id", "isPublic", "userId") SELECT "content", "createdAt", "id", "isPublic", "userId" FROM "models";
DROP TABLE "models";
ALTER TABLE "new_models" RENAME TO "models";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
