"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import css from "./AuthNavigation.module.css";

export default function AuthNavigation() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    router.push("/sign-in");
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
