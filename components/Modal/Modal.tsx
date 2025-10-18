"use client";
import React, { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  // Закриття модалки по Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return createPortal(
    <div className={css.overlay} onClick={onClose}>
      <div
        className={css.modal}
        onClick={(e) => e.stopPropagation()} // Щоб клік по контенту не закривав
      >
        {children}
      </div>
    </div>,
    document.body
  );
}
