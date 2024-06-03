"use client";

// nextjs
import { Divider } from "@nextui-org/react";
// components
import PageComponent from "@/lib/components/page/PageComponent";
import BreadcrumbComponent from "@/lib/components/page/BreadcrumbsComponent";
// types
import { BreadcrumbItemType } from "@/lib/types/ComponentTypes";

export default function DashboardPage() {
  // -- Breadcrumbs List --
  const breadcrumItems: BreadcrumbItemType[] = [
    {
      title: "Home",
      icon: "ic:baseline-home",
      href: "/dashboard",
    },
  ];

  return (
    <PageComponent metaTitle="Home">
      <main className="p-3">
        <BreadcrumbComponent breadcrumItems={breadcrumItems} />

        {/* Divider */}
        <div className="my-5">
          <Divider className="bg-budiluhur-700 opacity-50" />
        </div>

        <div className="p-6 bg-budiluhur-300 shadow rounded-md">
          <h1 className="font-extrabold text-3xl text-budiluhur-700">
            Selamat Datang
          </h1>
          <div className="my-3">
            <Divider className="bg-budiluhur-700 opacity-30" />
          </div>
          <p className="font-light text-lg text-budiluhur-700 text-justify">
            Selamat datang di aplikasi{" "}
            <b className="font-semibold">{process.env.NEXT_PUBLIC_APP_NAME}</b>.
            Aplikasi ini menggunakan framework{" "}
            <b className="underline font-semibold">Next.js</b> dalam
            pembuatannya, dengan penambahan algoritma{" "}
            <b className="underline font-semibold">Levenshtein distance</b> yang
            memberikan penilaian otomatis untuk jawaban esai siswa.
          </p>
        </div>

        <div className="mt-10 p-6 bg-budiluhur-300 shadow rounded-md">
          <h1 className="font-extrabold text-3xl text-budiluhur-700">
            Training Data
          </h1>
          <div className="my-3">
            <Divider className="bg-budiluhur-700 opacity-30" />
          </div>
          <p className="font-light text-lg text-budiluhur-700 text-justify">
            Fitur ini sedang dalam pengembangan
          </p>
        </div>
      </main>
    </PageComponent>
  );
}
