"use client";

import Link from "next/link";
import { useAuthStore } from "../../lib/store/authStore";
import css from "./AuthNavigation.module.css";

export default function AuthNavigation() {
  const { user, isAuthenticated, logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    window.location.href = "/sign-in";
  };

  return (
    <ul className={css.navigationList}>
      {user && isAuthenticated ? (
        <li className={css.navigationItem}>
          <p className={css.userName}>{user.username}</p>
          <button onClick={handleLogout} className={css.logoutButton}>
            Log out
          </button>
        </li>
      ) : (
        <>
          <li>
            <Link href="/sign-in" className={css.logoutButton}>
              Sign In
            </Link>
          </li>
          <li>
            <Link href="/sign-up" className={css.logoutButton}>
              Sign Up
            </Link>
          </li>
        </>
      )}
    </ul>
  );
}
