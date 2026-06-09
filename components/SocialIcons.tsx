import { waLink, INSTAGRAM_URL, TIKTOK_URL } from "@/lib/site";

// Shared inline SVGs so the social links render consistently in the header,
// the Kilas Momen band, and the footer without an icon-font dependency.

export function IgIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden focusable="false">
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function TiktokIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden focusable="false">
      <path
        d="M13.2 3h2.2c.2 1.7 1.2 3.1 2.9 3.6.6.2 1.2.3 1.8.3v2.3c-1.2 0-2.4-.3-3.4-.9v5.9c0 3-2.4 5.5-5.4 5.5S6 17.2 6 14.3s2.4-5.4 5.4-5.4c.3 0 .6 0 .8.1v2.4c-.3-.1-.5-.1-.8-.1-1.7 0-3.1 1.4-3.1 3.1s1.4 3.1 3.1 3.1 3.1-1.4 3.1-3.1V3z"
        fill="currentColor"
      />
    </svg>
  );
}

export function WaIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden focusable="false">
      <path
        d="M12 3.2a8.8 8.8 0 0 0-7.5 13.4L3.2 20.8l4.4-1.3A8.8 8.8 0 1 0 12 3.2Zm0 1.8a7 7 0 0 1 5.9 10.8l-.3.4.7 2.4-2.5-.7-.4.2A7 7 0 1 1 12 5Zm-3 3.2c-.2 0-.5.1-.7.4-.3.3-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.7 2.8 4.3 3.8 2.1.8 2.5.7 3 .6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.3-.2-.6-.3l-1.5-.7c-.2-.1-.4-.1-.5.1l-.6.8c-.1.1-.3.2-.5.1-.3-.1-1.1-.4-2.1-1.3-.8-.7-1.3-1.5-1.4-1.8-.1-.2 0-.4.1-.5l.4-.5c.1-.2.2-.3.3-.5 0-.2 0-.3 0-.5l-.7-1.6c-.2-.4-.3-.4-.5-.4h-.2Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** The three social links, used in the header and footer. */
export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`socials${className ? ` ${className}` : ""}`}>
      <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram Tetra Photobooth">
        <IgIcon />
      </a>
      <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" aria-label="TikTok Tetra Photobooth">
        <TiktokIcon />
      </a>
      <a href={waLink()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Tetra Photobooth">
        <WaIcon />
      </a>
    </div>
  );
}
