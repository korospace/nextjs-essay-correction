"use client";

// react
import { useEffect, useState } from "react";
// nextjs
import { Divider } from "@nextui-org/react";
import { useSession } from "next-auth/react";
// components
import ExamFilterComponent from "@/lib/components/page/exam/ExamFilterComponent";
import BreadcrumbComponent from "@/lib/components/page/BreadcrumbsComponent";
import SearchbarComponent from "@/lib/components/page/SearchbarComponent";
import PageComponent from "@/lib/components/page/PageComponent";
// types
import { BreadcrumbItemType } from "@/lib/types/ComponentTypes";
import { SessionType } from "@/lib/types/ResultTypes";

export default function ExamPage() {
  // session
  const { data: session, status }: { data: any; status: string } = useSession();

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
  ];

  // -- Use State --
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [keyword, setKeyword] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(false);
  const [dataSession, setDataSession] = useState<SessionType>();

  // -- Use Effect --
  useEffect(() => {
    setDataSession(session);
  }, [session]);

  return (
    <PageComponent metaTitle="Exam">
      <main className="p-3">
        <BreadcrumbComponent breadcrumItems={breadcrumItems} />

        {/* Divider */}
        <div className="my-5">
          <Divider className="bg-budiluhur-700 opacity-50" />
        </div>

        {/* Filter && Search Bar */}
        <div className="flex gap-2">
          <ExamFilterComponent />
          <SearchbarComponent
            className="flex-1"
            placeholder="Search exam title"
            showBtnAdd={dataSession?.user.id_user_role === 1}
            searchOnEnter={(keyword) => setKeyword(keyword)}
            btnOnClick={() => setShowForm(true)}
          />
        </div>
      </main>
    </PageComponent>
  );
}
