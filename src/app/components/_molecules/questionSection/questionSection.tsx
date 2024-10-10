"use client";
import React, { useContext } from "react";
import ProgressLine from "../progress/ProgressLine";
import SubmitButton from "../submitButton/SubmitButton";
import Button from "../button/Button";
import { GlobalContext } from "@/app/context/Context";

const QuestionSection = () => {
  const context = useContext(GlobalContext);
  if (!context) return null;
  const {
    filteredData,
    randomQuestion,
    askedQuestions,
    handleSubmit,
    getAnswer,
    selectedAnswer,
    clickCount,
    setClickCount,
    setAskedQuestions,
    score,
    optionsWithLabels,
    setScore,
  } = context;


  return (
    <div className="flex flex-col lg:flex-row lg:justify-between">
      <div className="flex flex-col gap-3 md:gap-[27px] lg:w-[40.08%]">
        <p className="text-[14px] leading-[21px] italic text-[#626C7F] font-normal md:text-[20px] md:leading-[30px]  mb-3 dark:text-[#ABC1E1] transition-colors duration-700 ease-in-out">
          Question {askedQuestions.length} of {filteredData?.questions.length}
        </p>
        <h2 className="font-medium text-[20px] leading-[24px] text-[#626C7F] mb-6 md:text-[36px] md:leading-[43.2px] md:mb-10 lg:mb-[137px] dark:text-white transition-colors duration-700 ease-in-out">
          {randomQuestion?.question}
        </h2>
        <ProgressLine value={score} />
      </div>
      <div className="lg:w-[48.62%] flex flex-col gap-3 md:gap-8">
        <div className="flex flex-col gap-3 md:gap-6">
          {optionsWithLabels?.map(({ label, option }, i) => (

            <Button
              key={i}
              option={option}
              label={label}
              onClick={() => getAnswer(option)}
              clickCount={clickCount}
              setClickCount={setClickCount}
              randomQuestion={randomQuestion}
              selectedAnswer={selectedAnswer}
            />
          ))}
        </div>

        <SubmitButton
          handleSubmit={handleSubmit}
          selectedAnswer={selectedAnswer}
          setClickCount={setClickCount}
          clickCount={clickCount}
          askedQuestions={askedQuestions}
          setAskedQuestions={setAskedQuestions}
          setScore={setScore}
        />
      </div>
    </div>
  );
};

export default QuestionSection;
