"use client";

// react
import { useEffect, useState } from "react";
// nextjs
import { Divider } from "@nextui-org/react";
// external lib
import { useRouter } from "next-nprogress-bar";
import toast from "react-hot-toast";
// components
import ExamGeneralInfo from "@/lib/components/page/exam/form/ExamGeneralInfo";
import BreadcrumbComponent from "@/lib/components/page/BreadcrumbsComponent";
import ExamQuestion from "@/lib/components/page/exam/form/ExamQuestion";
import TabBarComponent from "@/lib/components/page/TabBarComponent";
import ExamMember from "@/lib/components/page/exam/form/ExamMember";
import PageComponent from "@/lib/components/page/PageComponent";
// types
import { BreadcrumbItemType, TabBarItemType } from "@/lib/types/ComponentTypes";
import { ExamType } from "@/lib/types/ResultTypes";
// services
import { HttpGetExam } from "@/lib/services/functions/frontend/examFunc";

/**
 * Props
 * -----------------------------------
 */
type Props = {
  params: {
    id_exam: string;
  };
};

export default function ExamUpdatePage({ params }: Props) {
  // -- hook --
  const router = useRouter();

  // -- use state --
  const [examGeneralInfo, setExamGeneralInfo] = useState<ExamType>();
  const [selectedTabKey, setSelectedTabKey] = useState<string>("");

  // -- use effect --
  useEffect(() => {
    fetchExamGeneralInfo();
  }, []);

  // -- Breadcrumbs List --
  const breadcrumItems: BreadcrumbItemType[] = [
    {
      title: "Home",
      icon: "ic:baseline-home",
      href: "/dashboard",
    },
    {
      title: "Exam",
      icon: "fe:arrow-right",
      href: "/dashboard/exam",
    },
    {
      title: "Update",
      icon: "fe:arrow-right",
      href: "/dashboard/exam/update/" + params.id_exam,
    },
    {
      title: examGeneralInfo?.title ?? "",
      icon: "fe:arrow-right",
      href: "",
    },
  ];

  // -- Tab Bar List --
  const tabList: TabBarItemType[] = [
    {
      key: "general_information",
      title: "General Information",
      selected: false,
      disable: false,
    },
    {
      key: "exam_question",
      title: "Exam Question",
      selected: true,
      disable: false,
    },
    {
      key: "exam_member",
      title: "Exam Member",
      selected: false,
      disable: false,
    },
  ];

  // -- functions --
  const fetchExamGeneralInfo = async () => {
    const res = await HttpGetExam("api/exam?id_exam=" + params.id_exam);

    if (res.status == false) {
      toast.error(res.message);
    } else {
      if (res.data.data.length == 0) {
        router.push("/not-found");
      } else {
        setExamGeneralInfo(res.data.data[0]);
      }
    }
  };

  return (
    <PageComponent metaTitle="Create Exam">
      <main className="p-3">
        <BreadcrumbComponent breadcrumItems={breadcrumItems} />

        {/* Divider */}
        <div className="my-5">
          <Divider className="bg-budiluhur-700 opacity-50" />
        </div>

        <div className="mb-5 p-5 bg-budiluhur-500 rounded-md shadow">
          <TabBarComponent
            tabList={tabList}
            onSelect={(tabKey) => {
              setSelectedTabKey(tabKey);
            }}
          />

          {/* General Information */}
          <div
            className={`${
              selectedTabKey === "general_information" ? "" : "hidden"
            } p-4 bg-budiluhur-400 shadow rounded`}
          >
            <ExamGeneralInfo dtGeneralInfo={examGeneralInfo} />
          </div>

          {/* Exam Question */}
          <div
            className={`${
              selectedTabKey === "exam_question" ? "" : "hidden"
            } p-4 bg-budiluhur-400 shadow rounded`}
          >
            <ExamQuestion dtGeneralInfo={examGeneralInfo} />
          </div>

          {/* Exam Member */}
          <div
            className={`${
              selectedTabKey === "exam_member" ? "" : "hidden"
            } p-4 bg-budiluhur-400 shadow rounded`}
          >
            <ExamMember dtGeneralInfo={examGeneralInfo} />
          </div>
        </div>
      </main>
    </PageComponent>
  );
}
