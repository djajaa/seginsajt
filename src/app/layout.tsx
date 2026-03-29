import type { Metadata, Viewport } from "next";
import { Kanit, Archivo } from "next/font/google";
import "./globals.css";

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-kanit",
  display: "swap",
  preload: true,
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-archivo",
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f41e1e" },
    { media: "(prefers-color-scheme: dark)",  color: "#1d2229" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://sergejjanjic.com"),

  title: {
    default:  "Sergej Janjić | Personal Coaching – Banja Luka",
    template: "%s | Sergej Janjić",
  },

  description:
    "1:1 personal coaching uživo i online. Sistemski pristup, jasan plan, mjerljiv rezultat. Banja Luka.",

  keywords: [
    "personal trainer", "personal coaching", "lični trener",
    "fitness", "trening", "Banja Luka", "online coaching",
    "mršavljenje", "mišićna masa", "Sergej Janjić",
  ],

  authors: [{ name: "Sergej Janjić", url: "https://sergejjanjic.com" }],
  creator: "Sergej Janjić",

  openGraph: {
    type:        "website",
    locale:      "sr_BA",
    url:         "https://sergejjanjic.com",
    siteName:    "Sergej Janjić Personal Coaching",
    title:       "Sergej Janjić | Personal Coaching",
    description: "1:1 coaching uživo i online. Sistemski pristup, jasan plan, mjerljiv rezultat.",
    images: [
      {
        url:    "/og-image.jpg",
        width:  1200,
        height: 630,
        alt:    "Sergej Janjić Personal Coaching",
      },
    ],
  },

  twitter: {
    card:        "summary_large_image",
    title:       "Sergej Janjić | Personal Coaching",
    description: "1:1 coaching uživo i online. Sistemski pristup, jasan plan, mjerljiv rezultat.",
    images:      ["/og-image.jpg"],
  },

  robots: {
    index:          true,
    follow:         true,
    googleBot: {
      index:             true,
      follow:            true,
      "max-image-preview": "large",
      "max-snippet":       -1,
    },
  },

  icons: {
    icon:             [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple:            "/apple-touch-icon.png",
    shortcut:         "/favicon.ico",
  },

  manifest: "/site.webmanifest",

  alternates: {
    canonical: "https://sergejjanjic.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sr" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${kanit.variable} ${archivo.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}