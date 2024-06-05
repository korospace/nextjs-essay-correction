-- CreateTable
CREATE TABLE `exam_question` (
    `id_exam_question` INTEGER NOT NULL AUTO_INCREMENT,
    `id_exam` INTEGER NOT NULL,
    `question` TEXT NOT NULL,
    `answer_key` MEDIUMTEXT NOT NULL,
    `created_by` INTEGER NOT NULL DEFAULT 0,
    `created_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_by` INTEGER NOT NULL DEFAULT 0,
    `updated_date` DATETIME(3) NULL,
    `deleted_by` INTEGER NOT NULL DEFAULT 0,
    `deleted_date` DATETIME(3) NULL,

    PRIMARY KEY (`id_exam_question`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `exam_question` ADD CONSTRAINT `exam_question_id_exam_fkey` FOREIGN KEY (`id_exam`) REFERENCES `exam`(`id_exam`) ON DELETE RESTRICT ON UPDATE CASCADE;
