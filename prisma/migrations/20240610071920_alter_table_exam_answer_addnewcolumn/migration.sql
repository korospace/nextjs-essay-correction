-- AlterTable
ALTER TABLE `exam_answer` ADD COLUMN `max_simmatrix` TEXT NOT NULL DEFAULT '',
    MODIFY `answer` MEDIUMTEXT NOT NULL DEFAULT '',
    MODIFY `answer_cleaning` TEXT NOT NULL DEFAULT '',
    MODIFY `answer_key` MEDIUMTEXT NOT NULL DEFAULT '',
    MODIFY `answer_key_cleaning` TEXT NOT NULL DEFAULT '',
    MODIFY `answer_key_ngram` TEXT NOT NULL DEFAULT '',
    MODIFY `answer_key_stemming` TEXT NOT NULL DEFAULT '',
    MODIFY `answer_key_stopword` TEXT NOT NULL DEFAULT '',
    MODIFY `answer_ngram` TEXT NOT NULL DEFAULT '',
    MODIFY `answer_stemming` TEXT NOT NULL DEFAULT '',
    MODIFY `answer_stopword` TEXT NOT NULL DEFAULT '',
    MODIFY `similiariy_matrix` TEXT NOT NULL DEFAULT '';
