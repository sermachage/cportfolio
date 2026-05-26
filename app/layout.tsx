import { Montserrat } from "next/font/google";
import "./globals.css";
import { metadata } from "./metadata";
import React from "react";
import { Providers } from "./providers";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Replace Inter with Montserrat
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

// Export the metadata
export { metadata };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteDescription = "Mike Machage's portfolio containing his projects, blog posts, resume and contact information.";
  const siteUrl = "https://mikemachage.tech";

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Structured Data for improved SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Mike Machage",
              url: siteUrl,
              image: `${siteUrl}/rportfolio.jpg`,
              description: siteDescription,
              sameAs: [
                "https://www.linkedin.com/in/mikemachage",
                "https://x.com/SerMachage",
                "https://github.com/machage9603",
              ],
              jobTitle: "Software Engineer",
              worksFor: {
                "@type": "Organization",
                name: "Darasani Hub",
              },
              knowsAbout: [
                "Web Development",
                "JavaScript",
                "TypeScript",
                "Next.js",
                "React",
                "Node.js",
                "MySQL",
                "MongoDB",
                "PostgreSQL",
                "Git",
                "Tailwind CSS",
                "Supabase",
                "Express.js",
                "Go",
                "Distributed Systems",
                "Microservices",
                "Google Cloud",
              ],
              alumniOf: {
                "@type": "EducationalOrganization",
                name: "ALX Africa",
              },
            }),
          }}
        />
      </head>
      <body className={`${montserrat.className} ${montserrat.variable}`} suppressHydrationWarning={true}>
        <Providers>
          {children}
          <Analytics />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}