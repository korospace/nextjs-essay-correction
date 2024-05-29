-- CreateTable
CREATE TABLE `synonym` (
    `id_synonym` INTEGER NOT NULL AUTO_INCREMENT,
    `word` VARCHAR(255) NOT NULL,
    `tag` VARCHAR(255) NULL,
    `synonym` VARCHAR(255) NULL,

    PRIMARY KEY (`id_synonym`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id_user` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `full_name` VARCHAR(255) NOT NULL,
    `id_user_role` INTEGER NOT NULL DEFAULT 0,
    `created_by` INTEGER NOT NULL DEFAULT 0,
    `created_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_by` INTEGER NOT NULL DEFAULT 0,
    `updated_date` DATETIME(3) NOT NULL,
    `deleted_by` INTEGER NOT NULL DEFAULT 0,
    `deleted_date` DATETIME(3) NULL,

    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_role` (
    `id_user_role` INTEGER NOT NULL AUTO_INCREMENT,
    `role_name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id_user_role`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
