/* eslint-disable react/no-unescaped-entities */
import React from "react";
import styles from "./About.module.css";
import { RemoveCurtain } from "@/components/curtain/Curtain";
import Head from "next/head";
import Image from "next/image";

const About = () => {
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

	return (
		<>
			<Head>
				<title>BrainByte — About us</title>
			</Head>

			<main id="aboutPage" className={styles.main}>
				<div className={styles.inner}>
					<div className={styles.content}>
						<h1 className={styles.title}>About Us — BrainByte</h1>
						<p>
							BrainByte is an AI-powered education website that generates
							quizzes based on user-selected topics and subjects. It utilizes
							cutting-edge artificial intelligence techniques to provide users
							with interactive quizzes and in-depth information about various
							subjects. The project aims to enhance the learning experience by
							offering personalized quizzes and comprehensive details on the
							chosen topics.
						</p>
						<hr />
						<h2>Have an exam in a couple hours? We’ve got you covered</h2>
						<p>
							Artificial intelligence is becoming an increasingly important part
							of our everyday existence, opening up countless digital
							opportunities throughout society. From science to everyday
							knowledge, from written text, to conceptual art. World-changing
							digital innovations with human-like capabilities are everywhere,
							so the risk of human-like flaws is ever present as well. Our
							project BrainByte uses the OpenAi’s ChatGPT API to generate set of
							10 unique questions to help you in your exams preparation. You can
							choose from one of the commonly asked prompts or go for a
							completely random topic. You’re the boss and you can ask anything.
						</p>
						<h2 className={styles.subtitle}>Our Mission & Inspiration</h2>
						<p>
							Our mission is to provide a platform for students to learn and
							revise their knowledge in a fun and interactive way. We aim to
							provide a personalized learning experience for students by
							offering them quizzes based on their interests and knowledge
							level. We also aim to provide a platform for students to learn
							about various topics in-depth by providing them with detailed
							information about the topics they are interested in. BrainByte was
							inspired by our belief that technology can enhance learning
							experiences. There is a need for more accessible and interactive
							ways to learn, especially with the current state of education,
							which has been greatly impacted by the pandemic.
						</p>

						<h2 className={styles.subtitle}>Our Technology</h2>
						<p>
							BrainByte utilizes cutting-edge artificial intelligence techniques
							to provide users with interactive quizzes and in-depth information
							about various subjects. The project aims to enhance the learning
							experience by offering personalized quizzes and comprehensive
							details on the chosen topics. The project uses NextJs and OpenAI's
							API primarily.
						</p>

						<h2 className={styles.subtitle}>Our Team</h2>
						<div className={styles.team}>
							<div className={styles.member}>
								<Image
									src="/images/shashwt.jpg"
									alt="Shashwat Dubey"
									width={200}
									height={200}
									priority
									className={styles.image}
									/>
								<h3>Shashwat Dubey</h3>
								<p>Full-Stack Development</p>
							</div>
							<div className={styles.member}>
								<Image
									src="/images/aikagra.jpg"
									alt="Aikagra Gupta"
									width={200}
									height={200}
									className={styles.image}
									priority
								/>
								<h3>Aikagra Gupta</h3>
								<p>Content & Graphics</p>
							</div>
							<div className={styles.member}>
								<Image
									src="/images/noname.jpg"
									alt="Anuj Rai"
									width={200}
									height={200}
									className={styles.image}
									priority
								/>
								<h3>Anuj Rai</h3>
								<p>Design</p>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
};

export default About;
