import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Abdulhammed Mustapha — Senior Frontend Engineer"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#09090b",
          backgroundImage:
            "radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.07) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(255, 255, 255, 0.07) 2%, transparent 0%)",
          backgroundSize: "100px 100px",
          padding: "64px",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Top bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                backgroundColor: "#27272a",
                border: "1px solid rgba(255,255,255,0.15)",
                padding: "8px 16px",
                borderRadius: "8px",
                fontSize: "18px",
                fontWeight: 700,
                fontFamily: "monospace",
              }}
            >
              AM
            </div>
            <span
              style={{
                color: "#3b82f6",
                fontSize: "16px",
                fontFamily: "monospace",
                fontWeight: 600,
                letterSpacing: "1px",
              }}
            >
              {"// SENIOR FRONTEND ENGINEER"}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "14px",
              color: "#a1a1aa",
              fontFamily: "monospace",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "9999px",
                backgroundColor: "#10b981",
              }}
            />
            <span>AVAILABLE FOR PRODUCTION ROLES</span>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <h1
            style={{
              fontSize: "64px",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            Abdulhammed Mustapha
          </h1>
          <p
            style={{
              fontSize: "26px",
              color: "#d4d4d8",
              maxWidth: "850px",
              lineHeight: 1.35,
              margin: 0,
            }}
          >
            Building high-performance React architectures, type-safe TypeScript systems, and AI-native web applications.
          </p>
        </div>

        {/* Bottom Tags */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: "24px",
          }}
        >
          <div style={{ display: "flex", gap: "10px" }}>
            {["Next.js 14/15", "TypeScript", "React 19", "Tailwind CSS", "Supabase", "OpenAI GPT-4o"].map(
              (tag) => (
                <div
                  key={tag}
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    padding: "6px 14px",
                    borderRadius: "8px",
                    fontSize: "14px",
                    fontFamily: "monospace",
                    color: "#e4e4e7",
                  }}
                >
                  {tag}
                </div>
              )
            )}
          </div>

          <span
            style={{
              color: "#71717a",
              fontSize: "14px",
              fontFamily: "monospace",
            }}
          >
            abdulhammedmustapha.com
          </span>
        </div>
      </div>
    )
  )
}
