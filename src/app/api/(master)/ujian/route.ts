// nextjs
import { NextRequest } from "next/server";
// helpers
import { KoreksiEssay, ResponseHelper } from "@/helpers/helpers";

/**
 * List Of Ujian
 * -------------------------
 */
export async function POST(request: NextRequest) {
  // const { searchParams } = new URL(request.url);
  // const text = searchParams.get("text");
  const req = await request.json();

  let kunciJawabanCleaned = KoreksiEssay.cleanText(req.kunciJawaban)
  let kunciJawabanStemmed = KoreksiEssay.stemming(kunciJawabanCleaned)
  let kunciJawabanStopwords = KoreksiEssay.stopwordRemoval(kunciJawabanStemmed.str)

  let jawabanCleaned = KoreksiEssay.cleanText(req.jawaban)
  let jawabanStemmed = KoreksiEssay.stemming(jawabanCleaned)
  let jawabanStopwords = KoreksiEssay.stopwordRemoval(jawabanStemmed.str)

  // Hitung similarity matrix antara kedua kalimat
  const similarityMatrix = KoreksiEssay.simMatrix(kunciJawabanStopwords.arr, jawabanStopwords.arr);
  // Hitung similarity terbesar antara setiap kata pada jawaban dengan kunciJawaban jawaban
  const maxSimilarity = KoreksiEssay.maxSim(similarityMatrix);
  // Hitung nilai kesamaan rata-rata
  const percentage = KoreksiEssay.gradingPercentage(maxSimilarity);
  const grading = KoreksiEssay.grading(percentage);

  return ResponseHelper.json(`percentage: ${percentage}% | Grade: ${grading}`, 200)
}