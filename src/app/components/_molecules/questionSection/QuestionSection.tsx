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
    count,
    optionsWithLabels,
    setCount,
    
  } = context;

  return (
    <div className="flex flex-col lg:flex-row lg:justify-between">
      <div className="flex flex-col  lg:w-[40.08%] justify-between lg:pb-[112px]">
        <div className="flex flex-col">
          <p className="hidden md:flex text-[14px] leading-[21px] italic text-[#626C7F] font-normal md:text-[20px] md:leading-[30px] md:mb-[27px]   dark:text-[#ABC1E1] transition-colors duration-700 ease-in-out">
            Question {askedQuestions.length} of {filteredData?.questions.length}
          </p>
          <h2 className="font-medium text-[20px] leading-[24px] text-[#626C7F]  md:text-[36px] md:leading-[43.2px]  lg:mt-[27px] dark:text-white transition-colors duration-700 ease-in-out">
            {randomQuestion?.question}
          </h2>

          <p className="flex md:hidden text-[14px] leading-[21px] italic text-[#626C7F] font-normal mt-3 dark:text-[#ABC1E1] transition-colors duration-700 ease-in-out">
            Question {askedQuestions.length} of {filteredData?.questions.length}
          </p>
        </div>
        <ProgressLine value={count} />
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
          clickCount={clickCount}
          askedQuestions={askedQuestions}
          setAskedQuestions={setAskedQuestions}
          setCount={setCount}
        />
      </div>
    </div>
  );
};

export default QuestionSection;
