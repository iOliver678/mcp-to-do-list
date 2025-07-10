/*
  Warnings:

  - The primary key for the `Task` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Task` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `description` on table `Task` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dueDate` on table `Task` required. This step will fail if there are existing NULL values in that column.
  - Made the column `priority` on table `Task` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Task" DROP CONSTRAINT "Task_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "dueDate" SET NOT NULL,
ALTER COLUMN "priority" SET NOT NULL,
ALTER COLUMN "status" SET NOT NULL,
ADD CONSTRAINT "Task_pkey" PRIMARY KEY ("id");
