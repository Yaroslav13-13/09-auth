// "use client";

// import Link from "next/link";
// import { useAuthStore } from "../../lib/store/authStore";
// import css from "./AuthNavigation.module.css";

// export default function AuthNavigation() {
//   const { user, isAuthenticated, logout } = useAuthStore();

//   const handleLogout = async () => {
//     await logout();
//     window.location.href = "/sign-in";
//   };

//   return (
//     <ul className={css.navigationList}>
//       {isAuthenticated && user ? (
//         <>
//           <li className={css.navigationItem}>
//             <Link
//               href="/profile"
//               prefetch={false}
//               className={css.navigationLink}
//             >
//               Profile
//             </Link>
//           </li>
//           <li className={css.navigationItem}>
//             <p className={css.userName}>{user.username}</p>
//             <button onClick={handleLogout} className={css.logoutButton}>
//               Log out
//             </button>
//           </li>
//         </>
//       ) : (
//         <>
//           <li className={css.navigationItem}>
//             <Link
//               href="/sign-in"
//               prefetch={false}
//               className={css.navigationLink}
//             >
//               Login
//             </Link>
//           </li>
//           <li className={css.navigationItem}>
//             <Link
//               href="/sign-up"
//               prefetch={false}
//               className={css.navigationLink}
//             >
//               Sign up
//             </Link>
//           </li>
//         </>
//       )}
//     </ul>
//   );
// }

// "use client";

// import { useAuthStore } from "../../lib/store/authStore";
// import css from "./AuthNavigation.module.css";

// export default function AuthNavigation() {
//   const { user, isAuthenticated, logout } = useAuthStore();

//   const handleLogout = async () => {
//     await logout();
//     window.location.href = "/sign-in";
//   };

//   // Покажемо заглушку або просто нічого не будемо показувати, поки стор не оновлений
//   if (!user && !isAuthenticated) return null;

//   return (
//     <ul className={css.navigationList}>
//       {user && isAuthenticated && (
//         <li className={css.navigationItem}>
//           <p className={css.userName}>{user.username}</p>
//           <button onClick={handleLogout} className={css.logoutButton}>
//             Log out
//           </button>
//         </li>
//       )}
//     </ul>
//   );
// }

"use client";

import { useAuthStore } from "../../lib/store/authStore";
import css from "./AuthNavigation.module.css";

export default function AuthNavigation() {
  const { user, isAuthenticated, logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    window.location.href = "/sign-in";
  };

  if (!user || !isAuthenticated) return null;

  return (
    <ul className={css.navigationList}>
      <li className={css.navigationItem}>
        <p className={css.userName}>{user.username}</p>
        <button onClick={handleLogout} className={css.logoutButton}>
          Log out
        </button>
      </li>
    </ul>
  );
}
