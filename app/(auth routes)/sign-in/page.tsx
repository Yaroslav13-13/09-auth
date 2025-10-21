// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { login } from "@/lib/api/clientApi";
// import css from "../sign-up/SignUp.module.css";

// export default function SignInPage() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await login(email, password);
//       router.push("/profile");
//     } catch (err: any) {
//       setError(err.payload?.message || "Login failed");
//     }
//   };

//   return (
//     <main className={css.mainContent}>
//       <h1 className={css.formTitle}>Sign in</h1>
//       <form className={css.form} onSubmit={handleSubmit}>
//         <div className={css.formGroup}>
//           <label htmlFor="email">Email</label>
//           <input
//             id="email"
//             type="email"
//             name="email"
//             className={css.input}
//             required
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>
//         <div className={css.formGroup}>
//           <label htmlFor="password">Password</label>
//           <input
//             id="password"
//             type="password"
//             name="password"
//             className={css.input}
//             required
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//         <div className={css.actions}>
//           <button type="submit" className={css.submitButton}>
//             Log in
//           </button>
//         </div>
//         {error && <p className={css.error}>{error}</p>}
//       </form>
//     </main>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore"; // додати
import css from "../sign-up/SignUp.module.css";

export default function SignInPage() {
  const router = useRouter();
  const { setUser } = useAuthStore(); // <-- беремо setUser
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await login(email, password); // отримуємо користувача
      if (user) {
        setUser(user); // <-- ВАЖЛИВО: оновлюємо Zustand
        router.push("/profile");
      } else {
        setError("Login failed");
      }
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign in</h1>
      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>
        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}
