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
  darkMode: boolean;
  isDesktop: boolean;
  isTablet: boolean;
  isMobile: boolean;
  toggleDarkMode: () => void;
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
  setIsFalseAnswer: Dispatch<SetStateAction<string | null | undefined>>;
  isFalseAnswer: string | null | undefined;
  score: number;
  isAnswer: string | null;
  setAskedQuestions: Dispatch<SetStateAction<QuestionType[]>>;
  resetQuiz: () => void;
  isChecked: boolean;
  setIsChecked: Dispatch<SetStateAction<boolean>>;
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

function Context({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);
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
  const [isFalseAnswer, setIsFalseAnswer] = useState<string | null>();
  const [isAnswer, setIsAnswer] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setData(quizData);
  }, []);

  const router = useRouter();

  const handleClick = (title: string | undefined) => {
    const filtered = data.find((el) => el.title === title);

    if (filtered) {
      setFilteredData(filtered);
      setQuestionsArray(filtered.questions);
      setAskedQuestions([]);
      router.push("/question");
    }
  };

  console.log(askedQuestions.length, "askedQuestions.length");

  const getNextRandomQuestion = () => {
    if (!questionsArray) return;

    if (askedQuestions.length < questionsArray.length) {
      let remainingQuestions = questionsArray.filter(
        (q) => !askedQuestions.includes(q)
      );
      const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
      const nextQuestion = remainingQuestions[randomIndex];
      setRandomQuestion(nextQuestion);

      setAskedQuestions((prev) => [...prev, nextQuestion]);
    } else {
      router.push("/score");
      // setRandomQuestion(null);
      // setAskedQuestions([]);
    }
  };

  useEffect(() => {
    if (filteredData) {
      getNextRandomQuestion();
    }
  }, [filteredData]);

  const getAnswer = (answer: string) => {
    if (randomQuestion?.answer === answer) {
      setScore((prev) => prev + 1);
      setSelectedAnswer(answer);
      setIsAnswer(answer);
    } else {
      setIsFalseAnswer(answer);
    }
  };

  //reset function:
  //  const resetQuiz = () => {
  //   setAskedQuestions([]);
  //   setScore(0);
  //   getNextRandomQuestion(); // Start with the first random question again
  // };

  const handleSubmit = () => {
    getNextRandomQuestion();
  };

  const resetQuiz = () => {
    setFilteredData(null);

    setRandomQuestion(null);
    setAskedQuestions([]);

    router.push("/");
    setScore(0);
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

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
        darkMode,
        isDesktop,
        isTablet,
        isMobile,
        toggleDarkMode,
        data,
        handleClick,
        filteredData,
        questionsArray,
        randomQuestion,
        askedQuestions,
        handleSubmit,
        getAnswer,
        selectedAnswer,
        setIsFalseAnswer,
        isFalseAnswer,
        clickCount,
        setClickCount,
        score,
        isAnswer,
        setAskedQuestions,
        resetQuiz,
        isChecked,
        setIsChecked,
      }}
    >
      <div>{children}</div>
    </GlobalContext.Provider>
  );
}

export default Context;
