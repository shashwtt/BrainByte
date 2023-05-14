import { useEffect, useState } from "react";
import styles from "./Quiz.module.css";

interface QuizProps {
  quizObject: Question[];
}

interface Question {
  ques: string;
  ans: string;
  options: string[];
}

export function Quiz(props: QuizProps) {
  const [display, setDisplay] = useState("flex");
  const quizData = props.quizObject;
  const [answers, setAnswers] = useState<string[]>([]);

  useEffect(() => {
    if (!quizData || quizData.length === 0) {
      setDisplay("none");
      return;
    } else {
      setDisplay("flex");
    }

    const quizContent = quizData.map((question, index) => {
      const selectedAnswer = answers[index];
      const isAnsweredCorrectly = selectedAnswer === question.ans;

      return (
        <div className={styles.quizContent} key={index}>
          <div className={styles.quizQuestion}>
            <h3>Question {index + 1}</h3>
            <p>{question.ques}</p>
          </div>
          <div className={styles.quizOptions}>
            {question.options.map((option, optionIndex) => {
              const optionClass = isAnsweredCorrectly
                ? selectedAnswer === option
                  ? styles.correct
                  : ""
                : selectedAnswer === option
                ? styles.incorrect
                : "";

              return (
                <div
                  className={`${styles.quizOption} ${optionClass}`}
                  key={optionIndex}
                  onClick={() => handleAnswerSelected(index, option)}
                >
                  <div className={styles.optNum}>{optionIndex + 1}</div>
                  <h3>{option}</h3>
                </div>
              );
            })}
          </div>
        </div>
      );
    });

    setQuizContent(quizContent);
  }, [quizData, answers]);

  const [quizContent, setQuizContent] = useState<JSX.Element[]>([]);

  const handleAnswerSelected = (questionIndex: number, selectedOption: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = selectedOption;
    setAnswers(updatedAnswers);
  };

  return (
    <div className={styles.quiz} style={{ display: display }}>
      {quizContent}
    </div>
  );
}
