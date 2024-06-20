// react
import { Fragment, useRef, useState } from "react";
// nextjs
import { Divider } from "@nextui-org/react";
// external lib
import { Icon } from "@iconify/react/dist/iconify.js";
// types
import { TrainingDetailType } from "@/lib/types/ResultTypes";

/**
 * Props
 * -----------------------------------
 */
type Props = {
  no: number;
  dtTrainingDetail: TrainingDetailType;
};

export default function QAResultDetailRow({ no, dtTrainingDetail }: Props) {
  // -- Use Ref --
  const dropdownRef = useRef<HTMLDivElement>(null);

  // -- Use State --
  const [showDetail, setShowDetail] = useState<boolean>(false);

  return (
    <Fragment>
      <tr className="border-b border-budiluhur-700 bg-budiluhur-400">
        <td className="px-6 py-4 align-middle">{no}</td>
        <td className="px-6 py-4 align-middle">
          Question {""}
          {no}
        </td>
        <td className="px-6 py-4 align-middle">
          {dtTrainingDetail.grade.grade} {" / "}
          {Math.round(dtTrainingDetail.grade.score)}
        </td>
        <td className="px-6 py-4 flex gap-2 justify-end">
          {!showDetail ? (
            <button
              onClick={() => setShowDetail(true)}
              className="inline-block items-center py-2 px-3 text-md font-medium focus:outline-none bg-budiluhur-700 rounded hover:bg-budiluhur-700/80 focus:bg-budiluhur-700/80 hover:text-budiluhur-300 text-budiluhur-400 focus:text-budiluhur-400/80"
            >
              <Icon icon="mdi:eye" />
            </button>
          ) : (
            <button
              onClick={() => setShowDetail(false)}
              className="inline-block items-center py-2 px-3 text-md font-medium focus:outline-none bg-budiluhur-700 rounded hover:bg-budiluhur-700/80 focus:bg-budiluhur-700/80 hover:text-budiluhur-300 text-budiluhur-400 focus:text-budiluhur-400/80"
            >
              <Icon icon="mdi:eye-off" />
            </button>
          )}
        </td>
      </tr>

      <tr className={`${showDetail ? "bg-budiluhur-300" : ""} transition-all`}>
        <td colSpan={4}>
          <div
            ref={dropdownRef}
            className={`w-full ${
              showDetail
                ? "px-6 py-6 overflow-visible border-b border-budiluhur-700"
                : "h-0 px-0 py-0 overflow-hidden"
            } transition-all`}
          >
            {/* Score */}
            <h1 className="text-lg font-extralight">Score</h1>
            <div className="mt-1 mb-2">
              <Divider className="bg-budiluhur-700 opacity-50" />
            </div>
            <table className="text-sm">
              <tr>
                <td>
                  <b>Grade</b>
                </td>
                <td className="pl-1 pr-3">:</td>
                <td>{dtTrainingDetail.grade.grade}</td>
              </tr>
              <tr>
                <td>
                  <b>Score</b>
                </td>
                <td className="pl-1 pr-3">:</td>
                <td>
                  {dtTrainingDetail.grade.score
                    ? parseFloat(dtTrainingDetail.grade.score.toFixed(2))
                    : 0}
                </td>
              </tr>
            </table>

            {/* answer key */}
            <h1 className="mt-5 text-lg font-extralight">Answer Key </h1>
            <div className="mt-1 mb-2">
              <Divider className="bg-budiluhur-700 opacity-50" />
            </div>
            <table className="text-sm">
              <tr>
                <td className="align-top min-w-[138px]">
                  <b>Raw</b>
                </td>
                <td className="align-top pl-1 pr-3">:</td>
                <td>{dtTrainingDetail.answer_key?.raw_value}</td>
              </tr>
              <tr>
                <td className="align-top">
                  <b>Cleaned</b>
                </td>
                <td className="align-top pl-1 pr-3">:</td>
                <td>{dtTrainingDetail.answer_key?.cleaned}</td>
              </tr>
              <tr>
                <td className="align-top">
                  <b>Stemmed</b>
                </td>
                <td className="align-top pl-1 pr-3">:</td>
                <td>{dtTrainingDetail.answer_key?.stemmed}</td>
              </tr>
              <tr>
                <td className="align-top">
                  <b>Stopword Removed</b>
                </td>
                <td className="align-top pl-1 pr-3">:</td>
                <td>{dtTrainingDetail.answer_key?.stopword_removed}</td>
              </tr>
              <tr>
                <td className="align-top">
                  <b>NGram</b>
                </td>
                <td className="align-top pl-1 pr-3">:</td>
                <td>{dtTrainingDetail.answer_key.n_gram}</td>
              </tr>
            </table>

            {/* answer */}
            <h1 className="mt-5 text-lg font-extralight">Answer </h1>
            <div className="mt-1 mb-2">
              <Divider className="bg-budiluhur-700 opacity-50" />
            </div>
            <table className="text-sm">
              <tr>
                <td className="align-top min-w-[138px]">
                  <b>Raw</b>
                </td>
                <td className="align-top pl-1 pr-3">:</td>
                <td>{dtTrainingDetail.answer.raw_value}</td>
              </tr>
              <tr>
                <td className="align-top">
                  <b>Cleaned</b>
                </td>
                <td className="align-top pl-1 pr-3">:</td>
                <td>{dtTrainingDetail.answer.cleaned}</td>
              </tr>
              <tr>
                <td className="align-top">
                  <b>Stemmed</b>
                </td>
                <td className="align-top pl-1 pr-3">:</td>
                <td>{dtTrainingDetail.answer.stemmed}</td>
              </tr>
              <tr>
                <td className="align-top">
                  <b>Stopword Removed</b>
                </td>
                <td className="align-top pl-1 pr-3">:</td>
                <td>{dtTrainingDetail.answer.stopword_removed}</td>
              </tr>
              <tr>
                <td className="align-top">
                  <b>NGram</b>
                </td>
                <td className="align-top pl-1 pr-3">:</td>
                <td>{dtTrainingDetail.answer.n_gram}</td>
              </tr>
            </table>
          </div>
        </td>
      </tr>
    </Fragment>
  );
}
