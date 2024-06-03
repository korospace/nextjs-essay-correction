-- CreateTable
CREATE TABLE `course` (
    `id_course` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `created_by` INTEGER NOT NULL DEFAULT 0,
    `created_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_by` INTEGER NOT NULL DEFAULT 0,
    `updated_date` DATETIME(3) NULL,
    `deleted_by` INTEGER NOT NULL DEFAULT 0,
    `deleted_date` DATETIME(3) NULL,

    PRIMARY KEY (`id_course`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
