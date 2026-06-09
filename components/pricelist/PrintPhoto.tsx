/* eslint-disable @next/next/no-img-element */

// White-framed "print card" photo with a mobile -sm.jpg source. Matches the
// site's print aesthetic; styling/tilt is applied by the parent via className.
export default function PrintPhoto({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const sm = src.replace(/\.jpg$/, "-sm.jpg");
  return (
    <span className={`pl-photo-card${className ? " " + className : ""}`}>
      <picture className="rsp">
        <source media="(max-width: 768px)" srcSet={sm} />
        <img src={src} alt={alt} loading="lazy" decoding="async" />
      </picture>
    </span>
  );
}
