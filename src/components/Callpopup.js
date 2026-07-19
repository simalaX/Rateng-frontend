import { useState, useEffect } from "react";
import { FaTimes, FaPhone } from "react-icons/fa";

export default function CallPopup() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Show popup 1 second after page loads
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const closePopup = () => setIsVisible(false);

    return (
        <>
            {/* Popup Modal */}
            {isVisible && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="relative bg-white rounded-lg p-8 sm:p-12 max-w-md mx-4 shadow-xl">
                        {/* Close Button */}
                        <button
                            onClick={closePopup}
                            className="absolute top-4 right-4 text-ink/60 hover:text-ink transition-colors"
                            aria-label="Close"
                        >
                            <FaTimes size={20} />
                        </button>

                        {/* Content */}
                        <div className="text-center">
                            <h2 className="font-serif text-3xl sm:text-4xl text-ink font-light mb-4">
                                Let's Talk
                            </h2>
                            <p className="text-ink/70 text-base mb-8 leading-relaxed">
                                We'd love to hear about your project. Call us now to discuss your vision and get expert guidance.
                            </p>

                            {/* Call Button */}
                            <a
                                href="tel:+254728977636"
                                className="inline-flex items-center gap-3 px-8 py-4 bg-bronze text-ink font-mono text-xs uppercase tracking-[0.15em] hover:bg-bronze-light transition-all duration-300 shadow-sm hover:shadow-md rounded-sm"
                            >
                                <FaPhone size={14} />
                                Call +254 728 977 636
                            </a>

                            {/* Divider */}
                            <div className="mt-8 pt-6 border-t border-ink/8">
                                <p className="text-ink/50 text-xs font-mono uppercase tracking-widest">
                                    Available Mon–Fri, 08:00–17:00
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}