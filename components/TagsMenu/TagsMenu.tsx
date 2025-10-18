"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import css from "../Header/Header.module.css";
const tags = ["All", "Todo", "Work", "Personal", "Meeting", "Shopping"];

interface TagsMenuProps {
  isActive: boolean;
}

export default function TagsMenu({ isActive }: TagsMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleMenu = () => setOpen(!open);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div ref={menuRef} className={css.navItemWithDropdown}>
      <button
        className={`${css.navLink} ${isActive ? css.active : ""}`}
        onClick={toggleMenu}
      >
        Notes ▾
      </button>
      {open && (
        <ul className={css.dropdown}>
          {tags.map((tag) => (
            <li key={tag}>
              <Link
                href={
                  tag === "All" ? "/notes/filter/All" : `/notes/filter/${tag}`
                }
                className={css.dropdownLink}
                onClick={() => setOpen(false)}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
