import styles from "@/app/about/About.module.css";
import { FiEdit, FiFolder, FiMoon } from "react-icons/fi";

export default function About() {
  return (
    <main className={styles.container}>
      <section className={styles.hero}>
        <h1>About NoteHub</h1>
        <p>
          NoteHub is a simple and intuitive app for creating, saving, and
          organizing notes. Our goal is to help you structure your ideas and
          work more productively.
        </p>
      </section>

      <section className={styles.card}>
        <h2>Features</h2>
        <ul>
          <li>
            <FiEdit className={styles.icon} /> Create and edit notes
          </li>
          <li>
            <FiFolder className={styles.icon} /> Organize and quickly search
          </li>
          <li>
            <FiMoon className={styles.icon} /> Light and dark theme
          </li>
        </ul>
      </section>

      <section className={styles.contact}>
        <h2>Contact</h2>
        <p>
          Have questions or ideas for improvement? <br />
          Write to us at{" "}
          <a href="mailto:pronjaroslav@gmail.com">pronjaroslav@gmail.com</a>
        </p>
      </section>
    </main>
  );
}
