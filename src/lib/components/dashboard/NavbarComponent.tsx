// nextjs
import { Image } from "@nextui-org/react";
// assets
import BudiluhurJpg from "@/assets/images/budiluhur.jpg";
// external lib
import { Icon } from "@iconify/react";
import styled from "styled-components";

/**
 * Styled Components
 * -----------------------------------
 */
export const BrandTitle = styled.span`
  text-shadow: -0.6px -0.6px 0 #005473, 0.6px -0.6px 0 #005473,
    -0.6px 0.6px 0 #005473, 0.6px 0.6px 0 #005473;
`;

export const BurgerWraper = styled.span`
  border: 0.6px solid #005473;
`;

/**
 * Props
 * -----------------------------------
 */
type Props = {
  burgerOnClick?: () => void;
};

export default function NavbarComponent({ burgerOnClick }: Props) {
  return (
    <nav className="w-full bg-budiluhur-500 shadow">
      <div className="max-w-full flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo Brand */}
        <a href="" className="flex items-center gap-2">
          <div className="p-1 rounded-full bg-white">
            <Image
              src={BudiluhurJpg.src}
              alt="budiluhur logo"
              className="w-6 sm:w-10 rounded-full"
            />
          </div>
          <BrandTitle className="text-xl sm:text-2xl font-semibold text-budiluhur-100">
            Sistem Penilaian Essay
          </BrandTitle>
        </a>

        {/* Burger */}
        <BurgerWraper
          onClick={burgerOnClick ? burgerOnClick : () => {}}
          className="w-fit block md:hidden py-0.5 px-1 rounded-sm bg-budiluhur-100 hover:bg-budiluhur-200 transition-all cursor-pointer custom-css"
        >
          <Icon
            icon="iconamoon:menu-burger-horizontal-bold"
            className="text-2xl text-budiluhur-500 hover:text-budiluhur-600 transition-all"
          />
        </BurgerWraper>
      </div>
    </nav>
  );
}
