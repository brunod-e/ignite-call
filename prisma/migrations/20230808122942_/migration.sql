/*
  Warnings:

  - You are about to drop the column `observations` on the `schedulings` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_schedulings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "notes" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "schedulings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_schedulings" ("created_at", "date", "email", "id", "name", "user_id") SELECT "created_at", "date", "email", "id", "name", "user_id" FROM "schedulings";
DROP TABLE "schedulings";
ALTER TABLE "new_schedulings" RENAME TO "schedulings";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
