import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <>
      <div className={styles.lane}>
        <div className={styles.inner}>
          <>
            <p className={styles.proj}>©️ {new Date().getFullYear()} DinoHacks</p>
          </>
          <>
            <ul>
              <li>
                <a
                  href="http://github.com/shashwtt/DinoHacks-2023"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Project Repo
                </a>
              </li>
              <li>
                <a
                  href="http://github.com/shashwtt"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </a>
              </li>
              <li>
                <a href="mailto:shashwat5590@gmail.com">Email</a>
              </li>
            </ul>
          </>
        </div>
      </div>
    </>
  );
}
