import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use — R D Abacuz Nadiad",
  description: "Terms of Use for the R D Abacuz Nadiad website.",
  robots: { index: false, follow: false },
};

export default function TermsOfUse() {
  const updated = "28 March 2026";
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="bg-[#1B3A6B] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1
            className="text-3xl sm:text-4xl font-bold text-white"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Terms of Use
          </h1>
          <p className="text-white/60 mt-2 text-sm">Last updated: {updated}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 sm:p-12">
          
          <p className="text-[#6B7280] text-sm leading-relaxed">
            By accessing and using the website located at <strong>rdabacuznadiad.com</strong> (the &ldquo;Website&rdquo;), you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use this Website.
          </p>

          {[
            {
              title: "1. Website Purpose",
              content: `This Website is an informational and marketing resource for R D Abacuz Nadiad, a UCMAS franchise center located in Nadiad, Gujarat, India. It provides information about our programs, instructors, achievements, and contact details. It is not a platform for online enrollment, payment processing, or student data management.`,
            },
            {
              title: "2. Accuracy of Information",
              content: `We make reasonable efforts to ensure that information on this Website is accurate and up to date. However, we make no warranties or representations of any kind — express or implied — about the completeness, accuracy, reliability, or suitability of the information. Program fees, timings, and schedules are subject to change. Please contact us directly to confirm current details.`,
            },
            {
              title: "3. Intellectual Property",
              content: `All content on this Website — including text, images, logos, graphics, and layout — is the property of R D Abacuz Nadiad or its licensors. The UCMAS name, logo, and associated branding are trademarks of UCMAS International. You may not reproduce, distribute, modify, or use any content from this Website for commercial purposes without prior written permission.`,
            },
            {
              title: "4. Contact Form & Enquiries",
              content: `Submitting our contact/enquiry form does not constitute a binding enrollment or contract. It is a request for information, and we will follow up at our discretion. Submission of false, misleading, or spam enquiries is prohibited.`,
            },
            {
              title: "5. WhatsApp & Phone Communication",
              content: `By contacting us via WhatsApp or phone, you consent to receiving responses through those communication channels. We will not add you to bulk marketing lists without your explicit consent.`,
            },
            {
              title: "6. Third-Party Links",
              content: `This Website contains links to external websites (Google Maps, WhatsApp, UCMAS official site, social media). These links are provided for convenience. R D Abacuz Nadiad is not responsible for the content, privacy practices, or availability of any external sites.`,
            },
            {
              title: "7. Limitation of Liability",
              content: `R D Abacuz Nadiad shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of this Website or reliance on any information contained herein. The Website is provided "as is" without any warranty of any kind.`,
            },
            {
              title: "8. Prohibited Use",
              content: `You agree not to: (a) use the Website in any way that violates applicable laws; (b) attempt to gain unauthorized access to any part of the Website; (c) transmit any harmful, offensive, or spam content through our contact form; (d) impersonate any person or entity using our contact channels.`,
            },
            {
              title: "9. Governing Law",
              content: `These Terms of Use are governed by and construed in accordance with the laws of India. Any disputes arising from your use of this Website shall be subject to the exclusive jurisdiction of the courts in Gujarat, India.`,
            },
            {
              title: "10. Changes to Terms",
              content: `We reserve the right to modify these Terms of Use at any time. Changes will be effective immediately upon posting to this page. Continued use of the Website after any changes constitutes your acceptance of the revised terms.`,
            },
            {
              title: "11. Contact",
              content: null,
            },
          ].map((section) => (
            <div key={section.title} className="mt-8">
              <h2
                className="text-[#1A1A2E] font-bold text-xl mb-3"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                {section.title}
              </h2>
              {section.content ? (
                <p className="text-[#6B7280] text-sm leading-relaxed">{section.content}</p>
              ) : (
                <div className="mt-3 p-4 bg-[#FAFAFA] rounded-xl text-sm text-[#1A1A2E]">
                  <p><strong>R D Abacuz Nadiad</strong></p>
                  <p>Nadiad, Gujarat, India — 387001</p>
                  <p className="mt-1">
                    📞 <a href="tel:9375030850" className="text-[#E31837]">+91 93750 30850</a>
                  </p>
                  <p>
                    ✉️ <a href="mailto:rdabacuznadiad@gmail.com" className="text-[#E31837]">rdabacuznadiad@gmail.com</a>
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#E31837] text-white font-semibold rounded-full hover:bg-[#b8102b] transition-colors shadow-lg shadow-red-500/25"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
