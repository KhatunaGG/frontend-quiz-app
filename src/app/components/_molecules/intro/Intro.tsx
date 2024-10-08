"use client";
import { GlobalContext } from "@/app/context/Context";
import Button from "../button/Button";
import { useContext } from "react";

const Intro = () => {
  const context = useContext(GlobalContext);
  if (!context) return;
  const { data } = context;

  return (
    <div className="flex flex-col gap-10 md:gap-[64px] lg:flex-row lg:gap-[11.29%] mx-auto ">
      <div className="flex flex-col gap-4 lg:w-[40.08%] ">
        <h1 className="text-[#313E51] text-[40px] md:text-[64px] leading-[40px] font-light md:font-light  md:leading-[64px] dark:text-white transition-colors duration-700 ease-in-out">
          Welcome to the{" "}
          <span className="text-[#313E51] font-medium dark:text-white transition-colors duration-700 ease-in-out">
            Frontend Quiz!
          </span>
        </h1>
        <p className="text-[14px] md:text-[20px] md:leading-[30px] italic text-[#626C7F] font-normal dark:text-[#ABC1E1] transition-colors duration-700 ease-in-out">
          Pick a subject to get started.
        </p>
      </div>
      <div className="w-full flex flex-col gap-3 lg:w-[48.62%]">
        {data.map((el, i) => (
          <Button key={i} title={el.title} icon={el.icon} bg={el.bg} />
        ))}
      </div>
    </div>
  );
};

export default Intro;
