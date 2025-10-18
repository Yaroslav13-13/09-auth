"use client";

import { useEffect } from "react";
import css from "./Error.module.css";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={css.container}>
      <h2 className={css.heading}>Oops! An error occurred 🚨</h2>
      <p className={css.message}>{error.message}</p>
      <button onClick={reset} className={css.button}>
        Спробувати знову
      </button>
    </div>
  );
}
