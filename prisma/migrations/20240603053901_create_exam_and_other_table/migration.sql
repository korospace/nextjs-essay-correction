-- CreateTable
CREATE TABLE `exam` (
    `id_exam` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NULL,
    `start_date` DATETIME(3) NOT NULL,
    `end_date` DATETIME(3) NOT NULL,
    `duration` INTEGER NOT NULL,
    `created_by` INTEGER NOT NULL DEFAULT 0,
    `created_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_by` INTEGER NOT NULL DEFAULT 0,
    `updated_date` DATETIME(3) NULL,
    `deleted_by` INTEGER NOT NULL DEFAULT 0,
    `deleted_date` DATETIME(3) NULL,

    PRIMARY KEY (`id_exam`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `exam_member` (
    `id_exam_member` INTEGER NOT NULL AUTO_INCREMENT,
    `id_exam` INTEGER NOT NULL,
    `id_user` INTEGER NOT NULL,
    `start_date` DATETIME(3) NOT NULL,
    `end_date` DATETIME(3) NOT NULL,
    `status` ENUM('NOT_YET', 'ON_GOING', 'COMPLETED') NOT NULL DEFAULT 'NOT_YET',
    `created_by` INTEGER NOT NULL DEFAULT 0,
    `created_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_by` INTEGER NOT NULL DEFAULT 0,
    `updated_date` DATETIME(3) NULL,
    `deleted_by` INTEGER NOT NULL DEFAULT 0,
    `deleted_date` DATETIME(3) NULL,

    PRIMARY KEY (`id_exam_member`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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

-- CreateTable
CREATE TABLE `exam_answer` (
    `id_exam_answer` BIGINT NOT NULL AUTO_INCREMENT,
    `id_exam_question` INTEGER NOT NULL,
    `id_user` INTEGER NOT NULL,
    `answer` MEDIUMTEXT NOT NULL,
    `created_by` INTEGER NOT NULL DEFAULT 0,
    `created_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_by` INTEGER NOT NULL DEFAULT 0,
    `updated_date` DATETIME(3) NULL,
    `deleted_by` INTEGER NOT NULL DEFAULT 0,
    `deleted_date` DATETIME(3) NULL,

    PRIMARY KEY (`id_exam_answer`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
