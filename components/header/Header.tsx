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
						<h2>MindMate</h2>
					</div>
				</Pass>
				<div className={styles.action}>
					<div className={styles.actionButton} btn-action="player">
            About
					</div>
					<div className={styles.actionButton} btn-action="player">
						Resources
					</div>
					<div className={styles.actionButton} btn-action="player">
						Connect
						<span>→</span>
					</div>
				</div>
			</div>
		</div>
	);
}
