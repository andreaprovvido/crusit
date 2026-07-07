import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

type OgImageInput = {
  /** Small uppercase label above the title. */
  eyebrow?: string;
  /** Main headline. */
  title: string;
  /** Secondary line under the title (e.g. a location). */
  subtitle?: string;
};

/**
 * Shared Open Graph / Twitter image renderer used by the `opengraph-image`
 * and `twitter-image` file conventions. Uses only flexbox and the subset of
 * CSS supported by Satori (the engine behind `next/og`).
 */
export function renderOgImage({ eyebrow, title, subtitle }: OgImageInput) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "linear-gradient(135deg, #09090b 0%, #0b1220 55%, #062a24 100%)",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              background: "linear-gradient(135deg, #34d399, #22d3ee)",
              display: "flex",
            }}
          />
          <span
            style={{
              fontSize: 30,
              fontWeight: 700,
              letterSpacing: "0.02em",
              color: "#a7f3d0",
            }}
          >
            Crusit
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {eyebrow ? (
            <span
              style={{
                fontSize: 26,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#6ee7b7",
              }}
            >
              {eyebrow}
            </span>
          ) : null}
          <span
            style={{
              fontSize: title.length > 48 ? 66 : 82,
              fontWeight: 800,
              lineHeight: 1.05,
              color: "#ffffff",
            }}
          >
            {title}
          </span>
          {subtitle ? (
            <span style={{ fontSize: 34, color: "#a1a1aa" }}>{subtitle}</span>
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: 26, color: "#71717a" }}>www.crusit.com</span>
          <div style={{ display: "flex", height: 12, width: 260 }}>
            <div style={{ flex: 1, background: "#ef4444" }} />
            <div style={{ flex: 1, background: "#f59e0b" }} />
            <div style={{ flex: 1, background: "#facc15" }} />
            <div style={{ flex: 1, background: "#22c55e" }} />
            <div style={{ flex: 1, background: "#3b82f6" }} />
            <div style={{ flex: 1, background: "#a855f7" }} />
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
