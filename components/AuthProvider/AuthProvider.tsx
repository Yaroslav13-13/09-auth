"use client";

import React, { useEffect, useState } from "react";
import Loader from "@/components/Loader/Loader";
import { useAuthStore } from "@/lib/store/authStore";
import {
  checkSession,
  getMeClient,
  type User as ApiUser,
} from "@/lib/api/clientApi";
import type { User } from "@/types/user";

function mapApiUserToUser(apiUser: ApiUser): User {
  return {
    username: apiUser.username,
    email: apiUser.email,
    avatar: apiUser.avatar ?? "",
  };
}

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [checking, setChecking] = useState(true);
  const setUser = useAuthStore((s) => s.setUser);
  const clearAuth = useAuthStore((s) => s.clearIsAuthenticated);

  useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
      try {
        const session = await checkSession();

        if (session && (session as { success?: boolean }).success) {
          const meFromApi = await getMeClient();
          if (meFromApi && mounted) {
            setUser(mapApiUserToUser(meFromApi));
          }
        } else if (session && (session as { email?: string }).email) {
          if (mounted) {
            const partialUser: User = {
              username:
                (session as { username?: string }).username ?? "Unknown",
              email: (session as { email: string }).email,
              avatar: "",
            };
            setUser(partialUser);
          }
        } else {
          clearAuth();
        }
      } catch {
        clearAuth();
      } finally {
        if (mounted) setChecking(false);
      }
    };

    checkAuth();

    return () => {
      mounted = false;
    };
  }, [setUser, clearAuth]);

  if (checking) return <Loader />;

  return <>{children}</>;
}
