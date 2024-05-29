import { Divider } from "@nextui-org/react";
// external lib
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

/**
 * Props
 * -----------------------------------
 */
type Props = {
  showSidebar?: boolean;
};

export default function SidebarComponent({ showSidebar }: Props) {
  return (
    <aside
      className={`${
        showSidebar ? "w-64" : "w-0 md:w-64"
      } h-full max-h-full bg-budiluhur-700 transition-all overflow-hidden`}
    >
      <ul
        className={`${
          showSidebar ? "opacity-100" : "opacity-0 md:opacity-100"
        } px-3 pt-1.5 space-y-2 font-medium transition-all`}
      >
        {/* Dashboard */}
        <li>
          <Link
            href={""}
            className="flex items-center p-2 text-budiluhur-400 hover:text-budiluhur-300 bg-budiluhur-600 hover:bg-budiluhur-500 rounded-sm group cursor-pointer"
          >
            <Icon icon="mage:dashboard-bar-notification" className="text-2xl" />
            <span className="ms-3">Dashboard</span>
          </Link>
        </li>

        <div className="py-4">
          <Divider className="bg-budiluhur-600" />
        </div>

        {/* Logout */}
        <li>
          <Link
            href={"/logout"}
            className="flex items-center p-2 text-budiluhur-400 hover:text-budiluhur-300 bg-budiluhur-600 hover:bg-budiluhur-500 rounded-sm group cursor-pointer"
          >
            <Icon icon="clarity:logout-line" className="text-2xl" />
            <span className="ms-3">Logout</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
}
