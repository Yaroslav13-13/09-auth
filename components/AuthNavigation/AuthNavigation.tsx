"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { logout as apiLogout, getMeClient } from "@/lib/api/clientApi";
import styles from "./AuthNavigation.module.css";

export default function AuthNavigation() {
  const router = useRouter();
  const { user, isAuthenticated, clearIsAuthenticated, setUser } =
    useAuthStore();

  const handleLogout = async () => {
    try {
      await apiLogout();
    } catch {
      // ignore
    } finally {
      clearIsAuthenticated();
      router.push("/sign-in");
    }
  };

  if (isAuthenticated && user) {
    return (
      <>
        <li className={styles.navigationItem}>
          <Link
            href="/profile"
            prefetch={false}
            className={styles.navigationLink}
          >
            Profile
          </Link>
        </li>
        <li className={styles.navigationItem}>
          <p className={styles.userEmail}>{user.email}</p>
          <button className={styles.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        </li>
      </>
    );
  }

  return (
    <>
      <li className={styles.navigationItem}>
        <Link
          href="/sign-in"
          prefetch={false}
          className={styles.navigationLink}
        >
          Login
        </Link>
      </li>
      <li className={styles.navigationItem}>
        <Link
          href="/sign-up"
          prefetch={false}
          className={styles.navigationLink}
        >
          Sign up
        </Link>
      </li>
    </>
  );
}
