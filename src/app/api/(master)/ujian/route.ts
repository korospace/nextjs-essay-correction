// nextjs
import { NextRequest } from "next/server";
// helpers
import { KoreksiEssay, ResponseFormating } from "@/lib/helpers/helpers";

/**
 * List Of Ujian
 * -------------------------
 */
export async function POST(request: NextRequest) {
  // const { searchParams } = new URL(request.url);
  // const text = searchParams.get("text");
  const req = await request.json();

  let kunciJawabanCleaned = KoreksiEssay.cleanText(req.kunciJawaban)
  let kunciJawabanStemmed = KoreksiEssay.stemmingSastrawi(kunciJawabanCleaned)
  let kunciJawabanStopwords = KoreksiEssay.stopwordRemoval(kunciJawabanStemmed.str)

  let jawabanCleaned = KoreksiEssay.cleanText(req.jawaban)
  let jawabanStemmed = KoreksiEssay.stemmingSastrawi(jawabanCleaned)
  let jawabanStopwords = KoreksiEssay.stopwordRemoval(jawabanStemmed.str)

  // Hitung similarity matrix antara kedua kalimat
  const similarityMatrix = await KoreksiEssay.simMatrix(kunciJawabanStopwords.arr, jawabanStopwords.arr);
  // Hitung similarity terbesar antara setiap kata pada jawaban dengan kunciJawaban jawaban
  const maxSimilarity = KoreksiEssay.maxSim(similarityMatrix);
  // Hitung nilai kesamaan rata-rata
  const resultLev = KoreksiEssay.resultLev(maxSimilarity);
  const resultLevPercentage = KoreksiEssay.resultLevPercentage(maxSimilarity);
  const resultLevGrading = KoreksiEssay.resultLevGrading(maxSimilarity);

  const result = {
    result: resultLev,
    percentage: resultLevPercentage,
    Grade: resultLevGrading,
    kunciJawaban: {
      stemmed: kunciJawabanStemmed.str,
      stopword_removed: kunciJawabanStopwords.str
    },
    jawaban: {
      stemmed: jawabanStemmed.str,
      stopword_removed: jawabanStopwords.str
    }
  }
  return ResponseFormating.json(`success`, 200, result)
}