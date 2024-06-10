// types
import { TrainingDetailType } from "@/lib/types/ResultTypes";
// components
import QAResultDetailRow from "./QAResultDetailRow";

/**
 * Props
 * -----------------------------------
 */
type Props = {
  dtTrainingDetail: TrainingDetailType[];
};

export default function QAResultDetail({ dtTrainingDetail }: Props) {
  return (
    <div className="overflow-x-auto shadow rounded-md">
      <table className="w-full text-sm text-left text-budiluhur-700">
        {/* Head */}
        <thead className="uppercase bg-budiluhur-500">
          <tr className="border-b border-budiluhur-700">
            <th scope="col" className="px-6 py-3">
              NO
            </th>
            <th scope="col" className="px-6 py-3">
              Question
            </th>
            <th scope="col" className="px-6 py-3">
              Score
            </th>
            <th scope="col" className="px-6 py-3 text-right">
              Action
            </th>
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {dtTrainingDetail.map((row: TrainingDetailType, index: number) => (
            <QAResultDetailRow
              key={index}
              no={index + 1}
              dtTrainingDetail={row}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
