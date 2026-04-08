export function UCCLogo({ className = "", showTagline = true }: { className?: string; showTagline?: boolean }) {
  return (
    <svg
      viewBox="0 0 140 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="UCC Mortgage Co. Est. 1974"
    >
      {/* U - Dark Navy */}
      <path
        d="M4 6v18c0 8 5 12 12 12s12-4 12-12V6h-6v18c0 4-2 6-6 6s-6-2-6-6V6H4z"
        fill="#2e5f92"
      />
      {/* First C - Teal */}
      <path
        d="M50 6c-10 0-16 7-16 15s6 15 16 15c5 0 9-2 12-5l-4-4c-2 2-5 3-8 3-6 0-10-4-10-9s4-9 10-9c3 0 6 1 8 3l4-4c-3-3-7-5-12-5z"
        fill="#006f7f"
      />
      {/* Second C - Light Blue */}
      <path
        d="M86 6c-10 0-16 7-16 15s6 15 16 15c5 0 9-2 12-5l-4-4c-2 2-5 3-8 3-6 0-10-4-10-9s4-9 10-9c3 0 6 1 8 3l4-4c-3-3-7-5-12-5z"
        fill="#27aae1"
      />
      {showTagline && (
        <text
          x="4"
          y="47"
          fill="#f0f4f5"
          fontFamily="var(--font-open-sans), Open Sans, sans-serif"
          fontWeight="700"
          fontSize="9"
          letterSpacing="0.02em"
        >
          Mortgage Co. Est. 1974
        </text>
      )}
    </svg>
  );
}

export function UCCLogoCompact({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="UCC"
    >
      {/* U - Dark Navy */}
      <path
        d="M4 4v16c0 7 4.5 10.5 10.5 10.5S25 27 25 20V4h-5v16c0 3.5-1.75 5.25-5.25 5.25S9.5 23.5 9.5 20V4H4z"
        fill="#2e5f92"
      />
      {/* First C - Teal */}
      <path
        d="M44 4c-8.75 0-14 6.125-14 13.125S35.25 30.25 44 30.25c4.375 0 7.875-1.75 10.5-4.375l-3.5-3.5c-1.75 1.75-4.375 2.625-7 2.625-5.25 0-8.75-3.5-8.75-7.875S38.75 9.25 44 9.25c2.625 0 5.25.875 7 2.625l3.5-3.5C51.875 5.75 48.375 4 44 4z"
        fill="#006f7f"
      />
      {/* Second C - Light Blue */}
      <path
        d="M75.5 4c-8.75 0-14 6.125-14 13.125s5.25 13.125 14 13.125c4.375 0 7.875-1.75 10.5-4.375l-3.5-3.5c-1.75 1.75-4.375 2.625-7 2.625-5.25 0-8.75-3.5-8.75-7.875s3.5-7.875 8.75-7.875c2.625 0 5.25.875 7 2.625l3.5-3.5C83.375 5.75 79.875 4 75.5 4z"
        fill="#27aae1"
      />
    </svg>
  );
}
