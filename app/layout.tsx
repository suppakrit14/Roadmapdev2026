import type { Metadata } from "next";
import { Space_Grotesk, Prompt } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const promptFont = Prompt({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["thai", "latin"],
  variable: "--font-prompt",
  display: "swap",
});

export const metadata: Metadata = {
  title: "devpath | AI-Assisted Software Developer Roadmap 2026",
  description:
    "เส้นทางการเรียนรู้ Software Developer ยุค AI 2026 พร้อมระบบบันทึกความก้าวหน้า คลัง Prompt และไอเดียโปรเจกต์",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`${spaceGrotesk.variable} ${promptFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
