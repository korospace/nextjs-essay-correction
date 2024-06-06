// react
import { useEffect, useState } from "react";
// nextjs
import { Divider } from "@nextui-org/react";
// external lib
import { useRouter } from "next-nprogress-bar";
// types
import { ExamMemberType, ExamType } from "@/lib/types/ResultTypes";
import { TabBarItemType } from "@/lib/types/ComponentTypes";
// helpers
import { DateFormating, getPathName } from "@/lib/helpers/helpers";
// components
import TabBarComponent from "../TabBarComponent";
import QAForm from "./QA/QAForm";

/**
 * Props
 * -----------------------------------
 */
type Props = {
  examGeneralInfo: ExamType;
  examMember: ExamMemberType;
};

export default function ExamQAComponent({
  examGeneralInfo,
  examMember,
}: Props) {
  // -- hook --
  const router = useRouter();

  // -- Tab Bar List --
  const [tabList, setTabList] = useState<TabBarItemType[]>([
    {
      key: "exam_question_answer",
      title: "Question",
      icon: "bi:question-circle",
      selected: true,
      disable: false,
    },
    {
      key: "exam_result",
      title: "Result",
      icon: "carbon:result",
      selected: false,
      disable: false,
    },
  ]);

  // -- use state --
  const [selectedTabKey, setSelectedTabKey] = useState<string>("");

  // -- Use Effect
  useEffect(() => {
    if (examMember) {
      if (
        examMember.status === "COMPLETED" ||
        checkExamEndDate(examGeneralInfo.end_date)
      ) {
        setSelectedTabKey("exam_result");
        tabList[0].selected = false;
        tabList[1].selected = true;
        tabList[1].disable = false;
        tabList[1].icon = "carbon:result";
        setTabList(tabList);
      } else {
        tabList[1].disable = true;
        tabList[1].icon = "teenyicons:lock-outline";
        setTabList(tabList);
      }
    }
  }, [examMember, examGeneralInfo]);

  // -- Function --
  const checkExamEndDate = (endDate: string): boolean => {
    const unixEndDate = DateFormating.toUnixTimeStamp(endDate);
    const unixNow = DateFormating.toUnixTimeStamp(new Date().toString());

    return unixEndDate < unixNow;
  };

  return (
    <div className="w-full h-full max-h-full p-5 flex flex-col">
      {/* Title */}
      <h1 className="text-4xl text-budiluhur-700 font-bold">
        {examGeneralInfo.title}
      </h1>
      <p className="text-2xl text-budiluhur-700 mt-2">
        {examGeneralInfo.description}
      </p>

      {/* Divider */}
      <div className="mt-5 mb-6">
        <Divider className="bg-budiluhur-700 opacity-50" />
      </div>

      <div className="flex-1 flex flex-col mb-5 p-5 bg-budiluhur-500 rounded-md shadow border border-budiluhur-700 overflow-hidden">
        {/* Tab Bar */}
        <TabBarComponent
          tabList={tabList}
          onSelect={(tabKey) => {
            setSelectedTabKey(tabKey);
          }}
        />

        {selectedTabKey === "exam_question_answer" && (
          <div className="flex-1 p-4 bg-budiluhur-400 shadow rounded-b-md border border-budiluhur-700 overflow-auto">
            <QAForm
              examGeneralInfo={examGeneralInfo}
              examMember={examMember}
              onEnded={() => {
                window.location.reload();
                // router.replace(getPathName());
              }}
            />
          </div>
        )}
        {selectedTabKey === "exam_result" && (
          <div className="flex-1 p-4 bg-budiluhur-400 shadow rounded-b-md border border-budiluhur-700 overflow-auto">
            result
          </div>
        )}
      </div>
    </div>
  );
}
