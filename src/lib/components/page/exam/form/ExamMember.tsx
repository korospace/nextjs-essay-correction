// react
import { useEffect, useState } from "react";
// external lin
import toast from "react-hot-toast";
// components
import SearchbarComponent from "../../SearchbarComponent";
import ExamMemberForm from "./ExamMemberForm";
// types
import { ExamMemberType, ExamType } from "@/lib/types/ResultTypes";
// services
import { HttpGetExamMember } from "@/lib/services/functions/frontend/examMemberFunc";

/**
 * Props
 * -----------------------------------
 */
type Props = {
  dtGeneralInfo: ExamType | undefined;
};

export default function ExamMember({ dtGeneralInfo }: Props) {
  // -- Use State --
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [keyword, setKeyword] = useState<string>("");
  const [totalRow, setTotalRow] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(2);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [memberList, setMemberList] = useState<ExamMemberType[]>([]);
  const [memberListLoading, setMemberListLoading] = useState<boolean>(false);
  const [selectedMember, setSelectedMember] = useState<ExamMemberType>();
  const [showDialogDelete, setShowDialogDelete] = useState<boolean>(false);
  const [dialogDeleteLoading, setDialogDeleteLoading] =
    useState<boolean>(false);
  const [dialogDeleteMessage, setDialogDeleteMessage] = useState<string>("");

  // -- use effect --
  useEffect(() => {
    if (dtGeneralInfo) {
      handleFetchMember();
    }
  }, [page, keyword, dtGeneralInfo]);

  // -- functions --
  const handleFetchMember = async () => {
    setMemberListLoading(true);
    const res = await HttpGetExamMember(
      `api/exam/member?id_exam=${dtGeneralInfo?.id_exam}&keyword=${keyword}&page=${page}&limit=${limit}`
    );
    setMemberListLoading(false);

    if (res.status == false) {
      toast.error(res.message);
    } else {
      setMemberList(res.data.data);
      setTotalRow(res.data.totalRow);
      setTotalPage(res.data.totalPage);
    }
  };

  return (
    <>
      {/* Search Bar */}
      <SearchbarComponent
        placeholder="Search member"
        showBtnAdd={true}
        searchOnEnter={(keyword) => setKeyword(keyword)}
        btnOnClick={() => setShowForm(true)}
      />

      {/* Table */}
      <div className="mt-5 overflow-x-auto shadow rounded-md">
        <table className="w-full text-sm text-left text-budiluhur-700">
          {/* Head */}
          <thead className="uppercase bg-budiluhur-500">
            <tr className="border-b border-budiluhur-700">
              <th scope="col" className="px-6 py-3">
                NO
              </th>
              <th scope="col" className="px-6 py-3">
                Username
              </th>
              <th scope="col" className="px-6 py-3">
                Full Name
              </th>
              <th scope="col" className="px-6 py-3 text-right">
                Action
              </th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {/* Form Add New */}
            <tr className="border-b border-budiluhur-700 bg-budiluhur-300">
              <td colSpan={4}>
                <ExamMemberForm
                  apiPath="api/exam/member"
                  dtGeneralInfo={dtGeneralInfo}
                  showForm={showForm}
                  onCancle={() => setShowForm(false)}
                  afterSubmit={() => handleFetchMember()}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Pagination */}
    </>
  );
}
