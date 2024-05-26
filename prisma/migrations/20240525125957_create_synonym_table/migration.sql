-- CreateTable
CREATE TABLE `synonym` (
    `id_synonym` INTEGER NOT NULL AUTO_INCREMENT,
    `word` VARCHAR(255) NOT NULL,
    `tag` VARCHAR(255) NULL,
    `synonym` VARCHAR(255) NULL,

    PRIMARY KEY (`id_synonym`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
