import { Helmet } from "react-helmet-async";
import { COMPANY } from "../data/staticContent";

export default function SEO({ title, description }) {
  const fullTitle = title ? `${title} | ${COMPANY.name}` : COMPANY.name;
  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
    </Helmet>
  );
}
