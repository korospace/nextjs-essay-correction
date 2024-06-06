// react
import { useEffect, useState } from "react";
// external lib
import { Icon } from "@iconify/react/dist/iconify.js";
import toast from "react-hot-toast";
// helpers
import { DateFormating } from "@/lib/helpers/helpers";
// types
import { ExamMemberType, ExamType } from "@/lib/types/ResultTypes";
import { ExamMemberStatuUpdateType } from "@/lib/types/InputTypes";
// component
import QACountdown from "./QACountdown";
// services
import { HttpUpdateExamMemberStatus } from "@/lib/services/functions/frontend/examMemberFunc";

/**
 * Props
 * -----------------------------------
 */
type Props = {
  examGeneralInfo: ExamType;
  examMember: ExamMemberType;
  onEnded: () => void;
};

export default function QAForm({
  examGeneralInfo,
  examMember,
  onEnded,
}: Props) {
  // -- Use State --

  // -- Use Effect --

  // -- Function --
  const getRemainingTime = (
    endDate: string,
    startExam: string,
    duration: number
  ): string => {
    const endDateTime = new Date(endDate);
    const startExamTime = new Date(startExam);

    const timeDifference = endDateTime.getTime() - startExamTime.getTime();

    const endExamTime = new Date(
      startExamTime.getTime() + Math.min(timeDifference, duration * 60000)
    );

    const endExamTimeString = endExamTime.toISOString();

    return endExamTimeString;
  };

  const handleTimeEnded = async () => {
    // build payload
    const httpMethod: string = "PUT";
    const httpPayload: ExamMemberStatuUpdateType = {
      id_exam_member: examMember?.id_exam_member,
      status: "COMPLETED",
    };

    // HTTP
    const res = await HttpUpdateExamMemberStatus(
      "api/exam/member/status",
      httpMethod,
      httpPayload
    );

    // response
    if (res.status == true) {
      onEnded();
    } else {
      toast.error(res.message);
    }
  };

  const checkExamEndDate = (endDate: string): boolean => {
    const unixEndDate = DateFormating.toUnixTimeStamp(endDate);
    const unixNow = DateFormating.toUnixTimeStamp(new Date().toString());

    return unixEndDate < unixNow;
  };

  return (
    <div className="flex justify-center items-center">
      {examGeneralInfo === undefined || examMember === undefined ? (
        <Icon icon="eos-icons:loading" className={`text-5xl`} />
      ) : (
        <>
          <div>
            {/* count down */}
            <div className="w-[202px] px-4 py-2 text-center text-budiluhur-700 bg-budiluhur-500 rounded-b border border-budiluhur-700">
              {examMember.status == "COMPLETED" ||
              checkExamEndDate(examGeneralInfo.end_date) ? (
                <span>__ : __ : __</span>
              ) : (
                <QACountdown
                  date={getRemainingTime(
                    examGeneralInfo.end_date,
                    examMember.start_date ?? "",
                    examGeneralInfo.duration
                  )}
                  onEnded={handleTimeEnded}
                />
              )}
            </div>
          </div>
          <div className="flex-1"></div>
        </>
      )}
    </div>
  );
}
