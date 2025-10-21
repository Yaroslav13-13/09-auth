// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import TagsMenu from "../TagsMenu/TagsMenu";
// import AuthNavigation from "../AuthNavigation/AuthNavigation";
// import css from "./Header.module.css";

// export default function Header() {
//   const pathname = usePathname();
//   const isNotesActive = pathname.startsWith("/notes");

//   return (
//     <header className={css.header}>
//       <Link href="/" className={css.logo}>
//         NoteHub
//       </Link>

//       <nav className={css.nav}>
//         <ul className={css.navList}>
//           <li>
//             <Link href="/" className={pathname === "/" ? css.active : ""}>
//               Home
//             </Link>
//           </li>
//           <li className={css.navItemWithDropdown}>
//             <TagsMenu isActive={isNotesActive} />
//           </li>
//           <li>
//             <Link
//               href="/profile"
//               className={pathname === "/profile" ? css.active : ""}
//             >
//               Profile
//             </Link>
//           </li>
//         </ul>
//       </nav>

//       {/* Праворуч */}
//       <div className={css.right}>
//         <AuthNavigation />
//       </div>
//     </header>
//   );
// }

// "use client";

// import { useEffect } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import TagsMenu from "../TagsMenu/TagsMenu";
// import AuthNavigation from "../AuthNavigation/AuthNavigation";
// import { useAuthStore } from "../../lib/store/authStore";
// import { getMeClient } from "../../lib/api/clientApi";
// import css from "./Header.module.css";

// export default function Header() {
//   const pathname = usePathname();
//   const isNotesActive = pathname.startsWith("/notes");
//   const { user, isAuthenticated, setUser } = useAuthStore();

//   // Завантажуємо користувача при першому рендері
//   useEffect(() => {
//     if (!isAuthenticated && !user) {
//       getMeClient().then((me) => {
//         if (me) setUser(me);
//       });
//     }
//   }, [isAuthenticated, user, setUser]);

//   return (
//     <header className={css.header}>
//       {/* Логотип */}
//       <Link href="/" className={css.logo}>
//         NoteHub
//       </Link>

//       {/* Центр */}
//       <nav className={css.nav}>
//         <ul className={css.navList}>
//           <li>
//             <Link href="/" className={pathname === "/" ? css.active : ""}>
//               Home
//             </Link>
//           </li>
//           <li className={css.navItemWithDropdown}>
//             <TagsMenu isActive={isNotesActive} />
//           </li>
//           <li>
//             <Link
//               href="/profile"
//               className={pathname === "/profile" ? css.active : ""}
//             >
//               Profile
//             </Link>
//           </li>
//         </ul>
//       </nav>

//       {/* Праворуч */}
//       <div className={css.right}>
//         <AuthNavigation />
//       </div>
//     </header>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import TagsMenu from "../TagsMenu/TagsMenu";
import AuthNavigation from "../AuthNavigation/AuthNavigation";
import { useAuthStore } from "../../lib/store/authStore";
import { getMeClient } from "../../lib/api/clientApi";
import css from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();
  const isNotesActive = pathname.startsWith("/notes");
  const { user, isAuthenticated, setUser } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated && !user) {
      getMeClient()
        .then((me) => {
          if (me) setUser(me);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, user, setUser]);

  // Чекаємо поки дані підтягуються
  if (loading) return null;

  return (
    <header className={css.header}>
      {/* Логотип */}
      <Link href="/" className={css.logo}>
        NoteHub
      </Link>

      {/* Центр */}
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
          <li>
            <Link
              href="/profile"
              className={pathname === "/profile" ? css.active : ""}
            >
              Profile
            </Link>
          </li>
        </ul>
      </nav>

      {/* Праворуч */}
      <div className={css.right}>
        <AuthNavigation />
      </div>
    </header>
  );
}
