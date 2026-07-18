import SEO from "../components/SEO";
import { COMPANY } from "../data/staticContent";

const SECTIONS = [
  {
    title: "1. Acceptance of These Terms",
    body: `By engaging Rateng Construction and Interiors ("Rateng", "we", "us") for any construction, design, fabrication, or interior fitting service, or by using this website, you agree to these Terms and Conditions.`,
  },
  {
    title: "2. Our Services",
    body: `We provide architectural and structural design, mechanical/electrical/plumbing (MEP) design, Bill of Quantities preparation, countrywide construction, renovations and landscaping, steel fabrication, glass and aluminium installations, and interior fittings, as described on our Services page. Specific deliverables for your project are defined in your individual quotation or contract.`,
  },
  {
    title: "3. Quotations and Bill of Quantities",
    body: `Quotations are typically prepared after an initial site visit and are valid for the period stated on the quotation. A Bill of Quantities sets out the agreed scope, materials, and pricing for a project and forms part of your contract with us once accepted.`,
  },
  {
    title: "4. Payment Terms",
    body: `Payment schedules (deposits, milestone payments, and final payment) are agreed per project and set out in your contract or quotation. Work on site may be paused if agreed payment milestones are not met.`,
  },
  {
    title: "5. Project Timelines and Variations",
    body: `Timelines are estimates based on the agreed scope and site conditions at the time of quotation. Changes requested after work has started ("variations") may affect both cost and schedule, and will be confirmed with you before proceeding where practical.`,
  },
  {
    title: "6. Client Responsibilities",
    body: `Clients are responsible for providing reasonable site access, and for obtaining any approvals, permits, or third-party consents required for the project unless we have specifically agreed in writing to handle these on your behalf.`,
  },
  {
    title: "7. Workmanship",
    body: `We stand behind the quality of our work. Specific warranty terms for workmanship and materials are set out in your individual project contract, as they vary by scope of work and materials used.`,
  },
  {
    title: "8. Use of Project Photos and Videos",
    body: `We may photograph or video completed projects for our portfolio, website, and social media. If you would prefer your project not be featured, let us know in writing and we will respect that request.`,
  },
  {
    title: "9. Intellectual Property",
    body: `Design drawings, plans, and renders we produce remain our intellectual property until the associated invoice is paid in full, after which usage rights are as agreed in your contract.`,
  },
  {
    title: "10. Limitation of Liability",
    body: `To the extent permitted by law, our liability for any claim arising from our services is limited to the value of the relevant project contract. We are not liable for indirect or consequential losses.`,
  },
  {
    title: "11. Governing Law",
    body: `These Terms are governed by the laws of Kenya. Any disputes will first be addressed through good-faith discussion between the parties before resort to formal proceedings.`,
  },
  {
    title: "12. Changes to These Terms",
    body: `We may update these Terms from time to time; the version published on this website applies to work undertaken after the update date.`,
  },
  {
    title: "13. Contact",
    body: `Questions about these Terms can be sent to ${COMPANY.email} or ${COMPANY.phoneDisplay}.`,
  },
];

export default function Terms() {
  return (
    <>
      <SEO title="Terms and Conditions" description="Terms and Conditions for Rateng Construction and Interiors." />

      <section className="bg-ink">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
          <h1 className="font-heading text-4xl sm:text-5xl font-semibold text-plaster">
            Terms and Conditions
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
