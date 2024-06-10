-- AlterTable
ALTER TABLE `exam_answer` ADD COLUMN `answer_cleaning` TEXT NOT NULL DEFAULT '',
    ADD COLUMN `answer_key` MEDIUMTEXT NOT NULL DEFAULT '',
    ADD COLUMN `answer_key_cleaning` TEXT NOT NULL DEFAULT '',
    ADD COLUMN `answer_key_ngram` TEXT NOT NULL DEFAULT '',
    ADD COLUMN `answer_key_stemming` TEXT NOT NULL DEFAULT '',
    ADD COLUMN `answer_key_stopword` TEXT NOT NULL DEFAULT '',
    ADD COLUMN `answer_ngram` TEXT NOT NULL DEFAULT '',
    ADD COLUMN `answer_stemming` TEXT NOT NULL DEFAULT '',
    ADD COLUMN `answer_stopword` TEXT NOT NULL DEFAULT '',
    ADD COLUMN `similiariy_matrix` TEXT NOT NULL DEFAULT '',
    MODIFY `answer` MEDIUMTEXT NOT NULL DEFAULT '';
