/**
 * Official XRPL brand mark (circle with interlocking chevrons forming an X).
 *
 * Path extracted from the XRPL Commons official logo SVG hosted on
 * https://www.xrpl-commons.org — only the circular mark, not the wordmark.
 * Uses `currentColor` so it picks up whatever Tailwind text colour the
 * parent sets (text-xrpl for brand violet, text-gray-500 for muted, etc).
 */
export default function XRPLMark({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 190 190"
      aria-label="XRPL"
      role="img"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M94.7 0C42.4 0 0 42.4 0 94.7C0 147 42.4 189.4 94.7 189.4C147 189.4 189.4 147 189.4 94.7C189.4 42.4 147 0 94.7 0ZM128.2 136.94L108.56 116.41C104.93 112.68 100.31 110.61 94.71 110.61C89.11 110.61 84.49 112.67 80.86 116.41L61.21 136.94H45.2L72.31 109.83C78.3 103.84 86.16 100.01 94.71 100.01C103.26 100.01 111.12 103.84 117.11 109.83L144.22 136.94H128.21H128.2ZM117.1 79.57C111.11 85.56 103.25 89.39 94.7 89.39C86.15 89.39 78.29 85.56 72.3 79.57L45.19 52.46H61.2L80.85 72.99C84.48 76.72 89.1 78.79 94.7 78.79C100.3 78.79 104.92 76.73 108.55 72.99L128.19 52.46H144.2L117.09 79.57H117.1Z"
        fill="currentColor"
      />
    </svg>
  );
}
