"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);

    const message = error?.message?.toLowerCase() ?? "";
    const isChunkError =
      message.includes("loading chunk") ||
      message.includes("chunkloaderror") ||
      message.includes("failed to fetch dynamically imported module") ||
      message.includes("importing a module script failed");

    if (isChunkError) {
      window.location.reload();
    }
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#f5f5f4",
          color: "#1c1917",
          fontFamily: "Arial, sans-serif",
          padding: "24px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "520px" }}>
          <h1 style={{ fontSize: "28px", marginBottom: "12px" }}>
            Refreshing the site…
          </h1>
          <p style={{ marginBottom: "20px", lineHeight: 1.6 }}>
            We detected an outdated page version. Please wait a moment or tap
            the button below.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: "12px 18px",
              border: "1px solid #d6d3d1",
              background: "#ffffff",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Reload page
          </button>
          <button
            onClick={() => reset()}
            style={{
              marginLeft: "12px",
              padding: "12px 18px",
              border: "1px solid #d6d3d1",
              background: "#ffffff",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}