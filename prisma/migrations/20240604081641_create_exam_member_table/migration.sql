-- CreateTable
CREATE TABLE `exam_member` (
    `id_exam_member` INTEGER NOT NULL AUTO_INCREMENT,
    `id_exam` INTEGER NOT NULL,
    `id_user` INTEGER NOT NULL,
    `start_date` DATETIME(3) NULL,
    `end_date` DATETIME(3) NULL,
    `status` ENUM('NOT_YET', 'ON_GOING', 'COMPLETED') NOT NULL DEFAULT 'NOT_YET',
    `created_by` INTEGER NOT NULL DEFAULT 0,
    `created_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_by` INTEGER NOT NULL DEFAULT 0,
    `updated_date` DATETIME(3) NULL,
    `deleted_by` INTEGER NOT NULL DEFAULT 0,
    `deleted_date` DATETIME(3) NULL,

    PRIMARY KEY (`id_exam_member`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `exam_member` ADD CONSTRAINT `exam_member_id_exam_fkey` FOREIGN KEY (`id_exam`) REFERENCES `exam`(`id_exam`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `exam_member` ADD CONSTRAINT `exam_member_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `user`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;
