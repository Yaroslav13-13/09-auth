import Link from "next/link";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import css from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.top}>
        <div className={css.section}>
          <h3 className={css.logo}>NoteHub</h3>
          <p className={css.soctext}>Developer: Yaroslav Pron</p>
        </div>

        <div className={css.section}>
          <h4>Quick Links</h4>
          <ul className={css.links}>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/notes/filter/All">Notes</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
          </ul>
        </div>

        <div className={css.section}>
          <h4>Follow Us</h4>
          <div className={css.socials}>
            <Link
              href="https://www.linkedin.com/in/yaroslav-pron-270b26329/"
              aria-label="LinkedIn"
              target="_blank"
            >
              <FaLinkedin />
            </Link>
            <Link
              href="https://github.com/Yaroslav13-13"
              aria-label="GitHub"
              target="_blank"
            >
              <FaGithub />
            </Link>
            <Link
              href="https://instagram.com"
              aria-label="Instagram"
              target="_blank"
            >
              <FaInstagram />
            </Link>
          </div>
        </div>
      </div>

      <div className={css.bottom}>
        <p>© 2025 NoteHub. All rights reserved.</p>
      </div>
    </footer>
  );
}
