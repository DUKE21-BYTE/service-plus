import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://servicepulse.io"
  ),
  title: {
    default: "ServicePulse — Stop Losing Jobs to Missed Calls",
    template: "%s | ServicePulse",
  },
  description:
    "ServicePulse automatically texts back missed calls, requests Google reviews, and books new customers — built for HVAC, plumbing, and roofing businesses.",
  keywords: [
    "HVAC software",
    "plumbing business software",
    "roofing CRM",
    "missed call text back",
    "home services automation",
    "contractor software",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "ServicePulse",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@servicepulse",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.variable} font-sans antialiased`}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            {children}
            <Toaster richColors position="top-right" />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
