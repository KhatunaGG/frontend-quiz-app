"use client";
import { GlobalContext, QuestionType } from "@/app/context/Context";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction, useContext } from "react";

export type ButtonPropType = {
  title?: string | null;
  icon?: string | null;
  bg?: string | null;
  option?: string | undefined;
  label?: string;
  getAnswer?: (value: string) => void;
  isSelected?: string | boolean;
  clickCount?: number;
  setClickCount?: Dispatch<SetStateAction<number>>;
  setIsFalseAnswer?: Dispatch<SetStateAction<string | null | undefined>>;
  randomQuestion?: QuestionType | null;
  selectedAnswer?: string | null;
  onClick?: () => void;
};

const Button = ({
  title,
  icon,
  bg,
  option,
  label,
  clickCount,
  setClickCount,
  selectedAnswer,
  randomQuestion,
}: ButtonPropType) => {
  const path = usePathname();
  const context = useContext(GlobalContext);
  if (!context) return null;
  const { isMobile, isDesktop, handleClick, filteredData, getAnswer } = context;

  const imageWidth = isMobile ? 28.57 : 40;
  const imageHeight = isMobile ? 28.57 : 40;

  const handleButtonClick = () => {
    const count = clickCount ?? 0;
    if (!filteredData) {
      handleClick(title || "");
    }
    if (count < 1) {
      if (filteredData) {
        getAnswer(option || "");
      }
      if (setClickCount) {
        setClickCount((prev) => prev + 1);
      }
    }
  };

  return (
    <button
      onClick={handleButtonClick}
      className={` w-full flex items-center gap-4 py-3 pl-3 shadow-md rounded-xl md:rounded-3xl
      lg:pl-[20px] md:shadow-lg lg:shadow-xl bg-white md:gap-8  ${
        isDesktop && path !== "/" ? "py-[18px]" : "py-[20px]"
      } dark:bg-[#3B4D66] transition-colors duration-700 ease-in-out `}
    >
      <div
        style={{ background: bg || "" }}
        className="w-10 h-10 rounded-md flex items-center justify-center md:w-[56px] md:h-[56px]"
      >
        {path === "/" ? (
          <Image
            src={icon || ""}
            alt={title || ""}
            height={imageHeight}
            width={imageWidth}
          />
        ) : (
          <div
            style={{
              background:
                label &&
                selectedAnswer === randomQuestion?.answer &&
                selectedAnswer === option
                  ? "#26D782"
                  : label &&
                    selectedAnswer !== randomQuestion?.answer &&
                    selectedAnswer === option
                  ? "#EE5454"
                  : label
                  ? "#F4F6FA"
                  : "",
            }}
            className={`w-10 h-10 rounded-[6px] text-[18px] leading-[18px] font-medium flex items-center justify-center md:w-[56px] md:h-[56px] md:rounded-[12px] lg:rounded-[8px] md:text-[28px] md:leading-[28px] text-[#626C7F] `}
          >
            {" "}
            {label}{" "}
          </div>
        )}
      </div>
      <p className="text-[18px] font-medium text-[#313E51] leading-[18px] md:text-[28px] md:leading-[28px] dark:text-white transition-colors duration-700 ease-in-out">
        {option ? option : title}
      </p>
    </button>
  );
};

export default Button;
