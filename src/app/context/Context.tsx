"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import quizData from "../data.json";
import { useRouter } from "next/navigation";

export type GlobalContextType = {
  isDesktop: boolean;
  isTablet: boolean;
  isMobile: boolean;
  data: QuizType[];
  handleClick: (value: string) => void;
  filteredData: QuizType | null;
  questionsArray: QuestionType[] | null;
  randomQuestion: QuestionType | null;
  askedQuestions: QuestionType[];
  handleSubmit: () => void;
  getAnswer: (value: string) => void;
  selectedAnswer: string | null;
  clickCount: number;
  setClickCount: Dispatch<SetStateAction<number>>;
  score: number;
  setAskedQuestions: Dispatch<SetStateAction<QuestionType[]>>;
  resetQuiz: () => void;
  isChecked: boolean;
  setIsChecked: Dispatch<SetStateAction<boolean>>;
  optionsWithLabels: OptionsType;
  setScore: Dispatch<SetStateAction<number>>;
  handleCheckboxChange: () => void;
};

export const GlobalContext = createContext<GlobalContextType | null>(null);

export type QuizType = {
  title: string;
  icon: string;
  bg: string;
  questions: QuestionType[];
};

export type QuestionType = {
  question: string;
  options: string[];
  answer: string;
};

export type OptionsType =
  | {
      label: string;
      option: string;
    }[]
  | undefined;

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
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [clickCount, setClickCount] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [optionsWithLabels, setOptionsWithLabels] = useState<OptionsType>([]);
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
      const storedScore = JSON.parse(localStorage.getItem("score") || "0");
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
      setScore(storedScore);
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
      localStorage.setItem("score", JSON.stringify(score));
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
    score,
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
    if (!questionsArray) return;

    if (askedQuestions.length < questionsArray.length) {
      const remainingQuestions = questionsArray.filter(
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
    if (randomQuestion?.answer === answer) {
      setScore((prev) => prev + 1);
    } else {
    }
  };

  const handleSubmit = () => {
    getNextRandomQuestion();
  };
  const resetQuiz = () => {
    setFilteredData(null);
    setRandomQuestion(null);
    setAskedQuestions([]);
    router.push("/");
    setSelectedAnswer(null);
    setScore(0);
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
        score,
        setAskedQuestions,
        resetQuiz,
        isChecked,
        setIsChecked,
        optionsWithLabels,
        setScore,
        handleCheckboxChange
      }}
    >
      <div>{children}</div>
    </GlobalContext.Provider>
  );
}

export default Context;
