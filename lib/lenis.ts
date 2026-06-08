// Shared handle to the active Lenis instance so feature components (e.g. the
// gallery lightbox) can pause/resume smooth scroll without prop-drilling.
import type Lenis from "lenis";

let active: Lenis | null = null;

export function setLenis(l: Lenis | null) {
  active = l;
}
export function getLenis(): Lenis | null {
  return active;
}
