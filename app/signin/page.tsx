"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiHome } from "react-icons/fi";
import css from "./SignIn.module.css";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Sign In feature coming soon 🚀");
  };

  return (
    <main className={css.container}>
      <div className={css.card}>
        {/* Go Home кнопка */}
        <div className={css.goHomeContainer}>
          <Link href="/" className={css.goHomeButton}>
            <FiHome size={20} className={css.icon} />
            Go Home
          </Link>
        </div>
        {/* Текст */}
        <div className={css.headerText}>
          <h1>Welcome</h1>
          <p>Sign in to your account or create a new one</p>
        </div>

        {/* Форма */}
        <form className={css.form} onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={css.input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={css.input}
            required
          />
          <button type="submit" className={css.button}>
            Sign In
          </button>
        </form>

        <p className={css.hint}>
          Don’t have an account? <Link href="#">Sign up</Link>
        </p>
      </div>
    </main>
  );
}
