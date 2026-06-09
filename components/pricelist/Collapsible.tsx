"use client";

import { useState } from "react";

// Self-contained accordion for package extras (flow, S&K, catatan).
// Collapsed by default to keep the mobile page short and scannable.
export default function Collapsible({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`pl-acc${open ? " open" : ""}`}>
      <button
        type="button"
        className="pl-acc-head"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{title}</span>
        <svg
          className="pl-acc-ico"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div className="pl-acc-body">
        <ul>
          {items.map((it) => (
            <li key={it}>{it}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
