import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import Script from "next/script";
import "@/app/globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "R D Abacuz Nadiad — UCMAS Mental Math & Abacus Classes for Kids",
  description:
    "Enroll your child in UCMAS at R D Abacuz Nadiad — the world's leading abacus-based mental arithmetic program. Classes for ages 4-13. Book a free demo today. Call +91 93750 30850.",
  keywords: [
    "UCMAS Nadiad",
    "abacus classes Nadiad",
    "mental math classes Nadiad",
    "R D Abacuz Nadiad",
    "kids abacus Nadiad Gujarat",
    "mental arithmetic program",
    "brain development children Nadiad",
  ],
  authors: [{ name: "R D Abacuz Nadiad" }],
  openGraph: {
    title: "R D Abacuz Nadiad — UCMAS Mental Math & Abacus Classes for Kids",
    description:
      "World's #1 mental arithmetic program. Enroll your child aged 4-13 in UCMAS at R D Abacuz, Nadiad. Free demo available.",
    url: "https://rdabacuznadiad.com",
    siteName: "R D Abacuz Nadiad",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "R D Abacuz Nadiad — UCMAS Mental Math & Abacus Classes",
    description:
      "World's #1 mental arithmetic program. Enroll your child aged 4-13 in UCMAS at R D Abacuz, Nadiad.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://rdabacuznadiad.com" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["EducationalOrganization", "LocalBusiness"],
  name: "R D Abacuz Nadiad",
  description:
    "UCMAS mental arithmetic and abacus training center for children aged 4-13 in Nadiad, Gujarat.",
  url: "https://rdabacuznadiad.com",
  telephone: "+919375030850",
  email: "rdabacuznadiad@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Nadiad",
    addressLocality: "Nadiad",
    addressRegion: "Gujarat",
    postalCode: "387001",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 22.6916,
    longitude: 72.8617,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "15:00",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "13:00",
    },
  ],
  priceRange: "₹₹",
  currenciesAccepted: "INR",
  paymentAccepted: "Cash, UPI",
  areaServed: {
    "@type": "City",
    name: "Nadiad",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
        {children}
        {/* Umami Analytics */}
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="a1e6e038-9eb4-4aca-b3a1-51814902a940"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
