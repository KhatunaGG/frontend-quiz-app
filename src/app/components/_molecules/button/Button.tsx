"use client";
import { GlobalContext } from "@/app/context/Context";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { GreenIcon, RedIcon } from "../../_atoms";
import { ButtonPropType } from "@/app/interfaces/interface";

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
    const num = clickCount ?? 0;
    if (num >= 1) return;
    if (!filteredData) {
      handleClick(title || "");
    }
    getAnswer(option || "");
    if (setClickCount) {
      setClickCount((prev) => prev + 1);
    }
  };

  return (
    <button
      onClick={handleButtonClick}
      style={{
        border: (() => {
          if (!selectedAnswer) return "";
          if (label && selectedAnswer === option && clickCount === 1)
            return "3px solid #A729F5";
          if (
            label &&
            selectedAnswer === option &&
            selectedAnswer === randomQuestion?.answer &&
            clickCount === 0
          )
            return "3px solid #26D782";
          if (
            label &&
            selectedAnswer === option &&
            selectedAnswer !== randomQuestion?.answer &&
            clickCount === 0
          )
            return "3px solid #EE5454";
        })(),
      }}
      className={`relative w-full flex items-center gap-4 py-3 pl-3 shadow-md rounded-xl md:rounded-3xl
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
            src={icon || "/assets/cssIcon.svg"}
            alt={title || "Title"}
            height={imageHeight}
            width={imageWidth}
          />
        ) : (
          <div
            style={{
              background: (() => {
                if (!selectedAnswer) return "#F4F6FA";
                if (label && selectedAnswer === option && clickCount === 1)
                  return "#A729F5";
                if (
                  label &&
                  selectedAnswer === option &&
                  selectedAnswer === randomQuestion?.answer &&
                  clickCount === 0
                )
                  return "#26D782";
                if (
                  label &&
                  selectedAnswer === option &&
                  selectedAnswer !== randomQuestion?.answer &&
                  clickCount === 0
                )
                  return "#EE5454";
              })(),
            }}
            className={`bg-[#F4F6FA] w-10 h-10 rounded-[6px] text-[18px] leading-[18px] font-medium flex items-center justify-center md:w-[56px] md:h-[56px] md:rounded-[12px] lg:rounded-[8px] md:text-[28px] md:leading-[28px] text-[#626C7F] `}
          >
            {" "}
            {label}{" "}
          </div>
        )}
      </div>
      <p className="text-[18px] font-medium text-[#313E51] leading-[18px] md:text-[28px] md:leading-[28px] dark:text-white transition-colors duration-700 ease-in-out">
        {option ? option : title}
      </p>
      {selectedAnswer &&
        randomQuestion?.answer === option &&
        clickCount === 0 && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 md:w-[30px] md:h-[30px]">
            <GreenIcon />
          </div>
        )}
      {selectedAnswer &&
        randomQuestion?.answer !== selectedAnswer &&
        selectedAnswer === option &&
        clickCount === 0 && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 md:w-[30px] md:h-[30px]">
            <RedIcon />
          </div>
        )}
    </button>
  );
};

export default Button;
