"use client";
import { QuestionType } from "@/app/context/Context";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

export type SubmitButtonType = {
  handleSubmit?: () => void;
  selectedAnswer?: string | null;
  isFalseAnswer?: string | undefined | null;
  setClickCount?: Dispatch<SetStateAction<number>>;
  clickCount?: number;
  askedQuestions?: QuestionType[];
  setAskedQuestions?: Dispatch<SetStateAction<QuestionType[]>>;
  resetQuiz?: () => void;
};

function SubmitButton({
  handleSubmit,
  setClickCount,
  clickCount,
  askedQuestions,
  setAskedQuestions,
  resetQuiz,
}: SubmitButtonType) {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        if (clickCount === 1 && handleSubmit && setClickCount) {
          handleSubmit();
          setClickCount(0);
        } else if (
          clickCount === 1 &&
          askedQuestions?.length === 10 &&
          setAskedQuestions?.length === 0
        ) {
          setAskedQuestions([]);
          router.push("/score");
        }
        if (resetQuiz) {
          resetQuiz();
        }
      }}
      className="w-full bg-[#A729F5] rounded-[12px] text-white text-[18px] 
      leading-[18px] font-medium md:rounded-3xl md:text-[28px] md:leading-[28px] py-[19px] md:py-8 
      transition duration-300 ease-in-out hover:bg-[#A729F580]"
    >
      {askedQuestions && askedQuestions.length > 0
        ? "Submit Answer"
        : "Play Again"}
    </button>
  );
}

export default SubmitButton;
