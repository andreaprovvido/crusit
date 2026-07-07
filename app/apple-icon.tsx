import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="132" height="132"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#A66BFF"/><stop offset="0.55" stop-color="#5B8DEF"/><stop offset="1" stop-color="#27C4FF"/></linearGradient><mask id="m"><path d="M365.1 127 A126 126 0 1 0 365.1 253" fill="none" stroke="white" stroke-width="68" stroke-linecap="round"/><path d="M176 328.6 A160 160 0 0 0 336 328.6 C322 400 272 470 256 486 C240 470 190 400 176 328.6 Z" fill="white"/></mask></defs><rect x="0" y="0" width="512" height="512" fill="url(#g)" mask="url(#m)"/></svg>`;

export default function AppleIcon() {
  const dataUri = `data:image/svg+xml;base64,${Buffer.from(logoSvg).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#09090b",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={dataUri} width={132} height={132} alt="Crusit" />
      </div>
    ),
    { ...size }
  );
}
