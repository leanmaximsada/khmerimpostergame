import type { Metadata, Viewport } from "next";
import { Noto_Sans_Khmer } from "next/font/google";
import "./globals.css";

const notoSansKhmer = Noto_Sans_Khmer({
  subsets: ["khmer"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-khmer",
  display: "swap",
});

export const metadata: Metadata = {
  title: "លេងហ្គេម Impostor",
  description: "ហ្គេមទាយអ្នកក្បត់ សម្រាប់លេងជាមួយមិត្តភក្តិ",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Impostor",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#10b981",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="km" className={notoSansKhmer.variable}>
      <body className="font-khmer bg-gradient-to-b from-slate-900 to-slate-800 min-h-screen text-white antialiased">
        {children}
      </body>
    </html>
  );
}