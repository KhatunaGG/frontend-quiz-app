"use client";
import { LinearProgress } from "@mui/material";

const ProgressLine = ({ value }: { value: number }) => {
  const totalQuestions = 10;
  const progressValue = (value / totalQuestions) * 100;

  const getProgressColor = (value: number) => {
    if (value) {
      return "#A729F5";
    }
  };

  return (
    <div className="w-full py-1 bg-white rounded-md mb-10 mt-6 dark:bg-[#3B4D66] transition-colors duration-700 ease-in-out md:mb-[64px] md:mt-[64px]">
      <LinearProgress
        variant="determinate"
        value={progressValue}
        className="rounded-lg h-2"
        sx={{
          backgroundColor: "white",
          "& .MuiLinearProgress-bar": {
            backgroundColor: getProgressColor(value),
          },
        }}
      />
    </div>
  );
};

export default ProgressLine;
