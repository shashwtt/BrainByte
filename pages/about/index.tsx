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

						<h2 className={styles.subtitle}>Our Mission</h2>
						<p>
							Our mission is to provide a platform for students to learn and
							revise their knowledge in a fun and interactive way. We aim to
							provide a personalized learning experience for students by
							offering them quizzes based on their interests and knowledge
							level. We also aim to provide a platform for students to learn
							about various topics in-depth by providing them with detailed
							information about the topics they are interested in.
						</p>

						<h2 className={styles.subtitle}>Our Team</h2>
						<div className={styles.team}>
							<div className={styles.member}>
								<h3>Abhishek</h3>
								<p>Frontend Developer</p>
							</div>
							<div className={styles.member}>
								<img src="/images/about/akshat.jpg" alt="Akshat" />
								<h3>Akshat</h3>
								<p>Backend Developer</p>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
};

export default About;
