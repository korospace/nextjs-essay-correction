// nextjs
import { NextResponse } from "next/server";
// external lib
import { StemmerId, WordTokenizer } from 'natural';
import { removeStopwords, ind } from "stopword";
// internal lib
import fs from "fs"
import path from 'path';
// types
import { PreProcessingResult } from '@/types/helpersType';

export const ResponseHelper = {
  json: (message: string, httpCode: number = 200, data: any = false) => {
    let payload: any = {
      status: httpCode >= 300 ? false : true,
      message,
    };

    if (data !== false) {
      payload.data = data;
    }

    return NextResponse.json(payload, { status: httpCode });
  },
};

export const KoreksiEssay = {
  cleanText: (text: string) => {
    const cleanedText = text.replace(/[^a-zA-Z0-9\s]/g, '');
    return cleanedText;
  },
  stemming: (text: string): PreProcessingResult => {
    const tokenizer = new WordTokenizer();

    const tokens = tokenizer.tokenize(text);
    
    const stemmedTokens = tokens.map(token => StemmerId.stem(token));

    return {
      str: stemmedTokens.join(' '),
      arr: stemmedTokens
    };
  },
  readStopwordsFromFile : (filePath: string): string[] => {
    try {
        const stopwordsFilePath = path.join(process.cwd(), filePath);

        const data = fs.readFileSync(stopwordsFilePath, 'utf8');
        
        const lines = data.split(/\r?\n/);

        const stopwords = lines
            .filter(line => line.trim() && !line.trim().startsWith('#')) // Hanya ambil baris yang tidak kosong dan tidak diawali dengan '#'
            .map(line => line.trim()); // Hapus spasi di awal dan akhir setiap baris

        return stopwords;
    } catch (err) {
        console.error('Error reading file:', err);
        return [];
    }
  },
  stopwordRemoval: (text: string): PreProcessingResult => {
    // const stopwords = ind
    const stopwords = KoreksiEssay.readStopwordsFromFile('src/lib/stopwords/id.stopwords.02.01.2016.txt')

    const removedTokens = removeStopwords(text.split(' '), stopwords)

    return {
      str: removedTokens.join(' '),
      arr: removedTokens
    };
  },
  lev: (typo: string, bener: string) => {
    // Menghitung Levenshtein Distance dan tingkat kemiripan kedua string
    const typo1 = '#' + typo;
    const bener1 = '#' + bener;
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
  simMatrix: (arr1: string[], arr2: string[]) => {
    // Mengembalikan array matriks kemiripan dari kedua input string
    const similar = Array.from({ length: arr1.length }, () =>
      Array.from({ length: arr2.length }, () => 0)
    );

    for (let i = 0; i < arr1.length; i++) {
      for (let j = 0; j < arr2.length; j++) {
        similar[i][j] = KoreksiEssay.lev(arr1[i], arr2[j]);
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
  gradingPercentage: (sim: any): number => {
    let sum = 0;
    for (const i of sim) {
      sum += i;
    }
    return 100 - ((sum / sim.length)*100);
  },
  grading: (percentage: number): string => {
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
  }
}