"use client";
import {
  createContext,
  useEffect,
  useState,
} from "react";
import quizData from "../data.json";
import { useRouter } from "next/navigation";
import { GlobalContextType, OptionsType, QuestionType, QuizType } from "../interfaces/interface";


export const GlobalContext = createContext<GlobalContextType | null>(null);


function Context({ children }: { children: React.ReactNode }) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [data, setData] = useState<QuizType[]>([]);
  const [filteredData, setFilteredData] = useState<QuizType | null>(null);
  const [questionsArray, setQuestionsArray] = useState<QuestionType[] | null>(
    null
  );
  const [askedQuestions, setAskedQuestions] = useState<QuestionType[]>([]);
  const [randomQuestion, setRandomQuestion] = useState<QuestionType | null>(
    null
  );
  const [count, setCount] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [clickCount, setClickCount] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [optionsWithLabels, setOptionsWithLabels] = useState<OptionsType>([]);
  const [option, setOption] = useState<string | null>();
  const router = useRouter();


  useEffect(() => {
    setData(quizData);
  }, []);

  useEffect(() => {
    if (randomQuestion) {
      const labels = randomQuestion.options.map((option, i) => ({
        label: String.fromCharCode(65 + i),
        option,
      }));
      setOptionsWithLabels(labels);
    }
  }, [randomQuestion]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCount = JSON.parse(localStorage.getItem("count") || "0");
      const storedAskedQuestions = JSON.parse(
        localStorage.getItem("askedQuestions") || "[]"
      );
      const storedFilteredData = JSON.parse(
        localStorage.getItem("filteredData") || "null"
      );
      const storedRandomQuestion = JSON.parse(
        localStorage.getItem("randomQuestion") || "null"
      );
      const storedSelectedAnswer = JSON.parse(
        localStorage.getItem("selectedAnswer") || "null"
      );
      const storedClickCount = JSON.parse(
        localStorage.getItem("clickCount") || "0"
      );
      const storedOptionsWithLabels = JSON.parse(
        localStorage.getItem("optionsWithLabels") || "[]"
      );
      const storedQuestionsArray = JSON.parse(
        localStorage.getItem("questionsArray") || "null"
      );
      const storedIsChecked = JSON.parse(
        localStorage.getItem("isChecked") || "false"
      );
      setCount(storedCount);
      setAskedQuestions(storedAskedQuestions);
      setFilteredData(storedFilteredData);
      setRandomQuestion(storedRandomQuestion);
      setSelectedAnswer(storedSelectedAnswer);
      setClickCount(storedClickCount);
      setOptionsWithLabels(storedOptionsWithLabels);
      setQuestionsArray(storedQuestionsArray);
      setIsChecked(storedIsChecked);
    }
  }, []);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      optionsWithLabels !== null &&
      filteredData !== null &&
      questionsArray !== null &&
      randomQuestion !== null &&
      selectedAnswer !== null
    ) {
      localStorage.setItem("count", JSON.stringify(count));
      localStorage.setItem("askedQuestions", JSON.stringify(askedQuestions));
      localStorage.setItem("filteredData", JSON.stringify(filteredData));
      localStorage.setItem("randomQuestion", JSON.stringify(randomQuestion));
      localStorage.setItem("selectedAnswer", JSON.stringify(selectedAnswer));
      localStorage.setItem("clickCount", JSON.stringify(clickCount));
      localStorage.setItem(
        "optionsWithLabels",
        JSON.stringify(optionsWithLabels)
      );
      localStorage.setItem("questionsArray", JSON.stringify(questionsArray));
      localStorage.setItem("isChecked", JSON.stringify(isChecked));
    }
  }, [
    count,
    askedQuestions,
    filteredData,
    randomQuestion,
    selectedAnswer,
    clickCount,
    optionsWithLabels,
    questionsArray,
    isChecked,
  ]);

  useEffect(() => {
    const storedMode = localStorage.getItem("darkMode");
    if (storedMode === "true") {
      document.documentElement.classList.add("dark");
      setIsChecked(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsChecked(false);
    }
  }, [setIsChecked]);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    changeMode();
  };

  const changeMode = () => {
    if (!isChecked) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  };


  const handleClick = (title: string | undefined) => {
    const filtered = data.find((el) => el.title === title);
    if (filtered) {
      setFilteredData(filtered);
      setQuestionsArray(filtered.questions);
      setAskedQuestions([]);
      router.push("/question");
    }
  };

  const getNextRandomQuestion = () => {
    if (!filteredData) return;
    if (askedQuestions.length < filteredData.questions.length) {
      const remainingQuestions = filteredData.questions.filter(
        (q) => !askedQuestions.includes(q)
      );
      const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
      const nextQuestion = remainingQuestions[randomIndex];
      setRandomQuestion(nextQuestion);
      setAskedQuestions((prev) => [...prev, nextQuestion]);
    } else {
      router.push("/score");
    }
  };

  useEffect(() => {
    if (filteredData) {
      getNextRandomQuestion();
    }
  }, [filteredData]);

  const getAnswer = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {

    setClickCount(0);
    if (clickCount === 0) {
      submitAll();
    }
  };

  const submitAll = () => {
    if (randomQuestion?.answer === selectedAnswer) {
      setCount((prev) => prev + 1);
    }
    setSelectedAnswer('')
    if(selectedAnswer) {
      getNextRandomQuestion();
    }
  };

  const resetQuiz = () => {
    setFilteredData(null);
    setRandomQuestion(null);
    setAskedQuestions([]);
    router.push("/");
    setSelectedAnswer(null);
    setCount(0);
  };

  const checkWindowSize = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth >= 1024) {
      setIsDesktop(true);
      setIsTablet(false);
      setIsMobile(false);
    } else if (windowWidth >= 768) {
      setIsDesktop(false);
      setIsTablet(true);
      setIsMobile(false);
    } else {
      setIsDesktop(false);
      setIsTablet(false);
      setIsMobile(true);
    }
  };

  useEffect(() => {
    checkWindowSize();
    window.addEventListener("resize", checkWindowSize);
    return () => {
      window.removeEventListener("resize", checkWindowSize);
    };
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isDesktop,
        isTablet,
        isMobile,
        data,
        handleClick,
        filteredData,
        questionsArray,
        randomQuestion,
        askedQuestions,
        handleSubmit,
        getAnswer,
        selectedAnswer,
        clickCount,
        setClickCount,
        count,
        setAskedQuestions,
        resetQuiz,
        isChecked,
        setIsChecked,
        optionsWithLabels,
        setCount,
        handleCheckboxChange,
        setOption,
        option,
      }}
    >
      <div>{children}</div>
    </GlobalContext.Provider>
  );
}

export default Context;
