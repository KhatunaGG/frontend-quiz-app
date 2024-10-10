"use client";
import SubmitButton from "../submitButton/SubmitButton";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { GlobalContext } from "@/app/context/Context";
import Image from "next/image";

const ScoreSection = () => {
  const path = usePathname();
  const context = useContext(GlobalContext);
  if (!context) return null;
  const { count, filteredData, resetQuiz } = context;

  return (
    <div className="flex flex-col gap-10 md:gap-[64px] lg:flex-row lg:gap-[12.32%] md:pb-[167px]">
      <div className="md:w-[70.31%] lg:w-[38.79%]">
        <h1 className="text-[40px] leading-[40px] font-light text-[#313E51] md:text-[64px] md:leading-[64px] dark:text-white transition-colors duration-700 ease-in-out">
          Quiz completed{" "}
          <span className=" md:text-[64px] md:leading-[64px] font-medium text-[#313E51] dark:text-white transition-colors duration-700 ease-in-out">
            You scored...
          </span>
        </h1>
      </div>

      <div className="lg:w-[48.62%] flex flex-col gap-3 md:gap-8 ">
        <div className="p-8 rounded-xl bg-white flex flex-col gap-4 items-center justify-center shadow-md md:shadow-lg md:p-[48px] md:rounded-3xl md-gap-0 dark:bg-[#3B4D66] transition-colors duration-700 ease-in-out">
          <div
            className={`items-center gap-4 md:gap-4 md:mb-10 ${
              path === "/" ? "hidden" : "flex"
            }`}
          >
            <div
              style={{ background: filteredData?.bg || "" }}
              className="w-10 h-10 rounded-md flex items-center justify-center md:w-[56px] md:h-[56px]"
            >
              <Image
                src={filteredData?.icon || ""}
                alt={"icon"}
                width={56}
                height={56}
              />
            </div>
            <h2 className="text-[18px] capitalize font-medium dark:text-white transition-colors duration-700 ease-in-out">
              {filteredData?.title}
            </h2>
          </div>

          <h2 className="font-medium text-[#313E51] text-[88px] leading-[88px] md:text-[144px] md:leading-[144px] md:mb-4 dark:text-white transition-colors duration-700 ease-in-out">
            {count}
          </h2>

          <p className="text-[#626C7F] font-normal text-[18x] leading-[18px] md:text-[24px] md:leading-[36px] dark:text-white transition-colors duration-700 ease-in-out">
            out of {filteredData?.questions.length}
          </p>
        </div>
        <SubmitButton resetQuiz={resetQuiz} />
      </div>
    </div>
  );
};

export default ScoreSection;
