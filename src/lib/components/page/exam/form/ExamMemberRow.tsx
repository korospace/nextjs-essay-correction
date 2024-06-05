// react
import { Fragment } from "react";
// external lib
import { Icon } from "@iconify/react/dist/iconify.js";
// types
import { ExamMemberType, ExamType } from "@/lib/types/ResultTypes";

/**
 * Props
 * -----------------------------------
 */
type Props = {
  apiPath: string;
  dtGeneralInfo: ExamType | undefined;
  dtMember: ExamMemberType;
  no: number;
  onDelete: (dtMember: ExamMemberType) => void;
};

export default function ExamMemberRow({
  apiPath,
  dtGeneralInfo,
  dtMember,
  no,
  onDelete,
}: Props) {
  return (
    <Fragment>
      <tr className="border-b border-budiluhur-700 bg-budiluhur-300">
        <td className="px-6 py-4 align-top">{no}</td>
        <td className="px-6 py-4 align-top">{dtMember.user.username}</td>
        <td className="px-6 py-4 align-top">{dtMember.user.full_name}</td>
        <td className="px-6 py-4 flex gap-2 justify-end">
          <button
            onClick={() => onDelete(dtMember)}
            className="inline-block items-center py-2 px-3 text-md font-medium focus:outline-none bg-budiluhur-700 rounded hover:bg-budiluhur-700/80 focus:bg-budiluhur-700/80 hover:text-budiluhur-300 text-budiluhur-400 focus:text-budiluhur-400/80"
          >
            <Icon icon="hugeicons:delete-01" />
          </button>
        </td>
      </tr>
    </Fragment>
  );
}
