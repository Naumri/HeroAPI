-- DropForeignKey
ALTER TABLE `Hero` DROP FOREIGN KEY `Hero_teamId_fkey`;

-- DropIndex
DROP INDEX `Hero_teamId_fkey` ON `Hero`;

-- AlterTable
ALTER TABLE `Hero` MODIFY `teamId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Hero` ADD CONSTRAINT `Hero_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Team`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
