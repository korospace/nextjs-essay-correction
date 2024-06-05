// types
import { ExamMemberType, ExamType } from "@/lib/types/ResultTypes";

/**
 * Props
 * -----------------------------------
 */
type Props = {
  apiPath: string;
  dtGeneralInfo: ExamType | undefined;
  dtMember?: ExamMemberType;
  showForm: boolean;
  onCancle: () => void;
  afterSubmit: () => void;
};

export default function ExamMemberForm({
  apiPath,
  dtGeneralInfo,
  dtMember,
  showForm,
  onCancle,
  afterSubmit,
}: Props) {
  return <h1>form</h1>;
}
