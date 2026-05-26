// metadata.ts
import { Metadata } from "next";
import { URL } from "url";

const siteName = "Mike Machage";
const siteDescription = "Mike Machage's portfolio containing his projects, blog posts, resume and contact information.";
const siteUrl = "https://mikemachage.tech";

export const metadata: Metadata = {
    title: `${siteName} | Software Engineer`,
    description: siteDescription,
    authors: [{ name: "Mike Machage" }],
    keywords: ["Mike Machage", "Top Software Engineers", "Top Software Engineers in Kenya", "Web Developers in Kenya", "UI/UX Designer", "Full Stack developer", "Software Engineer", "Javascript", "Next.js", "TypeScript", "Portfolio", "Kenya Developer", "Kenya Software Engineer"],
    openGraph: {
        title: siteName,
        description: siteDescription,
        type: "website",
        url: siteUrl,
        siteName: siteName,
        images: [
            {
                url: `${siteUrl}/rportfolio.jpg`,
                width: 1200,
                height: 630,
                alt: "Mike Machage | Software Engineer"
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        site: "@SerMachage",
        title: siteName,
        description: siteDescription,
        images: [`${siteUrl}/rportfolio.jpg`]
    },
    alternates: {
        canonical: siteUrl,
    },
    metadataBase: new URL(siteUrl),
    robots: {
        index: true,
        follow: true
    },
    manifest: "/site.webmanifest",
    icons: {
        icon: [
            { url: "/favicon.png" },
            { url: "/favicon.png", sizes: "16x16", type: "image/png" },
            { url: "/favicon.png", sizes: "32x32", type: "image/png" }
        ],
        apple: [
            { url: "/apple-touch-icon.png" }
        ]
    },
    other: {
        "msapplication-TileColor": "#2b5797",
        "theme-color": "#ffffff"
    }
};