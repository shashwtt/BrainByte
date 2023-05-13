/* eslint-disable react/no-unescaped-entities */
import React from "react";
import styles from "@/styles/Home.module.css";
import { RemoveCurtain } from "@/components/curtain/Curtain";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import type { LottiePlayer } from "lottie-web";

const Home = () => {
	const learnLottieRef = useRef<HTMLDivElement>(null);
	const [learnLottie, setLearnLottie] = useState<LottiePlayer | null>(null);

	const quizLottieRef = useRef<HTMLDivElement>(null);
	const [quizLottie, setQuizLottie] = useState<LottiePlayer | null>(null);

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

	useEffect(() => {
		import("lottie-web").then((Lottie) => setLearnLottie(Lottie.default));
	}, []);

	useEffect(() => {
		if (learnLottie && learnLottieRef.current) {
			const animation = learnLottie.loadAnimation({
				container: learnLottieRef.current,
				renderer: "svg",
				loop: true,
				autoplay: true,
				path: "/assets/learning.json",
			});
      animation.setSpeed(0.8);

			return () => animation.destroy();
		}
	}, [learnLottie]);

	useEffect(() => {
		import("lottie-web").then((Lottie) => setQuizLottie(Lottie.default));
	}, []);

	useEffect(() => {
		if (quizLottie && quizLottieRef.current) {
			const animation = quizLottie.loadAnimation({
				container: quizLottieRef.current,
				renderer: "svg",
				loop: true,
				autoplay: true,
				path: "/assets/quiz.json",
			});
      animation.setSpeed(0.7);
			return () => animation.destroy();
		}
	}, [quizLottie]);

	return (
		<>
			<Head>
				<title>BrainByte — Learn with AI</title>
			</Head>

			<main id="homePage" className={styles.main}>
				<div className={styles.inner}>
					<div className={styles.intro} intro-num="1">
						<div className={styles.main__title}>
							<h1>
								Unleash Your Potential and Learn <br /> Smarter with our &nbsp;
								<span> AI-Driven </span>
								<br /> Learning Platform
							</h1>
						</div>

						<div className={styles.main__desc}>
							<p>
								BrainByte is an AI-Powered Learning Platform for Personalized
								Education. Explore subjects, quizzes, and resources to maximize
								knowledge retention. Join us on our transformative educational
								journey.
							</p>
						</div>

						<div className={styles.main__btn}>
							<a href="/app">Get Started</a>
							<span className={styles.arrow}>→</span>
						</div>

						<div className={styles.lottiePanel}>
							<div ref={learnLottieRef} className={styles.lottie}></div>
						</div>
					</div>
					<div className={styles.intro} intro-num="2">
						<div className={styles.main__title}>
							<h1>
								Not Only Helps you with requested topics, <br /> but helps you
								practice with sample <br /> <span> AI-Generated Quizzes</span>{" "}
								&nbsp; also.
							</h1>
						</div>

						<div className={styles.main__desc}>
							<p>
								This is a smart learning platform that asks you the topics you
								have doubts with and returns meaningful information for easier
								learning. Not only that, but it also provides sample quizzes
								related to the topic so you can practice on the go!
							</p>
						</div>

						<div className={styles.main__btn}>
							<a href="/app">Try It Yourself</a>
							<span className={styles.arrow}>→</span>
						</div>
						<div className={styles.lottiePanel}>
							<div ref={quizLottieRef} className={styles.lottie}></div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
};

export default Home;
