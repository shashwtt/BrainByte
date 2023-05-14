/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useRef, useState } from "react";
import styles from "./App.module.css";
import { RemoveCurtain } from "@/components/curtain/Curtain";
import Head from "next/head";
import { gsap } from "gsap";
import { Quiz } from "@/components/quiz/Quiz";

const App = () => {
	const inputRef = React.useRef<HTMLInputElement>(null);
	const loadingRef = React.useRef<HTMLDivElement>(null);
	const [valid, setValid] = React.useState(true);

	React.useEffect(() => {
		const handleLoad = () => RemoveCurtain();
		const images = document.querySelectorAll("img");
		let imagesToLoad = images.length;
		const reduceImagesToLoad = () => {
			imagesToLoad--;
			if (imagesToLoad === 0) handleLoad();
		};
		images.forEach((image) => {
			if (image.complete) reduceImagesToLoad();
			else image.addEventListener("load", reduceImagesToLoad);
		});

		return () => {
			images.forEach((image) =>
				image.removeEventListener("load", reduceImagesToLoad)
			);
		};
	}, []);

	const prompts = [
		"Quantum Physics",
		"Photosynthesis",
		"The Big Bang",
		"The Solar System",
		"The Universe",
		"The Milky Way",
		"The Andromeda Galaxy",
	];

	const [prompt, setPrompt] = React.useState(randomPlaceholder());

	function randomPlaceholder() {
		return prompts[Math.floor(Math.random() * prompts.length)];
	}

	React.useEffect(() => {
		setPrompt(randomPlaceholder());
		const interval = setInterval(() => {
			setPrompt(randomPlaceholder());
		}, 3000);
		return () => clearInterval(interval);
	}, []);

	const btnRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const btn = btnRef.current;
		if (btn) {
			btn.addEventListener("click", handleProceed);
		}
		return () => {
			if (btn) {
				btn.removeEventListener("click", handleProceed);
			}
		};
	}, []);

	function processPrompt(prompt: any) {
		try {
			if (prompt) {
				const jsonStartIndex = prompt.indexOf("~~~");
				const jsonEndIndex = prompt.lastIndexOf("~~~");

				const cleanedHTML =
					prompt.substring(0, jsonStartIndex) +
					prompt.substring(jsonEndIndex + 3);

				const jsonCode = prompt.substring(jsonStartIndex + 3, jsonEndIndex);
				const quiz = JSON.parse(jsonCode);

				return {
					cleanedHTML: cleanedHTML.trim(),
					quiz: quiz.quiz,
				};
			}
		} catch (e) {
			console.log(e);
			console.log(prompt);
			return {
				cleanedHTML: `
				<p> <b> Something went wrong: </b><br />We couldn't generate a quiz for this text. This may be an error with the OpenAI's API or because of a faulty prompt. Please try again. </p>
				<p><b> Here are some random quotes instead: </b>
				<br /> "The best way to predict the future is to create it." — Abraham Lincoln 
				<br /> "There is nothing permanent except change." — Heraclitus 
				<br /> "The only way to do great work is to love what you do." — Steve Jobs </p><br /> 
				`,
				quiz: [],
			};
		}
	}

	const handleProceed = async () => {
		if (!valid) return;
		inputRef.current?.setAttribute("disabled", "true");
		loadingRef.current?.style.setProperty("visibility", "visible");

		var inputValue = inputRef.current?.value;
		if (inputValue == "") inputValue = prompt;
		if (inputValue) {
			try {
				console.log("sending request!");
				setValid(false);
				const response = await fetch(
					"/api/fetch?text=" + inputValue
				);

				const data = await response.json();
				inputRef.current?.removeAttribute("disabled");
				loadingRef.current?.style.setProperty("visibility", "hidden");
				setValid(true);
				console.log(data.result);
				var pog = processPrompt(data.result);
				if (pog) {
					updateHTML(pog.cleanedHTML);
					setQuizData(pog.quiz);
				}
			} catch (error) {
				console.error("Error:", error);
			}
		}
	};

	const introRef = useRef<HTMLDivElement>(null);
	const inputBoxRef = useRef<HTMLDivElement>(null);
	function updateHTML(html: string) {
		const children = introRef.current?.children;
		if (children) {
			gsap.to(children, {
				duration: 0.4,
				opacity: 0,
				y: -20,
				onComplete: () => {
					while (children.length > 0) {
						children[0].remove();
					}
					introRef.current?.insertAdjacentHTML("beforeend", html);
					const newChildren = introRef.current?.children;
					if (newChildren) {
						gsap.fromTo(
							newChildren,
							{ opacity: 0, y: 20 },
							{ duration: 0.4, opacity: 1, y: 0 }
						);
					}
					gsap.to(inputBoxRef.current, {
						duration: 0.4,
						opacity: 0,
						scale: 0,
						onComplete: () => {
							inputBoxRef.current?.remove();
						},
					});
					gsap.to(btnRef.current, {
						duration: 0.4,
						opacity: 0,
						scale: 0,
						onComplete: () => {
							btnRef.current?.remove();
						},
					});
				},
			});
		}
	}

	const [myquizData, setQuizData] = useState([
		{
			ques: "What is the Big Bang Theory?",
			ans: "An explanation for how the universe began",
			options: [
				"A new TV show",
				"A type of particle",
				"An ancient language",
				"An explanation for how the universe began",
			],
		},
		{
			ques: "How did scientists come up with this theory?",
			ans: "They used evidence from observations of outer space",
			options: [
				"They studied ancient texts",
				"They conducted experiments",
				"They used computer simulations",
				"They used evidence from observations of outer space",
			],
		},
		{
			ques: "What else has been discovered about the Big Bang Theory?",
			ans: "Dark matter and dark energy and cosmic inflation",
			options: [
				"Black holes",
				"Gravity waves",
				"Dark matter and dark energy and cosmic inflation",
				"Light speed travel",
			],
		},
	]);

	useEffect(() => {
		setQuizData(myquizData);
	}, []);

	return (
		<>
			<Head>
				<title>BrainByte — About us</title>
			</Head>

			<main id="aboutPage" className={styles.main}>
				<div className={styles.inner}>
					<div className={styles.container}>
						<div>
							<div className={styles.intro} ref={introRef}>
								<h2>What do you want to learn about?</h2>
								<p>
									This is an AI powered platform made to teach students about
									topics ranging from simple mathematics to the most advanced
									quantum theory, you can generate 5 additional questions for
									each prompt to practice and learn about the concepts.
								</p>
							</div>
							<div
								className={styles.inputBox}
								ref={inputBoxRef}
								onClick={() => {
									inputRef.current?.focus();
								}}
							>
								<div className={styles.before}>More about</div>
								<input
									ref={inputRef}
									type="text"
									placeholder={prompt}
									maxLength={100}
									className={styles.textArea}
								/>
							</div>
							<div className={styles.proceed} ref={btnRef}>
								Proceed <span className={styles.arrow}>→</span>
								<div
									className={styles.loading}
									ref={loadingRef}
									style={{ visibility: "hidden" }}
								>
									<span className={styles.loader}></span>loading
								</div>
							</div>
						</div>
						<div className={styles.qC}>
							<Quiz quizObject={myquizData} />
						</div>
					</div>
				</div>
			</main>
		</>
	);
};

export default App;
