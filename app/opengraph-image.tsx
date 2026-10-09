import { ImageResponse } from "next/og";
import { site } from "@/config/site";
import { ogFonts, ogSize, shellDataUri } from "@/lib/og";

export const alt = `${site.name}: ${site.tagline}`;
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  const fonts = await ogFonts();
  const shell = shellDataUri("#1E2A4F");
  const shellSoft = shellDataUri("#9FB4DD");

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#EFEBE4", position: "relative" }}>
        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
        <img src={shellSoft} width={420} height={539} style={{ position: "absolute", right: 70, top: 46, opacity: 0.55 }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 90px", width: "100%" }}>
          {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
          <img src={shell} width={94} height={121} />
          <div style={{ fontFamily: "Cormorant", fontStyle: "italic", fontSize: 150, color: "#1E2A4F", lineHeight: 1.05, marginTop: 18 }}>
            {site.name}
          </div>
          <div style={{ fontFamily: "Cormorant", fontStyle: "italic", fontSize: 50, color: "#3E5FA8", marginTop: 6 }}>{site.tagline}</div>
          <div style={{ fontFamily: "Mukta", fontSize: 28, color: "#5A6482", marginTop: 34 }}>
            Sarees in Maheshwari silk and soft cotton. Order on WhatsApp or Instagram.
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
