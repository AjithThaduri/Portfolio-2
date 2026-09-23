import { ImageResponse } from "next/og";
import { getAllBlueprints, getBlueprint, STATUS_LABEL, TYPE_LABEL } from "@/lib/blueprints";

export const alt = "Blueprint by Ajith Thaduri";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllBlueprints().map((b) => ({ slug: b.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const b = getBlueprint(slug);
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
          <div style={{ color: "#ff9f43", fontSize: 22, letterSpacing: 4, textTransform: "uppercase" }}>
            {b ? `${TYPE_LABEL[b.type]} · ${STATUS_LABEL[b.status]}` : "Blueprint"}
          </div>
        </div>
        <div style={{ display: "flex", color: "#eceef1", fontSize: 64, lineHeight: 1.1, letterSpacing: -2, maxWidth: 1000 }}>
          {b?.title ?? "Blueprints"}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #212127",
            paddingTop: 28,
            color: "#71727c",
            fontSize: 24,
          }}
        >
          <span>Open architecture · CC BY 4.0</span>
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
