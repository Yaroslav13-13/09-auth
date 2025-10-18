import { ReactNode } from "react";
import css from "./NotesLayout.module.css";

export default function FilterLayout({
  children,
  sidebar,
}: {
  children: ReactNode;
  sidebar: ReactNode;
}) {
  return (
    <div className={css.container}>
      <aside>{sidebar}</aside>
      <main className={css.main}>{children}</main>
    </div>
  );
}
