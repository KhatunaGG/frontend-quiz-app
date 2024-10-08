"use client";
import { GlobalContext } from "@/app/context/Context";
import { useContext } from "react";

function EllipseDown() {
  const context = useContext(GlobalContext);
  if (!context) return null;
  const { isChecked } = context;

  return (
    <svg
      width="540"
      height="608"
      viewBox="0 0 540 608"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute bottom-0 right-0 "
    >
      <circle
        cx="488.5"
        cy="488.5"
        r="416.5"
        // stroke="#EDF1F9"
        stroke={isChecked ? "#2D3949" : "#EDF1F9"}
        strokeWidth="144"
        className="transition-colors duration-700 ease-in-out"
      />
    </svg>
  );
}

export default EllipseDown;
