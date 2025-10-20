// "use client";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useAuthStore } from "@/lib/store/authStore";
// import { logout as apiLogout, getMeClient } from "@/lib/api/clientApi";
// import styles from "./AuthNavigation.module.css";

// export default function AuthNavigation() {
//   const router = useRouter();
//   const { user, isAuthenticated, clearIsAuthenticated, setUser } =
//     useAuthStore();

//   const handleLogout = async () => {
//     try {
//       await apiLogout();
//     } catch {
//       // ignore
//     } finally {
//       clearIsAuthenticated();
//       router.push("/sign-in");
//     }
//   };

//   if (isAuthenticated && user) {
//     return (
//       <>
//         <li className={styles.navigationItem}>
//           <Link
//             href="/profile"
//             prefetch={false}
//             className={styles.navigationLink}
//           >
//             Profile
//           </Link>
//         </li>
//         <li className={styles.navigationItem}>
//           <p className={styles.userEmail}>{user.email}</p>
//           <button className={styles.logoutButton} onClick={handleLogout}>
//             Logout
//           </button>
//         </li>
//       </>
//     );
//   }

//   return (
//     <>
//       <li className={styles.navigationItem}>
//         <Link
//           href="/sign-in"
//           prefetch={false}
//           className={styles.navigationLink}
//         >
//           Login
//         </Link>
//       </li>
//       <li className={styles.navigationItem}>
//         <Link
//           href="/sign-up"
//           prefetch={false}
//           className={styles.navigationLink}
//         >
//           Sign up
//         </Link>
//       </li>
//     </>
//   );
// }

"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "../../lib/store/authStore";
import { logout } from "../../lib/api/clientApi";
import css from "./AuthNavigation.module.css";

export default function AuthNavigation() {
  const { user, isAuthenticated, clearIsAuthenticated } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    clearIsAuthenticated();
    router.push("/sign-in"); // після виходу переходимо на сторінку входу
  };

  return (
    <ul className={css.navList}>
      {isAuthenticated ? (
        <>
          <li>
            <a href="/profile" className={css.navLink}>
              Profile
            </a>
          </li>
          <li className={css.userEmail}>{user?.email}</li>
          <li>
            <button onClick={handleLogout} className={css.logoutButton}>
              Logout
            </button>
          </li>
        </>
      ) : (
        <>
          <li>
            <a href="/sign-in" className={css.navLink}>
              Sign In
            </a>
          </li>
          <li>
            <a href="/sign-up" className={css.navLink}>
              Sign Up
            </a>
          </li>
        </>
      )}
    </ul>
  );
}
