import styles from "./Header.module.css";
import Pass from "@/components/pass/Pass";
import Image from "next/image";

export default function Header() {
	return (
		<div className={styles.header}>
			<div className={styles.inner}>
				<Pass href="/">
					<div className={styles.org}>
						<Image
							src="/images/logo.png"
							alt="Logo"
							width={400}
							height={100}
							quality={100}
							priority
							className={styles.logo}
						/>
						<h2>BrainByte</h2>
					</div>
				</Pass>
				<div className={styles.action}>
					<div className={styles.actionButton}>
						<Pass href="/">
							<h3>Home</h3>
						</Pass>
					</div>
					<div className={styles.actionButton}>
						<Pass href="/about">
							<h3>About</h3>
						</Pass>
					</div>
					<div className={styles.actionButton}>
						<Pass href="/app">
							<h3>Start Learning</h3>
						</Pass>
						<span className={styles.arrow}>→</span>
					</div>
				</div>
			</div>
		</div>
	);
}
