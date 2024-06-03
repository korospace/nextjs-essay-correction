// prisma
import { prisma } from "@/lib/db/prisma";
// external lib
import { StemmerId, WordTokenizer } from "natural";
import { removeStopwords, ind } from "stopword";
import { Stemmer, Tokenizer } from "sastrawijs";
// internal lib
import fs from "fs";
import path from "path";
// types
import { PreProcessingType } from "@/lib/types/ResultTypes";

export const EssayCorrection = {
  cleanText: (text: string) => {
    let cleanedText = text.replace(/[^a-zA-Z0-9\s]/g, "");
    // remove spasi berturut-turut dengan satu spasi
    cleanedText = cleanedText.replace(/\s+/g, " ");
    // menghapus spasi di awal dan akhir
    cleanedText = cleanedText.trim();

    return cleanedText;
  },
  stemmingNatural: (text: string): PreProcessingType => {
    const naturalTokenizer = new WordTokenizer();
    const tokens = naturalTokenizer.tokenize(text);

    const stemmedTokens = tokens.map((token) => StemmerId.stem(token));

    return {
      str: stemmedTokens.join(" "),
      arr: stemmedTokens,
    };
  },
  stemmingSastrawi: (text: string): PreProcessingType => {
    const sastrawiStemmer = new Stemmer();
    const sastrawiTokenizer = new Tokenizer();
    const stemmed: string[] = [];

    const words = sastrawiTokenizer.tokenize(text);

    for (const word of words) {
      stemmed.push(sastrawiStemmer.stem(word));
    }

    return {
      str: stemmed.join(" "),
      arr: stemmed,
    };
  },
  readStopwordsFromFile: (filePath: string): string[] => {
    try {
      const stopwordsFilePath = path.join(process.cwd(), filePath);

      const data = fs.readFileSync(stopwordsFilePath, "utf8");

      const lines = data.split(/\r?\n/);

      const stopwords = lines
        .filter((line) => line.trim() && !line.trim().startsWith("#"))
        .map((line) => line.trim());

      return stopwords;
    } catch (err) {
      console.error("Error reading file:", err);
      return [];
    }
  },
  stopwordRemoval: (text: string): PreProcessingType => {
    // const stopwords = ind
    const stopwords = EssayCorrection.readStopwordsFromFile(
      "src/lib/data/id.stopwords.02.01.2016.txt"
    );

    const removedTokens = removeStopwords(text.split(" "), stopwords);

    return {
      str: removedTokens.join(" "),
      arr: removedTokens,
    };
  },
  areSynonyms: async (word1: string, word2: string): Promise<boolean> => {
    if (word1 === word2) return true;

    const synonym = await prisma.synonym.findFirst({
      where: {
        word: word1,
      },
    });

    if (synonym == null) {
      return false;
    } else {
      return (synonym.synonym || "").split(", ").includes(word2);
    }
  },
  lev: async (typo: string, bener: string): Promise<number> => {
    if (await EssayCorrection.areSynonyms(typo, bener)) {
      return 0;
    }

    // Menghitung Levenshtein Distance dan tingkat kemiripan kedua string
    const typo1 = "#" + typo;
    const bener1 = "#" + bener;
    const matriks = Array.from({ length: typo1.length }, () =>
      Array.from({ length: bener1.length }, () => 0)
    );

    for (let i = 0; i < typo1.length; i++) {
      for (let j = 0; j < bener1.length; j++) {
        if (Math.min(i, j) === 0) {
          matriks[i][j] = Math.max(i, j);
        } else {
          let a = matriks[i - 1][j] + 1;
          let b = matriks[i][j - 1] + 1;
          let c = matriks[i - 1][j - 1];
          if (typo1[i] !== bener1[j]) {
            c += 1;
          }
          matriks[i][j] = Math.min(a, b, c);
        }
      }
    }

    const distance = matriks[typo1.length - 1][bener1.length - 1];
    return distance / Math.max(typo1.length - 1, bener1.length - 1);
  },
  simMatrix: async (arr1: string[], arr2: string[]): Promise<number[][]> => {
    // Mengembalikan array matriks kemiripan dari kedua input string
    const similar: number[][] = Array.from({ length: arr1.length }, () =>
      Array.from({ length: arr2.length }, () => 0)
    );

    for (let i = 0; i < arr1.length; i++) {
      for (let j = 0; j < arr2.length; j++) {
        similar[i][j] = await EssayCorrection.lev(arr1[i], arr2[j]);
      }
    }

    return similar;
  },
  maxSim: (Matrix: number[][]) => {
    const sim = [];
    for (const i of Matrix) {
      sim.push(Math.min(...i));
    }
    return sim;
  },
  resultLev: (sim: any): number => {
    let sum = 0;
    for (const i of sim) {
      sum += i;
    }
    return sum / sim.length;
  },
  resultLevPercentage: (sim: any): number => {
    let sum = 0;
    for (const i of sim) {
      sum += i;
    }
    return 100 - (sum / sim.length) * 100;
  },
  resultLevGrading: (sim: any): string => {
    let sum = 0;
    for (const i of sim) {
      sum += i;
    }
    let percentage = 100 - (sum / sim.length) * 100;

    if (percentage >= 85) {
      return "A";
    } else if (percentage >= 80 && percentage < 85) {
      return "A-";
    } else if (percentage >= 75 && percentage < 80) {
      return "B+";
    } else if (percentage >= 70 && percentage < 75) {
      return "B";
    } else if (percentage >= 65 && percentage < 70) {
      return "B-";
    } else if (percentage >= 60 && percentage < 65) {
      return "C";
    } else if (percentage >= 45 && percentage < 60) {
      return "D";
    } else {
      return "E";
    }
  },
};
