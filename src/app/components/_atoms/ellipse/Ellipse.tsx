"use client";
import { GlobalContext } from "@/app/context/Context";
import { useContext } from "react";

const Ellipse = () => {
  const context = useContext(GlobalContext);
  if (!context) return null;
  const { isChecked } = context;

  return (
    <svg
      width="375"
      height="812"
      viewBox="0 0 375 812"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 -z-10"
    >
      <circle
        cx="-113.5"
        cy="323.5"
        r="416.5"
        stroke={isChecked ? "#2D3949" : "#EDF1F9"}
        strokeWidth="144"
        className="transition-colors duration-700 ease-in-out"
      />
    </svg>
  );
};

export default Ellipse;
