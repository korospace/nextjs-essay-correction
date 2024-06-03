"use client";

// nextjs
import { Divider } from "@nextui-org/react";
// components
import ExamGeneralInfoForm from "@/lib/components/page/exam/ExamGeneralInfoForm";
import BreadcrumbComponent from "@/lib/components/page/BreadcrumbsComponent";
import PageComponent from "@/lib/components/page/PageComponent";
// types
import { BreadcrumbItemType } from "@/lib/types/ComponentTypes";

export default function ExamCreatePage() {
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
      title: "Create",
      icon: "fe:arrow-right",
      href: "/dashboard/exam/create",
    },
  ];

  return (
    <PageComponent metaTitle="Create Exam">
      <main className="p-3">
        <BreadcrumbComponent breadcrumItems={breadcrumItems} />

        {/* Divider */}
        <div className="my-5">
          <Divider className="bg-budiluhur-700 opacity-50" />
        </div>

        {/* General Information */}
        <div className="mb-10">
          <ExamGeneralInfoForm />
        </div>
      </main>
    </PageComponent>
  );
}
