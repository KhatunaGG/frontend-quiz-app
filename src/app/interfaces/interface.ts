import { Dispatch, SetStateAction } from "react";

export type GlobalContextType = {
  isDesktop: boolean;
  isTablet: boolean;
  isMobile: boolean;
  data: QuizType[];
  handleClick: (value: string) => void;
  filteredData: QuizType | null;
  randomQuestion: QuestionType | null;
  askedQuestions: QuestionType[];
  handleSubmit: () => void;
  getAnswer: (value: string) => void;
  selectedAnswer: string | null;
  clickCount: number;
  setClickCount: Dispatch<SetStateAction<number>>;
  count: number;
  setAskedQuestions: Dispatch<SetStateAction<QuestionType[]>>;
  resetQuiz: () => void;
  isChecked: boolean;
  setIsChecked: Dispatch<SetStateAction<boolean>>;
  optionsWithLabels: OptionsType;
  setCount: Dispatch<SetStateAction<number>>;
  handleCheckboxChange: () => void;
  setOption: Dispatch<SetStateAction<string | null | undefined>>;
  option: string | null | undefined;
};

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

export type SubmitButtonType = {
  handleSubmit?: () => void;
  selectedAnswer?: string | null;
  clickCount?: number;
  askedQuestions?: QuestionType[];
  setAskedQuestions?: Dispatch<SetStateAction<QuestionType[]>>;
  resetQuiz?: () => void;
  setCount?: Dispatch<SetStateAction<number>>;
};


export type ButtonPropType = {
    title?: string | null;
    icon?: string | null;
    bg?: string | null;
    option?: string | undefined;
    label?: string;
    getAnswer?: (value: string) => void;
    isSelected?: string | boolean;
    clickCount?: number;
    setClickCount?: Dispatch<SetStateAction<number>>;
    setIsFalseAnswer?: Dispatch<SetStateAction<string | null | undefined>>;
    randomQuestion?: QuestionType | null;
    selectedAnswer?: string | null;
    onClick?: () => void;
  };