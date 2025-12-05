import { useEffect } from "react";

interface CalendlyEmbedProps {
  url?: string;
  prefill?: {
    name?: string;
    email?: string;
    customAnswers?: Record<string, string>;
  };
}

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: { url: string; parentElement: HTMLElement; prefill?: unknown }) => void;
    };
  }
}

export default function CalendlyEmbed({ url, prefill }: CalendlyEmbedProps) {
  const calendlyUrl = url ?? import.meta.env.VITE_CALENDLY_URL ?? "https://calendly.com/warriorforge/book";

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.Calendly && document.getElementById("calendly-embed")) {
        window.Calendly.initInlineWidget({
          url: calendlyUrl,
          parentElement: document.getElementById("calendly-embed")!,
          prefill,
        });
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [calendlyUrl, prefill]);

  return (
    <div
      id="calendly-embed"
      className="calendly-inline-widget"
      style={{ minWidth: "320px", height: "700px" }}
    />
  );
}
