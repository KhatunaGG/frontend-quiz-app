"use client";
import { GlobalContext } from "@/app/context/Context";
import { useContext } from "react";

function DesktopEllipse() {
  const context = useContext(GlobalContext);
  if (!context) return null;
  const { isChecked } = context;

  return (
    <svg
      width="438"
      height="564"
      viewBox="0 0 438 564"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="-50.5"
        cy="75.5"
        r="416.5"
        stroke={isChecked ? "#2D3949" : "#EDF1F9"}
        strokeWidth="144"
        className="transition-colors duration-700 ease-in-out"
      />
    </svg>
  );
}

export default DesktopEllipse;
