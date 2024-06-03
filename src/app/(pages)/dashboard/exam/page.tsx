"use client";

// react
import { useEffect, useState } from "react";
// nextjs
import { Divider } from "@nextui-org/react";
import { useSession } from "next-auth/react";
// external lib
import { useRouter } from "next-nprogress-bar";
// components
import ExamFilterComponent from "@/lib/components/page/exam/ExamFilterComponent";
import BreadcrumbComponent from "@/lib/components/page/BreadcrumbsComponent";
import SearchbarComponent from "@/lib/components/page/SearchbarComponent";
import PageComponent from "@/lib/components/page/PageComponent";
// types
import { BreadcrumbItemType } from "@/lib/types/ComponentTypes";
import { SessionType } from "@/lib/types/ResultTypes";

export default function ExamPage() {
  // router
  const router = useRouter();

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
            btnOnClick={() => router.push("/dashboard/exam/create")}
          />
        </div>

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
                  Course Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Exam Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Schedule Info
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right">
                  Action
                </th>
              </tr>
            </thead>
          </table>
        </div>
      </main>
    </PageComponent>
  );
}
