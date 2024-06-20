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
    `updated_date` DATETIME(3) NULL,
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

-- CreateTable
CREATE TABLE `synonym` (
    `id_synonym` INTEGER NOT NULL AUTO_INCREMENT,
    `word` VARCHAR(255) NOT NULL,
    `tag` VARCHAR(255) NULL,
    `synonym` VARCHAR(255) NULL,

    PRIMARY KEY (`id_synonym`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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

-- CreateTable
CREATE TABLE `exam` (
    `id_exam` INTEGER NOT NULL AUTO_INCREMENT,
    `id_course` INTEGER NOT NULL,
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
    `start_date` DATETIME(3) NULL,
    `end_date` DATETIME(3) NULL,
    `status` ENUM('NOT_YET', 'ON_GOING', 'COMPLETED') NOT NULL DEFAULT 'NOT_YET',
    `score` INTEGER NULL,
    `grade` VARCHAR(191) NULL,
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
    `answer_cleaning` TEXT NOT NULL,
    `answer_stemming` TEXT NOT NULL,
    `answer_stopword` TEXT NOT NULL,
    `answer_ngram` TEXT NOT NULL,
    `answer_key` MEDIUMTEXT NOT NULL,
    `answer_key_cleaning` TEXT NOT NULL,
    `answer_key_stemming` TEXT NOT NULL,
    `answer_key_stopword` TEXT NOT NULL,
    `answer_key_ngram` TEXT NOT NULL,
    `similiariy_matrix` TEXT NOT NULL,
    `max_simmatrix` TEXT NOT NULL,
    `created_by` INTEGER NOT NULL DEFAULT 0,
    `created_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_by` INTEGER NOT NULL DEFAULT 0,
    `updated_date` DATETIME(3) NULL,
    `deleted_by` INTEGER NOT NULL DEFAULT 0,
    `deleted_date` DATETIME(3) NULL,

    PRIMARY KEY (`id_exam_answer`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `exam` ADD CONSTRAINT `exam_id_course_fkey` FOREIGN KEY (`id_course`) REFERENCES `course`(`id_course`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `exam_member` ADD CONSTRAINT `exam_member_id_exam_fkey` FOREIGN KEY (`id_exam`) REFERENCES `exam`(`id_exam`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `exam_member` ADD CONSTRAINT `exam_member_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `user`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `exam_question` ADD CONSTRAINT `exam_question_id_exam_fkey` FOREIGN KEY (`id_exam`) REFERENCES `exam`(`id_exam`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `exam_answer` ADD CONSTRAINT `exam_answer_id_exam_question_fkey` FOREIGN KEY (`id_exam_question`) REFERENCES `exam_question`(`id_exam_question`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `exam_answer` ADD CONSTRAINT `exam_answer_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `user`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;
