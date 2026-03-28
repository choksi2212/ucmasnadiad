import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — R D Abacuz Nadiad",
  description: "Privacy Policy for R D Abacuz Nadiad UCMAS center website.",
  robots: { index: false, follow: false },
};

export default function PrivacyPolicy() {
  const updated = "28 March 2026";
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <div className="bg-[#1B3A6B] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1
            className="text-3xl sm:text-4xl font-bold text-white"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Privacy Policy
          </h1>
          <p className="text-white/60 mt-2 text-sm">Last updated: {updated}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 sm:p-12 prose prose-sm sm:prose-base max-w-none">
          
          <p className="text-[#6B7280]">
            This Privacy Policy describes how <strong>R D Abacuz Nadiad</strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) collects, uses, and protects information you provide when you use our website at{" "}
            <strong>rdabacuznadiad.com</strong> (the &ldquo;Website&rdquo;).
          </p>

          <h2 className="text-[#1A1A2E] font-bold text-xl mt-8 mb-4" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            1. Information We Collect
          </h2>
          <p className="text-[#6B7280]">
            We collect only the information you voluntarily provide through our contact/enquiry form:
          </p>
          <ul className="text-[#6B7280] space-y-1 mt-2">
            <li><strong>Name</strong> — to address you personally when we follow up.</li>
            <li><strong>Mobile number</strong> — to contact you regarding your enquiry.</li>
            <li><strong>Email address</strong> — to send confirmation and follow-up information.</li>
            <li><strong>Message</strong> (optional) — to understand your specific requirements.</li>
          </ul>
          <p className="text-[#6B7280] mt-3">
            We do <strong>not</strong> collect any payment information, passwords, government IDs, or any sensitive personal data.
          </p>

          <h2 className="text-[#1A1A2E] font-bold text-xl mt-8 mb-4" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            2. How We Use Your Information
          </h2>
          <p className="text-[#6B7280]">Your information is used solely to:</p>
          <ul className="text-[#6B7280] space-y-1 mt-2">
            <li>Respond to your enquiry about UCMAS programs at our center.</li>
            <li>Schedule a free demo class if you request one.</li>
            <li>Contact you with program updates or offers (only if you consent).</li>
          </ul>
          <p className="text-[#6B7280] mt-3">
            We do <strong>not</strong> sell, rent, or share your personal information with any third parties for marketing purposes.
          </p>

          <h2 className="text-[#1A1A2E] font-bold text-xl mt-8 mb-4" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            3. Form Submission Service
          </h2>
          <p className="text-[#6B7280]">
            Our contact form uses <strong>Web3Forms</strong> (web3forms.com) to process and forward submissions to us. Web3Forms receives your form data and delivers it to our email. Please review Web3Forms&apos;{" "}
            <a href="https://web3forms.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#E31837] underline">privacy policy</a> for details on how they handle data.
          </p>

          <h2 className="text-[#1A1A2E] font-bold text-xl mt-8 mb-4" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            4. Analytics
          </h2>
          <p className="text-[#6B7280]">
            We use <strong>Umami Analytics</strong> (umami.is) — a privacy-focused, cookie-free analytics service — to understand how visitors use our website. Umami does <strong>not</strong> track individual users, does not use cookies, and does not collect personally identifiable information. It only collects anonymous aggregated data such as page views and general geographic region.
          </p>

          <h2 className="text-[#1A1A2E] font-bold text-xl mt-8 mb-4" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            5. Cookies
          </h2>
          <p className="text-[#6B7280]">
            Our website does <strong>not</strong> use cookies for tracking or advertising purposes. The Umami analytics script we use is explicitly designed to be cookie-free and GDPR-compliant.
          </p>

          <h2 className="text-[#1A1A2E] font-bold text-xl mt-8 mb-4" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            6. Data Retention
          </h2>
          <p className="text-[#6B7280]">
            Enquiry form submissions are retained in our email inbox and used only for follow-up communication. We do not maintain a separate database of enquiries. You may request deletion of your data at any time by contacting us at{" "}
            <a href="mailto:rdabacuznadiad@gmail.com" className="text-[#E31837] underline">rdabacuznadiad@gmail.com</a>.
          </p>

          <h2 className="text-[#1A1A2E] font-bold text-xl mt-8 mb-4" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            7. Third-Party Links
          </h2>
          <p className="text-[#6B7280]">
            Our website may contain links to external sites (Google Maps, UCMAS official website, WhatsApp, social media). We are not responsible for the privacy practices or content of those external sites. Please review their respective privacy policies.
          </p>

          <h2 className="text-[#1A1A2E] font-bold text-xl mt-8 mb-4" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            8. Children&apos;s Privacy
          </h2>
          <p className="text-[#6B7280]">
            Our Website is intended for parents and guardians. We do not knowingly collect personal information directly from children under the age of 13. All enquiries are submitted by adults (parents/guardians) on behalf of their children.
          </p>

          <h2 className="text-[#1A1A2E] font-bold text-xl mt-8 mb-4" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            9. Your Rights
          </h2>
          <p className="text-[#6B7280]">Under applicable Indian law and general data protection principles, you have the right to:</p>
          <ul className="text-[#6B7280] space-y-1 mt-2">
            <li>Access the personal information we hold about you.</li>
            <li>Request correction of inaccurate information.</li>
            <li>Request deletion of your information.</li>
            <li>Opt out of any future communications from us.</li>
          </ul>
          <p className="text-[#6B7280] mt-3">
            To exercise any of these rights, contact us at{" "}
            <a href="mailto:rdabacuznadiad@gmail.com" className="text-[#E31837] underline">rdabacuznadiad@gmail.com</a>{" "}
            or call <a href="tel:9375030850" className="text-[#E31837] underline">+91 93750 30850</a>.
          </p>

          <h2 className="text-[#1A1A2E] font-bold text-xl mt-8 mb-4" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            10. Changes to This Policy
          </h2>
          <p className="text-[#6B7280]">
            We may update this Privacy Policy from time to time. Any changes will be reflected on this page with an updated &ldquo;Last updated&rdquo; date. We encourage you to review this page periodically.
          </p>

          <h2 className="text-[#1A1A2E] font-bold text-xl mt-8 mb-4" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            11. Contact Us
          </h2>
          <p className="text-[#6B7280]">
            If you have any questions or concerns about this Privacy Policy, please contact:
          </p>
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
