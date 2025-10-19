"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

interface NotesLayoutProps {
  children: ReactNode;
}

export default function NotesLayout({ children }: NotesLayoutProps) {
  const router = useRouter();

  useEffect(() => {
    if (window.location.pathname === "/notes") {
      router.replace("/notes/filter/All");
    }
  }, [router]);

  return <div>{children}</div>;
}
