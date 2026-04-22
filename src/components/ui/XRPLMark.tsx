/**
 * XRPL "X" brand mark — two diagonal strokes forming an X, rendered in the
 * XRPL violet brand colour via `text-xrpl` (see tailwind.config).
 *
 * Used in place of the purple-circle emoji 🟣 for a cleaner visual identity
 * consistent with the rest of the XRPL branding in the app.
 */
export default function XRPLMark({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-label="XRPL"
      role="img"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 5 L19 19" />
      <path d="M19 5 L5 19" />
    </svg>
  );
}
