/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useRef, useState } from "react";
import styles from "./App.module.css";
import { RemoveCurtain } from "@/components/curtain/Curtain";
import Head from "next/head";
import { gsap } from "gsap";

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
				const response = await fetch("/api/generate", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ text: inputValue }),
				});
				const data = await response.json();
				inputRef.current?.removeAttribute("disabled");
				loadingRef.current?.style.setProperty("visibility", "hidden");
				handleData(data);
				setValid(true);
			} catch (error) {
				console.error("Error:", error);
			}
		}
	};

	function handleData(data: any) {
		const response = data.result;

		const jsonRegex = /~~~([^•]+)~~~/;
		const matches = response.match(jsonRegex);

		if (matches && matches.length > 1) {
			const jsonString = matches[1];
			const jsonObject = JSON.parse(jsonString);
			const cleanedHtml = response.replace(matches[0], "");
			updateHTML(cleanedHtml);
			console.log(jsonObject);
			return;
		}
	}

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
					// gsap.to(styles.quiz, {
					// 	display: "block",
					// 	duration: 0.2,
					// });
				},
			});
		}
	}

	function generateQuiz(quizData: any) {
		const quiz = quizData.questions;
		const quizContainer = document.getElementById("quizContainer");
		if (quizContainer) {
			quizContainer.innerHTML = "";
			for (let i = 0; i < quiz.length; i++) {
				const question = quiz[i].question;
				const options = quiz[i].options;
				const correctAnswer = quiz[i].correctAnswer;

				const questionElement = document.createElement("div");
				questionElement.classList.add(styles.question);
				questionElement.innerHTML = question;
				quizContainer.appendChild(questionElement);

				const optionsElement = document.createElement("div");
				optionsElement.classList.add(styles.options);
				for (let j = 0; j < options.length; j++) {
					const option = options[j];
					const optionElement = document.createElement("div");
					optionElement.classList.add(styles.option);
					optionElement.innerHTML = option;
					optionElement.addEventListener("click", () => {
						if (option === correctAnswer) {
							optionElement.classList.add(styles.correct);
						} else {
							optionElement.classList.add(styles.incorrect);
						}
					});
					optionsElement.appendChild(optionElement);
				}
				quizContainer.appendChild(optionsElement);
			}
		}
	}

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
							<div className={styles.quiz}>
								<div className={styles.quizContent}>
									<div className={styles.quizQuestion}>
										<h3>Question 1</h3>
										<p>What is the capital of India?</p>
									</div>
									<div className={styles.quizOptions}>
										<div className={styles.quizOption}>
											<input type="radio" name="option" id="option1" />
											<label htmlFor="option1">New Delhi</label>
										</div>
										<div className={styles.quizOption}>
											<input type="radio" name="option" id="option2" />
											<label htmlFor="option2">Mumbai</label>
										</div>
										<div className={styles.quizOption}>
											<input type="radio" name="option" id="option3" />
											<label htmlFor="option3">Kolkata</label>
										</div>
										<div className={styles.quizOption}>
											<input type="radio" name="option" id="option4" />
											<label htmlFor="option4">Chennai</label>
										</div>
									</div>
								</div>
							</div>

							<div className={styles.lottiePanel}>
								<div className={styles.lottie}></div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
};

export default App;
