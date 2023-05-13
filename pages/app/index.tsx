/* eslint-disable react/no-unescaped-entities */
import React from "react";
import styles from "./App.module.css";
import { RemoveCurtain } from "@/components/curtain/Curtain";
import Head from "next/head";

const App = () => {
	const inputRef = React.useRef<HTMLInputElement>(null);

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

	return (
		<>
			<Head>
				<title>BrainByte — About us</title>
			</Head>

			<main id="aboutPage" className={styles.main}>
				<div className={styles.inner}>
					<div className={styles.intro}>
						<h2>What you want to learn about?</h2>
						<p>
							This is a platform enhanced using AI to help students learn about
							topics in a short & fun way. An additional quiz of 5 questions is
							also generated for you to practice with and keep growing.
						</p>
					</div>
					<div
						className={styles.inputBox}
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
					<div className={styles.proceed}>
						{" "}
						Proceed <span className={styles.arrow}>→</span>
					</div>
				</div>
			</main>
		</>
	);
};

export default App;
