"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import TagsMenu from "../TagsMenu/TagsMenu";
import AuthNavigation from "../AuthNavigation/AuthNavigation";
import { useAuthStore } from "@/lib/store/authStore";
import css from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();
  const isNotesActive = pathname.startsWith("/notes");
  const { user, isAuthenticated } = useAuthStore();

  // 🔹 Ніяких повторних getMeClient — це вже робить AuthProvider
  useEffect(() => {
    // Можна залишити пустим — просто щоб не випадково зловити warning
  }, []);

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
            <TagsMenu isActive={isNotesActive} />
          </li>

          {/* 🔹 Профіль показуємо лише якщо користувач авторизований */}
          {isAuthenticated && user && (
            <li>
              <Link
                href="/profile"
                className={pathname === "/profile" ? css.active : ""}
              >
                Profile
              </Link>
            </li>
          )}
        </ul>
      </nav>

      <div className={css.right}>
        <AuthNavigation />
      </div>
    </header>
  );
}
