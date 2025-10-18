"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import TagsMenu from "../TagsMenu/TagsMenu";
import css from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();
  const isNotesActive = pathname.startsWith("/notes");

  return (
    <header className={css.header}>
      <Link href="/" className={css.logo}>
        NoteHub
      </Link>

      <nav className={css.nav}>
        <ul className={css.navList}>
          <li>
            <Link href="/" className={pathname === "/" ? css.active : ""}>
              Home
            </Link>
          </li>
          <li className={css.navItemWithDropdown}>
            {/* Тепер кнопка Notes + TagsMenu */}
            <TagsMenu isActive={isNotesActive} />
          </li>
        </ul>
      </nav>

      <Link href="/signin" className={css.signIn}>
        Sign In
      </Link>
    </header>
  );
}
