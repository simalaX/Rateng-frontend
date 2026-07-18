import SEO from "../components/SEO";
import { COMPANY } from "../data/staticContent";

const SECTIONS = [
  {
    title: "1. Introduction",
    body: `This Privacy Policy explains how Rateng Construction and Interiors ("Rateng", "we", "us") collects, uses, and protects information when you use this website or contact us.`,
  },
  {
    title: "2. Information We Collect",
    body: `When you submit our contact form, we collect the details you provide: name, email address, phone number, the service you're interested in, and your message. We do not require you to create an account to browse this site.`,
  },
  {
    title: "3. How We Use Your Information",
    body: `We use the information you submit to respond to your enquiry, prepare quotations, and communicate with you about your project. We do not use your contact details for unrelated marketing without your consent.`,
  },
  {
    title: "4. Data Sharing",
    body: `We do not sell your personal data. Information is stored in our project database and gallery images are hosted via Cloudinary; these providers process data on our behalf and are not permitted to use it for their own purposes.`,
  },
  {
    title: "5. Data Security",
    body: `Your enquiry details are stored in a secured database, and admin access to project and enquiry data is protected by a password-authenticated login.`,
  },
  {
    title: "6. Third-Party Content",
    body: `This site embeds content from third parties, including Google Maps and YouTube, and links to our Instagram and TikTok profiles. These services have their own privacy policies, which we encourage you to review.`,
  },
  {
    title: "7. Your Rights",
    body: `Under Kenya's Data Protection Act, 2019, you have the right to access, correct, or request deletion of personal data we hold about you. To exercise these rights, contact us using the details below.`,
  },
  {
    title: "8. Children's Privacy",
    body: `This website is intended for individuals seeking construction and interior services and is not directed at children.`,
  },
  {
    title: "9. Changes to This Policy",
    body: `We may update this Privacy Policy from time to time. The version published on this website is the one currently in effect.`,
  },
  {
    title: "10. Contact Us",
    body: `For any privacy-related questions or requests, contact us at ${COMPANY.email} or ${COMPANY.phoneDisplay}.`,
  },
];

export default function Privacy() {
  return (
    <>
      <SEO title="Privacy Policy" description="Privacy Policy for Rateng Construction and Interiors." />

      <section className="bg-ink">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
          <h1 className="font-heading text-4xl sm:text-5xl font-semibold text-plaster">
            Privacy Policy
          </h1>
          <p className="mt-3 text-plaster/50 font-mono text-xs uppercase tracking-widest">
            Last updated 2026
          </p>
        </div>
      </section>

      <section className="bg-paper py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 space-y-10">
          {SECTIONS.map((s) => (
            <div key={s.title}>
              <h2 className="font-heading text-xl text-ink mb-2">{s.title}</h2>
              <p className="text-ink/65 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
