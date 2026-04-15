import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Seven Star Chauffeurs — Vancouver's Premier Luxury Chauffeur Service",
  description:
    "Rolls-Royce, Maybach, Escalade IQ. Vancouver's most discreet and exceptional chauffeur service. By invitation.",
  metadataBase: new URL("https://sevenstarchauffeurs.com"),
  openGraph: {
    title: "Seven Star Chauffeurs",
    description: "Vancouver's premier luxury chauffeur service.",
    type: "website",
  },
  other: {
    "theme-color": "#050505",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap"
        />
        <link
          rel="preload"
          as="image"
          href="/frames/frame_0001.jpg"
          fetchPriority="high"
        />
      </head>
      <body className="page-in">{children}</body>
    </html>
  );
}
