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
	useEffect(() => {
		const quizData = props.quizObject;
		const quizContent = quizData.map((question, index) => (
			<div className={styles.quizContent} key={index}>
				<div className={styles.quizQuestion}>
					<h3>Question {index + 1}</h3>
					<p>{question.ques}</p>
				</div>
				<div className={styles.quizOptions}>
					{question.options.map((option, optionIndex) => {
						const optionKey = `option${index}-${optionIndex}`;
						const isOptionSelected = selectedAnswers[index] === optionIndex;
						const isOptionCorrect = isOptionSelected && option === question.ans;
						const optionClass = isOptionCorrect
							? styles.correct
							: isOptionSelected
							? styles.incorrect
							: "";

						return (
							<div
								className={`${styles.quizOption} ${optionClass}`}
								key={optionIndex}
							>
								<input
									type="radio"
									name={`option${index}`}
									id={optionKey}
									checked={isOptionSelected}
									onChange={() => handleOptionChange(index, optionIndex)}
								/>
								<label htmlFor={optionKey}>{option}</label>
							</div>
						);
					})}
				</div>
			</div>
		));

		setQuizContent(quizContent);
	}, [props.quizObject]);

	const [quizContent, setQuizContent] = useState<JSX.Element[]>([]);
	const [selectedAnswers, setSelectedAnswers] = useState<{
		[key: number]: number;
	}>({});
	const [showResults, setShowResults] = useState(false);

	const handleOptionChange = (questionIndex: number, optionIndex: number) => {
		setSelectedAnswers((prevSelectedAnswers) => ({
			...prevSelectedAnswers,
			[questionIndex]: optionIndex,
		}));
	};

	const handleSubmit = () => {
		setShowResults(true);
	};

	const calculateScore = () => {
		let score = 0;
		props.quizObject.forEach((question, index) => {
			if (selectedAnswers[index] === question.options.indexOf(question.ans)) {
				score++;
			}
		});
		return score;
	};

	return (
		<div className={styles.quiz}>
			{quizContent}
			<div className={styles.endPanel}>
				<button onClick={handleSubmit} className={styles.btn}>
					Submit <span className={styles.arrow}>→</span>
				</button>
				{showResults && (
					<div className={styles.results}>
						<h3>Results —</h3>
						<p>
							{calculateScore()} out of {props.quizObject.length}
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
