"use client";
import { GlobalContext } from "@/app/context/Context";
import { useContext } from "react";

const TabletEllipse = () => {
  const context = useContext(GlobalContext);
  if (!context) return null;
  const { isChecked } = context;

  return (
    <svg
      width="442"
      height="539"
      viewBox="0 0 442 539"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_228_2574)">
        <circle
          cx="-50.5"
          cy="42.5"
          r="416.5"
          stroke={isChecked ? "#2D3949" : "#EDF1F9"}
          strokeWidth="144"
          shapeRendering="crispEdges"
          className="transition-colors duration-700 ease-in-out"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_228_2574"
          x="-543"
          y="-446"
          width="985"
          height="985"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_228_2574"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_228_2574"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default TabletEllipse;
