"use client";

import { useEffect } from "react";

/**
 * Route-level error UI: never surfaces stack traces or internal messages in production.
 */
export default function Error({
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
    <div className="min-h-[50vh] flex flex-col items-center justify-center px-6 py-20 bg-[#FAFAFA]">
      <h1 className="text-xl font-semibold text-[#0B0F19] font-heading mb-2">
        Something went wrong
      </h1>
      <p className="text-sm text-[#64748B] text-center max-w-md mb-6">
        Please try again. If the problem continues, contact us by phone or email from the
        footer on the home page.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="px-6 py-3 rounded-full bg-[#C8102E] text-white text-sm font-semibold hover:bg-[#9B0C23] transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
