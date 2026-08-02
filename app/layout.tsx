import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Prompt } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const promptFont = Prompt({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["thai", "latin"],
  variable: "--font-prompt",
  display: "swap",
});

export const metadata: Metadata = {
  title: "devpath | AI-Assisted Software Developer Roadmap 2026",
  description: "เส้นทางการเรียนรู้ Software Developer ยุค AI 2026 พร้อมระบบบันทึกความก้าวหน้า คลัง Prompt และไอเดียโปรเจกต์",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${plusJakarta.variable} ${promptFont.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

