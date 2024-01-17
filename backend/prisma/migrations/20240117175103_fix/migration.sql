/*
  Warnings:

  - You are about to drop the column `code` on the `Node` table. All the data in the column will be lost.
  - Added the required column `countryCode` to the `Node` table without a default value. This is not possible if the table is not empty.
  - Made the column `ip` on table `Node` required. This step will fail if there are existing NULL values in that column.
  - Made the column `key` on table `Node` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Node` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `accessKey` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Session" (
    "id" INTEGER NOT NULL,
    "key" TEXT NOT NULL PRIMARY KEY,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Node" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "key" TEXT NOT NULL
);
INSERT INTO "new_Node" ("id", "ip", "key", "name") SELECT "id", "ip", "key", "name" FROM "Node";
DROP TABLE "Node";
ALTER TABLE "new_Node" RENAME TO "Node";
CREATE TABLE "new_Profile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "accessKey" TEXT NOT NULL,
    "nodeId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Profile_nodeId_fkey" FOREIGN KEY ("nodeId") REFERENCES "Node" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Profile" ("id", "nodeId", "userId") SELECT "id", "nodeId", "userId" FROM "Profile";
DROP TABLE "Profile";
ALTER TABLE "new_Profile" RENAME TO "Profile";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
