import Link from "next/link";
import css from "./SidebarNotes.module.css";

const tags = ["All", "Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function SidebarNotes() {
  return (
    <aside className={css.sidebar}>
      <nav>
        <ul className={css.menuList}>
          {tags.map((tag) => (
            <li key={tag}>
              <Link href={`/notes/filter/${tag}`}>{tag}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
