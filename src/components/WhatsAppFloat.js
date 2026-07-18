import { FaWhatsapp } from "react-icons/fa";
import { COMPANY } from "../data/staticContent";

export default function WhatsAppFloat() {
  const message = encodeURIComponent(
    "Hi Rateng Construction and Interiors, I'd like to enquire about your services."
  );
  const href = `https://wa.me/${COMPANY.whatsappNumber}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 hover:scale-105 active:scale-95 transition-transform"
    >
      <FaWhatsapp size={28} />
    </a>
  );
}
