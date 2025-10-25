"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { checkSession, getMe } from "@/lib/api/clientApi";
import Loader from "@/components/Loader/Loader";
import type { User } from "@/types/user";

/**
 * AuthProvider — глобальний компонент, який перевіряє,
 * чи користувач авторизований і зберігає його у Zustand.
 * Показує Loader під час перевірки.
 */
export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setUser, clearIsAuthenticated } = useAuthStore();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      try {
        // 🔹 1. Перевіряємо чи є активна сесія (куки токенів)
        const isValid = await checkSession();

        if (isValid) {
          // 🔹 2. Якщо сесія дійсна — отримуємо дані користувача
          const user: User = await getMe();

          setUser({
            ...user,
            avatar: user.avatar ?? "",
          });
        } else {
          // 🔸 Якщо сесії немає — очищаємо стан
          clearIsAuthenticated();
        }
      } catch (error) {
        console.error("AuthProvider verifySession error:", error);
        clearIsAuthenticated();
      } finally {
        setIsChecking(false);
      }
    };

    verifySession();
  }, [setUser, clearIsAuthenticated]);

  // 🔹 Loader під час перевірки
  if (isChecking) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Loader />
      </div>
    );
  }

  // 🔹 Повертаємо дітей після успішної перевірки
  return <>{children}</>;
}
