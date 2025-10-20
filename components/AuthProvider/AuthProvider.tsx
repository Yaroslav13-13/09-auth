"use client";
import React, { useEffect, useState } from "react";
import Loader from "@/components/Loader/Loader";
import { useAuthStore } from "@/lib/store/authStore";
import { checkSession, getMeClient } from "@/lib/api/clientApi";
import { usePathname, useRouter } from "next/navigation";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [checking, setChecking] = useState(true);
  const setUser = useAuthStore((s) => s.setUser);
  const clearAuth = useAuthStore((s) => s.clearIsAuthenticated);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const session = await checkSession();
        // If session returns user object or success true, fetch me
        if (session && (session as any).success === true) {
          const me = await getMeClient();
          if (mounted) setUser(me);
        } else if (session && (session as any).email) {
          if (mounted) setUser(session as any);
        } else {
          // no session
          clearAuth();
        }
      } catch (err) {
        clearAuth();
      } finally {
        if (mounted) setChecking(false);
      }
    })();
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // While checking, show loader (prevents flash)
  if (checking) return <Loader />;

  return <>{children}</>;
}
