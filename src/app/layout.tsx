import type { Metadata } from "next";
import { Outfit, DM_Sans } from "next/font/google";
import Script from "next/script";
import "@/app/globals.css";

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

  return {
    metadataBase: new URL("https://rdabacuznadiad.com"),
    title: {
      default: "R D Abacus",
      template: "%s | R D Abacus",
    },
    description:
      "UCMAS 2.0 (FRAM), Vedic Maths, Phonetics, Drawing, Mid Brain Training, and Handwriting at R D Abacus, Nadiad. Abacus & mental math for ages 4–13 plus enrichment. Book a free demo. Call +91 93750 30850.",
    keywords: [
      "UCMAS Nadiad",
      "Vedic Maths Nadiad",
      "abacus classes Nadiad",
      "mental math classes Nadiad",
      "handwriting classes Nadiad",
      "phonetics classes Nadiad",
      "R D Abacus Nadiad",
      "kids abacus Nadiad Gujarat",
      "mental arithmetic program",
      "brain development children Nadiad",
    ],
    authors: [{ name: "R D Abacus Nadiad" }],
    openGraph: {
      title: "R D Abacus Nadiad — UCMAS 2.0, Vedic Maths & More",
      description:
        "UCMAS 2.0 (FRAM), Vedic Maths, Phonetics, Drawing, Mid Brain Training, and Handwriting in Nadiad. Free demo available.",
      url: "https://rdabacuznadiad.com",
      siteName: "R D Abacus Nadiad",
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "R D Abacus Nadiad — UCMAS, Vedic Maths & Holistic Programs",
      description:
        "UCMAS 2.0 (FRAM) plus Vedic Maths, Phonetics, Drawing, Mid Brain Training, and Handwriting in Nadiad.",
    },
    robots: { index: true, follow: true },
    alternates: { canonical: "https://rdabacuznadiad.com" },
    icons,
  } satisfies Metadata;
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["EducationalOrganization", "LocalBusiness"],
  name: "R D Abacus Nadiad",
  description:
    "UCMAS 2.0 (FRAM), Vedic Maths, Phonetics, Drawing, Mid Brain Training, and Handwriting for children in Nadiad, Gujarat.",
  url: "https://rdabacuznadiad.com",
  telephone: "+919375030850",
  email: "rdabacusnadiad2910@gmail.com",
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
  foundingDate: "2004",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
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
