import { ImageResponse } from "next/og";

export const alt = "Ajith Thaduri — AI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#08080a",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 28, height: 2, background: "#ff9f43" }} />
          <div
            style={{
              color: "#ff9f43",
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            AI Engineer · Hyderabad, India
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#eceef1",
              fontSize: 76,
              lineHeight: 1.05,
              letterSpacing: -2.5,
            }}
          >
            I build AI systems for teams
          </div>
          <div
            style={{
              color: "#a3a4ac",
              fontSize: 76,
              lineHeight: 1.05,
              letterSpacing: -2.5,
            }}
          >
            handling sensitive data.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid #212127",
            paddingTop: 28,
            color: "#71727c",
            fontSize: 24,
          }}
        >
          <div style={{ display: "flex", gap: 40 }}>
            <span>10+ platforms</span>
            <span>3 regulated sectors</span>
          </div>
          <div style={{ display: "flex", color: "#eceef1" }}>
            <span>Ajith</span>
            <span style={{ color: "#ff9f43" }}>Thaduri</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
