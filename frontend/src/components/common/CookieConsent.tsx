import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      // Show banner after a short delay for better UX
      setTimeout(() => setShowBanner(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "declined");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900 text-white shadow-lg border-t border-slate-700">
      <div className="mx-auto max-w-6xl px-6 py-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm">
              We use cookies to enhance your experience and analyze site usage. By continuing to use this site, you accept our{" "}
              <Link to="/privacy" className="underline hover:text-brand.blue">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link to="/terms" className="underline hover:text-brand.blue">
                Terms of Service
              </Link>
              .
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <button
              onClick={handleDecline}
              className="px-4 py-2 text-sm border border-slate-600 rounded hover:bg-slate-800 transition"
            >
              Decline
            </button>
            <button
              onClick={handleAccept}
              className="px-4 py-2 text-sm bg-brand.blue text-white rounded hover:bg-blue-600 transition"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
