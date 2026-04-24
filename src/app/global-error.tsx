"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <main
          style={{
            display: "grid",
            placeItems: "center",
            minHeight: "100vh",
            padding: "32px",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          <div style={{ textAlign: "center", maxWidth: "480px" }}>
            <h1
              style={{
                fontSize: "24px",
                lineHeight: "32px",
                fontWeight: 600,
                marginBottom: "16px",
              }}
            >
              Application error
            </h1>
            <p
              style={{ fontSize: "14px", lineHeight: "20px", color: "#666" }}
            >
              {error.digest ? `Reference: ${error.digest}` : ""}
            </p>
            <button
              type="button"
              onClick={() => reset()}
              style={{
                marginTop: "24px",
                padding: "12px 20px",
                borderRadius: "16px",
                background: "#000",
                color: "#fff",
                border: "none",
                cursor: "pointer",
              }}
            >
              Try again
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
