import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FINALDRFT — Editorial Digital Agency",
  description: "Crafting digital perfection from first concept to final draft. SEO strategy, personal branding, video editing, custom web architecture, social media handling, and UI/UX design systems.",
  keywords: "Digital Agency, SEO, Personal Branding, Video Editing, Web Development, Social Media, Graphic Design, UI UX",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased selection:bg-terracotta selection:text-white">
        {children}
      </body>
    </html>
  );
}
