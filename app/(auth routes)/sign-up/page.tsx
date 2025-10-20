"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { register as apiRegister, getMeClient } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await apiRegister(email, password);
      const me = await getMeClient();
      setUser(me);
      router.push("/profile");
    } catch (err: any) {
      setError(err?.payload?.message || err?.message || "Registration failed");
    }
  };

  return (
    <main style={{ textAlign: "center", marginTop: 40 }}>
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit} style={{ marginTop: 16 }}>
        <div style={{ marginBottom: 8 }}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
        </div>
        <div style={{ marginBottom: 8 }}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </div>
        <div style={{ marginTop: 12 }}>
          <button type="submit">Register</button>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </main>
  );
}
