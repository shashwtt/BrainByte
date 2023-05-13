/* eslint-disable react/no-unescaped-entities */
import React from "react";
import styles from "@/styles/Home.module.css";
import { RemoveCurtain } from "@/components/curtain/Curtain";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import type { LottiePlayer } from "lottie-web";

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
				</div>
			</main>
		</>
	);
};

export default About;
