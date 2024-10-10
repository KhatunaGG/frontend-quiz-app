"use client";
import { SubmitButtonType } from "@/app/interfaces/interface";

function SubmitButton({
  handleSubmit,
  clickCount,
  askedQuestions,
  setAskedQuestions,
  resetQuiz,
  selectedAnswer,
}: SubmitButtonType) {
  return (
    <button
      onClick={() => {
        if (handleSubmit) {
          handleSubmit();
        } else if (
          clickCount === 0 &&
          askedQuestions?.length === 10 &&
          setAskedQuestions?.length === 0
        ) {
          setAskedQuestions([]);
        }
        if (resetQuiz) {
          resetQuiz();
        }
      }}
      className="w-full bg-[#A729F5] rounded-[12px] text-white text-[18px] 
      leading-[18px] font-medium md:rounded-3xl md:text-[28px] md:leading-[28px] py-[19px] md:py-8 
      transition duration-300 ease-in-out hover:bg-[#A729F580]"
    >
      {!selectedAnswer && askedQuestions && askedQuestions.length > 0
        ? "Submit Answer"
        : selectedAnswer && askedQuestions && askedQuestions.length > 0
        ? "Next Question"
        : "Play Again"}
    </button>
  );
}

export default SubmitButton;
