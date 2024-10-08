"use client";
import { usePathname } from "next/navigation";
import { Moon, Sun } from "../../_atoms";
import { useContext } from "react";
import { GlobalContext } from "@/app/context/Context";
import Image from "next/image";

const Header = () => {
  const path = usePathname();
  const context = useContext(GlobalContext);
  if (!context) return null;
  const { filteredData, isChecked, setIsChecked } = context;

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    changeMode();
  };

  const changeMode = () => {
    if (!isChecked) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div
      className={`${
        path === "/" ? "justify-end" : "justify-between"
      } bg-transparent flex items-center  py-[26px] px-6 text-[#313E51] md:px-[8.33%]  md:pt-10 md:pb-[49px] lg:pt-[83px] lg:pb-[85px] mx-auto mb-8 md:mb-0 lg:pl-[9.72%] `}
    >
      <div
        className={`items-center gap-4 md:gap-4 ${
          path === "/" ? "hidden" : "flex"
        }`}
      >
        <div
          style={{ background: filteredData?.bg || "" }}
          className="w-10 h-10 rounded-md flex items-center justify-center md:w-[56px] md:h-[56px]"
        >
          <Image
            src={filteredData?.icon || ""}
            alt={filteredData?.title || ""}
            height={56}
            width={56}
          />
        </div>

        <h2 className="text-[18px] capitalize font-medium dark:text-white transition-colors duration-700 ease-in-out">
          {filteredData?.title}
        </h2>
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        <Sun isChecked={isChecked} />

        <label
          className=" checkbox-label w-8 h-[20px] md: md:w-[48px] md:h-[28px] rounded-full shadow-md"
          htmlFor="check"
        >
          <input
            type="checkbox"
            id="check"
            className="modeCheckInput"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />

          <span className="switch-circle "></span>
        </label>

        <Moon isChecked={isChecked} />
      </div>
    </div>
  );
};

export default Header;
