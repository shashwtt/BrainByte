import React from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "@/components/header/Header";
import Lenis from "@studio-freight/lenis";
import Curtain from "@/components/curtain/Curtain";
import Footer from "@/components/footer/Footer";

export default function App({ Component, pageProps }: AppProps) {
  const lenisRef = React.useRef<Lenis | null>(null);

  React.useEffect(() => {
    lenisRef.current = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: any) {
      if (lenisRef.current) {
        lenisRef.current.raf(time);
        requestAnimationFrame(raf);
      }
    }

    requestAnimationFrame(raf);
    const scroll = document.getElementById("scroll");
    window.addEventListener("scroll", () => {
      let scrollPerc =
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
        100;
      scroll!.style.setProperty("--scroll", `${scrollPerc}%`);
    });
  }, []);

  return (
    <React.StrictMode>
      <Curtain />
      <div id="appWrapper">
        <Header />
        <div className="scrollBar" id="scroll"></div>
        <Component {...pageProps} />
        <Footer />
      </div>
    </React.StrictMode>
  );
}
