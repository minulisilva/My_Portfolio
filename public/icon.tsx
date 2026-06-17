import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: "#F97316", /* 🔴 change this to your accent color */
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            color: "white",
            fontSize: 18,
            fontWeight: 800,
            fontFamily: "sans-serif",
            lineHeight: 1,
            marginTop: 1,
          }}
        >
          M
        </span>
      </div>
    ),
    { ...size }
  );
}