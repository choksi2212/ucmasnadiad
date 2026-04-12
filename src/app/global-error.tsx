"use client";

import { useEffect } from "react";

/**
 * Root error boundary — must include html/body. Same privacy rules as error.tsx.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", margin: 0, padding: 24 }}>
        <h1 style={{ fontSize: "1.25rem", marginBottom: 8 }}>Something went wrong</h1>
        <p style={{ color: "#64748B", marginBottom: 24, maxWidth: 420 }}>
          Please try again. If the problem continues, visit the site later or reach us by
          phone.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          style={{
            padding: "12px 24px",
            borderRadius: 9999,
            border: "none",
            background: "#C8102E",
            color: "#fff",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
