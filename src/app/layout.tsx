import type { Metadata } from "next";
import { Outfit, DM_Sans } from "next/font/google";
import Script from "next/script";
import "@/app/globals.css";
import { SITE } from "@/lib/constants";
import { defaultOgImageUrl } from "@/lib/seo";

const fontHeading = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const fontBody = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

/** Local file in `public/` — replace with your UCMAS artwork (keep path or use `ucmas-logo.png` + update here). */
const SITE_ICON = "/ucmas-logo.svg";

export async function generateMetadata(): Promise<Metadata> {
  const icons = {
    icon: [{ url: SITE_ICON, type: "image/svg+xml", sizes: "any" }],
    shortcut: SITE_ICON,
    apple: [{ url: SITE_ICON, sizes: "180x180", type: "image/svg+xml" }],
  };

  const ogImage = defaultOgImageUrl();
  const googleVerify = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();

  return {
    metadataBase: new URL(SITE.origin),
    title: {
      default:
        "UCMAS Nadiad | R D Abacus — Abacus Classes, Mental Math & UCMAS 2.0",
      template: "%s | UCMAS Nadiad — R D Abacus",
    },
    description:
      "UCMAS Nadiad — R D Abacus: UCMAS 2.0 (FRAM), Vedic Maths, Phonetics, Drawing, Mid Brain Training, and Handwriting in Nadiad, Gujarat. Abacus & mental math for ages 4–13. Book a free demo. Call +91 93750 30850.",
    keywords: [
      "UCMAS Nadiad",
      "UCMAS center Nadiad",
      "UCMAS classes Nadiad",
      "abacus classes Nadiad",
      "abacus coaching Nadiad",
      "mental math Nadiad",
      "mental math classes Nadiad",
      "Vedic Maths Nadiad",
      "handwriting classes Nadiad",
      "phonetics classes Nadiad",
      "R D Abacus Nadiad",
      "kids abacus Nadiad Gujarat",
      "mental arithmetic program",
      "brain development children Nadiad",
    ],
    authors: [{ name: "R D Abacus Nadiad" }],
    creator: "R D Abacus Nadiad",
    publisher: "R D Abacus Nadiad",
    formatDetection: { telephone: true },
    openGraph: {
      title: "UCMAS Nadiad | R D Abacus — UCMAS 2.0, Vedic Maths & More",
      description:
        "UCMAS Nadiad: UCMAS 2.0 (FRAM), Vedic Maths, Phonetics, Drawing, Mid Brain Training, and Handwriting. Free demo in Nadiad.",
      url: SITE.origin,
      siteName: "UCMAS Nadiad — R D Abacus",
      locale: "en_IN",
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: "UCMAS Nadiad — R D Abacus classes" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "UCMAS Nadiad | R D Abacus — UCMAS, Vedic Maths & Holistic Programs",
      description:
        "UCMAS Nadiad: UCMAS 2.0 (FRAM), Vedic Maths, Phonetics, Drawing, Mid Brain Training, and Handwriting.",
      images: [ogImage],
    },
    robots: { index: true, follow: true },
    alternates: { canonical: SITE.origin },
    icons,
    ...(googleVerify ? { verification: { google: googleVerify } } : {}),
  } satisfies Metadata;
}

const orgId = `${SITE.origin}/#organization`;
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["EducationalOrganization", "LocalBusiness"],
      "@id": orgId,
      name: "R D Abacus Nadiad",
      alternateName: [
        "UCMAS Nadiad",
        "R D Abacus UCMAS Center Nadiad",
        "UCMAS Nadiad Gujarat",
      ],
      description:
        "UCMAS Nadiad — UCMAS 2.0 (FRAM), Vedic Maths, Phonetics, Drawing, Mid Brain Training, and Handwriting for children in Nadiad, Gujarat.",
      url: SITE.origin,
      image: defaultOgImageUrl(),
      telephone: `+91${SITE.phone}`,
      email: SITE.email,
      sameAs: [SITE.social.instagram, SITE.social.facebook].filter(Boolean),
      knowsAbout: [
        "UCMAS",
        "Mental arithmetic",
        "Abacus training",
        "Vedic Mathematics",
        "Child brain development",
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE.address,
        addressLocality: SITE.city,
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
          dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "16:00",
          closes: "19:30",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Sunday",
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
      foundingDate: String(SITE.founded),
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.origin}/#website`,
      url: SITE.origin,
      name: "UCMAS Nadiad — R D Abacus",
      description: SITE.tagline,
      inLanguage: "en-IN",
      publisher: { "@id": orgId },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-IN"
      className={`${fontHeading.variable} ${fontBody.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href={SITE_ICON} type="image/svg+xml" sizes="any" />
        <link rel="shortcut icon" href={SITE_ICON} />
        <link rel="apple-touch-icon" href={SITE_ICON} />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Static JSON-LD only (no user/HTML input). JSON.stringify escapes script-breaking sequences. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        style={{ fontFamily: "var(--font-body), system-ui, sans-serif" }}
        suppressHydrationWarning
      >
        {children}
        {/* Umami Analytics */}
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="663fc7b8-2850-4237-8473-ae4c3e84da18"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
