// nextjs
import { NextRequest } from "next/server";
// helpers
import { EssayCorrection } from "@/lib/helpers/essay_correction";
import { ResponseFormating } from "@/lib/helpers/helpers";

/**
 * List Of Ujian
 * -------------------------
 */
export async function POST(request: NextRequest) {
  // const { searchParams } = new URL(request.url);
  // const text = searchParams.get("text");
  const req = await request.json();

  let kunciJawabanCleaned = EssayCorrection.cleanText(req.kunciJawaban);
  let kunciJawabanStemmed =
    EssayCorrection.stemmingSastrawi(kunciJawabanCleaned);
  let kunciJawabanStopwords = EssayCorrection.stopwordRemoval(
    kunciJawabanStemmed.str
  );

  let jawabanCleaned = EssayCorrection.cleanText(req.jawaban);
  let jawabanStemmed = EssayCorrection.stemmingSastrawi(jawabanCleaned);
  let jawabanStopwords = EssayCorrection.stopwordRemoval(jawabanStemmed.str);

  // Hitung similarity matrix antara kedua kalimat
  const similarityMatrix = await EssayCorrection.simMatrix(
    kunciJawabanStopwords.arr,
    jawabanStopwords.arr
  );
  // Hitung similarity terbesar antara setiap kata pada jawaban dengan kunciJawaban jawaban
  const maxSimilarity = EssayCorrection.maxSim(similarityMatrix);
  // Hitung nilai kesamaan rata-rata
  const resultLev = EssayCorrection.resultLev(maxSimilarity);
  const resultLevPercentage =
    EssayCorrection.resultLevPercentage(maxSimilarity);
  const resultLevGrading = EssayCorrection.resultLevGrading(maxSimilarity);

  const result = {
    result: resultLev,
    percentage: resultLevPercentage,
    Grade: resultLevGrading,
    kunciJawaban: {
      stemmed: kunciJawabanStemmed.str,
      stopword_removed: kunciJawabanStopwords.str,
    },
    jawaban: {
      stemmed: jawabanStemmed.str,
      stopword_removed: jawabanStopwords.str,
    },
  };
  return ResponseFormating.json(`success`, 200, result);
}
