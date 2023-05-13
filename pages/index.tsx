/* eslint-disable react/no-unescaped-entities */
import React from "react";
import styles from "@/styles/Home.module.css";
import { RemoveCurtain } from "@/components/curtain/Curtain";
import Head from "next/head";

const Goals = () => {
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
        <title>DinoHacks — Goals</title>
      </Head>

      <main id="homePage">
      </main>
    </>
  );
};

export default Goals;