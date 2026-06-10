"use client";

import { useState } from "react";

function Check() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 12.5l4 4 10-10"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// "Yang kamu dapat" list. On desktop it's shown inline (CSS forces it open and
// hides the toggle); on mobile it collapses behind a tap toggle so each package
// fits one screen and the price + CTA stay the focus.
export default function FeatsDisclosure({ items }: { items: string[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`pl-feats${open ? " open" : ""}`}>
      <button
        type="button"
        className="pl-feats-toggle"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="pl-includes-title">Yang kamu dapat</span>
        <svg className="pl-feats-ico" width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div className="pl-feats-body">
        <ul className="pl-featlist">
          {items.map((item) => (
            <li className="pl-feat" key={item}>
              <span className="pl-feat-tick">
                <Check />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
