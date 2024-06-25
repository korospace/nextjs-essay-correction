// nextjs
import { NextRequest } from "next/server";
// helpers
import { ResponseFormating } from "@/lib/helpers/helpers";
import { EssayCorrection } from "@/lib/helpers/essay_correction";

/**
 * Get Result
 * -------------------------
 */
export async function GET(request: NextRequest) {
  const answer = "harap ajar";
  const answer_key = "ajar tingkat";

  // const ak_cleaned = EssayCorrection.cleanText(answer_key);
  // const a_cleaned = EssayCorrection.cleanText(answer);
  // const a_normalize = EssayCorrection.synonymReplacement(ak_cleaned, a_cleaned);

  // const ak_stemmed = EssayCorrection.stemmingSastrawi(ak_cleaned);
  // const a_stemmed = EssayCorrection.stemmingSastrawi(a_normalize);

  // const ak_stopword = EssayCorrection.stopwordRemoval(ak_stemmed.str ?? "");
  // const a_stopword = EssayCorrection.stopwordRemoval(a_stemmed.str ?? "");

  const lev = await EssayCorrection.lev(answer, answer_key);

  // response api
  return ResponseFormating.json("this is debug", 200, {
    // ak_cleaned,
    // ak_stemmed,
    // a_cleaned,
    // a_normalize,
    // a_stemmed,
    // ak_stopword,
    // a_stopword,
    lev,
  });
}
