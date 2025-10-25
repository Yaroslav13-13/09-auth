"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/api/clientApi"; // ✅ правильний logout із API
import { useAuthStore } from "@/lib/store/authStore";
import css from "./AuthNavigation.module.css";

export default function AuthNavigation() {
  const router = useRouter();
  const { user, isAuthenticated, clearIsAuthenticated } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout(); // виклик до API
      clearIsAuthenticated(); // очищення стану у Zustand
      router.push("/sign-in"); // редірект
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <ul className={css.navigationList}>
      {user && isAuthenticated ? (
        <>
          <li className={css.navigationItem}>
            <p className={css.userName}>{user.username || user.email}</p>
          </li>

          <li className={css.navigationItem}>
            <Link href="/profile" className={css.logoutButton}>
              Profile
            </Link>
          </li>

          <li className={css.navigationItem}>
            <button onClick={handleLogout} className={css.logoutButton}>
              Log out
            </button>
          </li>
        </>
      ) : (
        <>
          <li className={css.navigationItem}>
            <Link href="/sign-in" className={css.logoutButton}>
              Sign In
            </Link>
          </li>

          <li className={css.navigationItem}>
            <Link href="/sign-up" className={css.logoutButton}>
              Sign Up
            </Link>
          </li>
        </>
      )}
    </ul>
  );
}
